import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0'
  //   // host: '192.168.0.173'
  //   // host: 'localhost'
  //   // allowedHosts: ['192.168.0.173', 'localhost']
  // },

})
