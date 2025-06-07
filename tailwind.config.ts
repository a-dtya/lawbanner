import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container:{
        center:true,
        padding:"2rem",
        screens:{
          "xl":"1200px",
          "sm":"100%",
          "md":"100%",
          "lg":"100%",
        }
      },
      backgroundImage: {
        'radial-pink': 'radial-gradient(circle, hsl(320,65%,52%,20%) 0%, #ec4899 40%, #f9a8d4 100%, hsl(var(--background))_60%)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
