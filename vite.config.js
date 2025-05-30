// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/api_coingecko/', // 🔴 debe estar en minúsculas
  plugins: [react()],
});
