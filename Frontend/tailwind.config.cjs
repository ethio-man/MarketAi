module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        eesel: {
          light: '#FAF9F6',   // warm off-white
          dark: '#080A04',    // dark olive-black
          accent: '#D1D5C9',  // subtle borders
        },
        darkblue: '#0B3954',
        brightblue: '#1E88E5',
        green: '#00A676',
        yellow: '#F2BE22',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}