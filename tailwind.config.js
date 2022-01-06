module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
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
