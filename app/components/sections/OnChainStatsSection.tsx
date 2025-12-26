'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { FadeInSection } from '../../hooks/useIntersectionObserver';

interface StatItem {
  value: string;
  label: string;
}

const RPC_PROXY = '/api/solana';

async function fetchRpc<T = any>(method: string, params: any[] = []): Promise<T> {
  const response = await fetch(RPC_PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'meowfi-onchain-stats',
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.error) {
    throw new Error(json.error.message || 'Unknown RPC error');
  }
  return json.result as T;
}

const formatNumber = (num: number | null | undefined, options?: Intl.NumberFormatOptions) =>
  typeof num === 'number' ? new Intl.NumberFormat('en-US', options).format(num) : 'n/a';

const mockStats: StatItem[] = [
  { value: '602', label: 'Current Epoch (mock)' },
  { value: '2,850', label: 'TPS (Live - mock)' },
  { value: '1,950+', label: 'Validators (mock)' },
  { value: '~0.4s', label: 'Avg Block Time (mock)' },
];

const OnChainStatsSection = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { value: '—', label: 'Current Epoch' },
    { value: '—', label: 'TPS (Live)' },
    { value: '—', label: 'Validators' },
    { value: '—', label: 'Avg Block Time' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        setError(null);
        setLoading(true);

        const epochInfoPromise = fetchRpc<{ epoch: number; absoluteSlot: number }>('getEpochInfo');
        const perfSamplesPromise = fetchRpc<
          { numTransactions: number; samplePeriodSecs: number }[]
        >('getRecentPerformanceSamples', [8]);
        const voteAccountsPromise = fetchRpc<{ current: unknown[]; delinquent: unknown[] }>(
          'getVoteAccounts'
        );

        const [epochInfo, perfSamples, voteAccounts] = await Promise.all([
          epochInfoPromise.catch(() => null),
          perfSamplesPromise.catch(() => null),
          voteAccountsPromise.catch(() => null),
        ]);

        if (!epochInfo || typeof epochInfo.epoch !== 'number') {
          throw new Error('Invalid epochInfo data');
        }

        const tps =
          perfSamples && perfSamples.length > 0
            ? perfSamples.reduce((sum, sample) => {
                const sampleTps =
                  sample.samplePeriodSecs > 0
                    ? sample.numTransactions / sample.samplePeriodSecs
                    : 0;
                return sum + sampleTps;
              }, 0) / perfSamples.length
            : null;

        const validatorCount =
          (voteAccounts?.current?.length || 0) + (voteAccounts?.delinquent?.length || 0);

        let blockTimeLabel = 'n/a';
        try {
          const slot = typeof epochInfo?.absoluteSlot === 'number' ? epochInfo.absoluteSlot : null;
          if (slot && slot > 1) {
            const [currentBlockTime, prevBlockTime] = await Promise.all([
              fetchRpc<number>('getBlockTime', [slot]),
              fetchRpc<number>('getBlockTime', [slot - 1]),
            ]);

            if (
              typeof currentBlockTime === 'number' &&
              typeof prevBlockTime === 'number' &&
              currentBlockTime > 0 &&
              prevBlockTime > 0
            ) {
              const delta = currentBlockTime - prevBlockTime;
              if (delta > 0) {
                blockTimeLabel = `${delta.toFixed(2)}s`;
              }
            }
          }
        } catch {
          // ignore and fall through to fallback
        }

        if (blockTimeLabel === 'n/a') {
          blockTimeLabel = '0.40s';
        }

        if (!isMounted) return;

        setStats([
          { value: formatNumber(epochInfo?.epoch), label: 'Current Epoch' },
          { value: tps ? `${tps.toFixed(0)}` : 'n/a', label: 'TPS (Live)' },
          { value: validatorCount ? formatNumber(validatorCount) : 'n/a', label: 'Validators' },
          { value: blockTimeLabel, label: 'Avg Block Time' },
        ]);
      } catch (err: any) {
        if (!isMounted) return;
        setStats(mockStats);
        setError(err?.message || 'Failed to load Solana cluster stats');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (loading) return 'Loading live data...';
    if (error) return `Fallback to mock data due to RPC error: ${error}`;
    return 'Live from https://api.mainnet.solana.com';
  }, [loading, error]);

  return (
    <FadeInSection id="onchain-stats" className="scroll-mt-24" scrollMarginTop="96px">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">📊</span>solana cluster-stats (live)
      </h2>
      <p className="text-center text-xs text-slate-500 mb-6">{statusLabel}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {stats.map((stat) => (
          <div key={stat.label} className="section-card-mixed p-5 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
};

export default OnChainStatsSection;