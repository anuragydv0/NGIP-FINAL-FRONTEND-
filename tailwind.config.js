/** @type {import('tailwindcss').Config} */
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F6F8',
        surface: '#FFFFFF',
        subtle: '#FAFBFC',
        line: {
          DEFAULT: '#E3E7EC',
          strong: '#CDD5DE',
        },
        ink: {
          DEFAULT: '#0B1420',
          2: '#3B4655',
          3: '#697484',
          4: '#98A2AF',
        },
        accent: {
          DEFAULT: '#0B6E63',
          hover: '#095A51',
          soft: '#E5F0EE',
          line: '#B9D8D3',
        },
        pos: {
          DEFAULT: '#0E8A4F',
          soft: '#E6F4EC',
        },
        neg: {
          DEFAULT: '#C2372C',
          soft: '#FBEAE8',
        },
        warn: {
          DEFAULT: '#A9700D',
          soft: '#FBF2E1',
        },
        info: {
          DEFAULT: '#1F5FA8',
          soft: '#E9F1FA',
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
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 20, 32, 0.04)',
        raised: '0 4px 16px -4px rgba(11, 20, 32, 0.12), 0 1px 2px rgba(11,20,32,0.04)',
        pop: '0 12px 40px -8px rgba(11, 20, 32, 0.22), 0 2px 6px rgba(11,20,32,0.06)',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: '#E3E7EC',
    }),
  },
  plugins: [],
}
