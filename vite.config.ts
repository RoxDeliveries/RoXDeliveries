import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    https: false,
    port: 5173,
=======
    host: '0.0.0.0',  // Allow access from external devices (like your phone)
    port: 5173,
    strictPort: true,
    cors: {
      origin: '*',    // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
>>>>>>> d47469a679691045e35e8ca76439b2e8ff25d564
  },
});
