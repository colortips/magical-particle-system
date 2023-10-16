import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/dist/',
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@svg', replacement: fileURLToPath(new URL('./src/assets/svg', import.meta.url)) },
    ],
  },
})
