module.exports = {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
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
