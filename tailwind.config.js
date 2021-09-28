module.exports = {
    mode: 'jit',
    purge: {
        mode: 'all',
        preserveHtmlElements: false,
        content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
        options: {
            keyframes: true,
            fontFace: true
        }
    },
    darkMode: false,
    theme: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            brand: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-font-inter')
    ],
}
