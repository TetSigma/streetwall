import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the plugin

export default defineConfig({
  plugins: [react()], 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // other configuration options
});
