import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/Elite_sports_and_fitness/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
