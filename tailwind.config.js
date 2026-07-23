/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#1B5B31',
        cream: '#F5F0EC',
        beige: '#DCC1AB',
        ink: '#111111',
      },
      fontFamily: {
        display: ['"Montserrat Variable"', 'Montserrat', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      // Display sizes interpolate between 360px and 1440px viewports and lock
      // to the Figma value at 1440.
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        small: ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lead: ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        h4: ['clamp(1.375rem, 1.25rem + 0.5556vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.05em' }],
        h3: ['clamp(1.75rem, 1.5rem + 1.1111vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
        h2: ['clamp(2rem, 1.6667rem + 1.4815vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.25rem, 1.75rem + 2.2222vw, 3.75rem)', { lineHeight: '1.1667', letterSpacing: '0' }],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
