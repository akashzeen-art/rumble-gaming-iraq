/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Baloo Tamma 2"', 'cursive'],
        body: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '2xlg': '1.2rem',
        '4xl':  '2em',
        '6xl':  '3em',
      },
      borderWidth: { '3': '3px', '6': '6px' },
      height:  { '13': '3.25rem', '17': '4.25rem', '18': '4.5rem' },
      maxHeight: { '80screen': '80vh', '48': '12rem', '60screen': '60vh' },
      width:   { '19/20': '95%', '16/20': '80%', '28': '7rem' },
      zIndex:  { '15': '15', 'min1': '-1' },
      spacing: { '13': '3.25rem', '18': '4.5rem' },
      backgroundImage: {
        'from-black-55': 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)',
      },
      gradientColorStops: {
        'black-55': 'rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}
