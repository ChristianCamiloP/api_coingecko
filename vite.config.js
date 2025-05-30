// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/API_COINGECKO/',  // <== usa el nombre exacto de tu repo aquí
  plugins: [react()],
});
