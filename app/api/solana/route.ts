'use server'

import { NextRequest } from 'next/server'

const SOLANA_RPC = 'https://api.mainnet.solana.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rpcResponse = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // Keep request server-side to avoid browser CORS/403 issues.
      cache: 'no-store',
    })

    const data = await rpcResponse.json()
    return new Response(JSON.stringify(data), {
      status: rpcResponse.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'RPC proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
