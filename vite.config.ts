import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import compress from 'vite-plugin-compress'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5006,
        open: '/'
    },
    plugins: [
        vue(),
        compress(),
        checker({ typescript: true })
    ]
})
