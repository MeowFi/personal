import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent-color)',
        'accent-darker': 'var(--accent-color-darker)',
        'accent-lighter': 'var(--accent-color-lighter)',
        'console-bg': 'var(--console-bg)',
        'console-text': 'var(--console-text)',
        'console-prompt': 'var(--console-prompt)',
        'slate-950': '#0a0f18',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'fira-code': ['var(--font-fira-code)'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'bg-scroll': 'bg-scroll 20s linear infinite',
        'nyan-bg-scroll': 'nyan-bg-scroll 2s linear infinite',
        'move-particles': 'move-particles 20s linear infinite',
        'footer-cat-animate': 'footer-cat-pulse 0.5s ease-in-out',
        'ai-loading-dot1': 'ai-loading-pulse 1.4s infinite 0.2s',
        'ai-loading-dot2': 'ai-loading-pulse 1.4s infinite 0.4s',
        'ai-loading-dot3': 'ai-loading-pulse 1.4s infinite 0.6s',
        'pulse-once': 'pulse-once 1s cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'var(--accent-color)' },
        },
        'bg-scroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-24px -24px' },
        },
        'nyan-bg-scroll': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '100px 0px' },
        },
        'move-particles': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100vh)' },
        },
        'footer-cat-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'ai-loading-pulse': {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        'pulse-once': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      boxShadow: {
        'accent-hover': '0 10px 25px color-mix(in srgb, var(--accent-color) 30%, transparent)',
        'accent-project-hover': '0 12px 28px color-mix(in srgb, var(--accent-color) 35%, transparent)',
        'accent-section-hover': '0 10px 25px color-mix(in srgb, var(--accent-color) 40%, transparent), 0 0 20px color-mix(in srgb, var(--accent-color-lighter) 30%, transparent)',
      }
    },
  },
  plugins: [],
}
export default config
