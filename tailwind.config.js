module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        dark: '#373F68',
        background: '#F7F8FD',
      },
      borderColor: {
        light: '#8C92B3',
      },
      borderRadius: {
        DEFAULT: '0.625rem',
        button: '0.625rem',
        input: '.3125rem',
      },
      boxShadow: {
        dropdown: '0px 10px 40px -7px rgba(55, 63, 104, 0.350492)',
      },
      colors: {
        primary: {
          DEFAULT: '#AD1FEA',
        },
        secondary: {
          DEFAULT: '#3A4374',
          light: '#656EA3',
        },
        alternate: {
          DEFAULT: '#4661E6',
          light: '#F2F4FF',
        },
        danger: {
          DEFAULT: '#D73737',
          light: '#E98888',
        },
        status: {
          planned: '#F49F85',
          'in-progress': '#AD1FEA',
          live: '#62BCFA',
        },
      },
      backgroundImage: {
        radial:
          'radial-gradient(ellipse at right top, rgba(232,77,112,1) 0%, rgba(163,55,246,1) 60%, rgba(40,167,237,1) 100%)',
      },
      divideColor: {
        light: '#8C92B3',
      },
      fontSize: {
        regular: '.9375rem', // 15px
        small: '.8125rem', // 13px
      },
      textColor: {
        default: '#3A4374',
        light: '#647196',
      },
      screens: {
        mobile: { max: '767px' },
        tablet: { min: '768px', max: '1023px' },
        laptop: { min: '1024px', max: '1279px' },
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
