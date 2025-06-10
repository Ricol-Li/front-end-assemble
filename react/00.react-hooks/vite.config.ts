import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 新增服务器配置
  server: {
    port: 3000, // 默认端口号
    host: '0.0.0.0', // 允许外部访问
  },
})
