import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: 'oklch(96% 0.006 90)',
        navy: 'oklch(22% 0.035 260)',
        'navy-light': 'oklch(30% 0.03 260)',
        muted: 'oklch(35% 0.008 90)',
        hover: 'oklch(95% 0.01 90)',
        brand: {
          amber: 'oklch(80% 0.14 70)',
          'amber-tile': 'oklch(83% 0.14 75)',
          'amber-ink': 'oklch(28% 0.02 70)',
          blue: 'oklch(64% 0.17 255)',
          green: 'oklch(68% 0.16 150)',
          violet: 'oklch(58% 0.15 305)',
        },
        category: {
          football: { fg: 'oklch(38% 0.14 45)', bg: 'oklch(90% 0.09 45)' },
          cricket: { fg: 'oklch(38% 0.1 145)', bg: 'oklch(90% 0.07 145)' },
          basketball: { fg: 'oklch(42% 0.15 35)', bg: 'oklch(91% 0.08 60)' },
          tennis: { fg: 'oklch(40% 0.12 120)', bg: 'oklch(91% 0.09 120)' },
          swimming: { fg: 'oklch(38% 0.1 230)', bg: 'oklch(90% 0.06 230)' },
          athletics: { fg: 'oklch(40% 0.14 25)', bg: 'oklch(91% 0.07 25)' },
          'martial-arts': { fg: 'oklch(35% 0.03 20)', bg: 'oklch(89% 0.02 40)' },
          'fitness-gym': { fg: 'oklch(38% 0.12 340)', bg: 'oklch(90% 0.06 340)' },
          'multi-sport': { fg: 'oklch(38% 0.1 300)', bg: 'oklch(90% 0.06 300)' },
        },
      },
      borderRadius: {
        tile: '26px',
        panel: '24px',
        row: '20px',
      },
    },
  },
  plugins: [],
} satisfies Config
