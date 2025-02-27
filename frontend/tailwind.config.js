/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        
        colors: {
            'white': '#FFFFFF',
            'black': '#242424',
            'grey': '#F3F3F3',
            'dark-grey': '#6B6B6B',
            'red': '#FF4E4E',
            'transparent': 'transparent',
            'background':'#E0E7FF',
            'primary' : '#CCBFEC',
            'secondary' : '#FFAFBC',
            'tertiary' : '#8667F2',
            'text' : '#414656',
            'tertiary-light' : '#A18AF5',
        },

        theme: {
            screens: {
              'sm': '640px',
              // => @media (min-width: 640px) { ... }
        
              'md': '768px',
              // => @media (min-width: 768px) { ... }
        
              'lg': '1024px',
              // => @media (min-width: 1024px) { ... }
        
              'xl': '1280px',
              // => @media (min-width: 1280px) { ... }
        
              '2xl': '1536px',
              // => @media (min-width: 1536px) { ... }
            }
        },

        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },

        extend: {
            fontFamily: {
              inter: ["'Inter'", "sans-serif"],
              gelasio: ["'Gelasio'", "serif"],
              head: ["Goudy Bookletter 1911"],
              btn_text: ["Bellota"],
              p_text: ["Niramit"]
            },
        },

    },
    plugins: [],
};