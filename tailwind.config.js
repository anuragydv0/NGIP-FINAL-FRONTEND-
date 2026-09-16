/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        subtle: 'var(--subtle)',
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          soft: 'var(--accent-soft)',
          line: 'var(--accent-line)',
        },
        pos: {
          DEFAULT: 'var(--pos)',
          soft: 'var(--pos-soft)',
        },
        neg: {
          DEFAULT: 'var(--neg)',
          soft: 'var(--neg-soft)',
        },
        warn: {
          DEFAULT: 'var(--warn)',
          soft: 'var(--warn-soft)',
        },
        info: {
          DEFAULT: 'var(--info)',
          soft: 'var(--info-soft)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(11, 20, 32, 0.04), 0 1px 2px rgba(11, 20, 32, 0.02)',
        raised: '0 8px 24px -4px rgba(11, 20, 32, 0.08), 0 4px 8px -2px rgba(11, 20, 32, 0.04)',
        pop: '0 16px 48px -12px rgba(11, 20, 32, 0.15), 0 8px 16px -4px rgba(11, 20, 32, 0.05)',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: 'var(--line)',
    }),
  },
  plugins: [],
}
