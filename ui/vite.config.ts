import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
import svgLoader from '@honkhonk/vite-plugin-svgr'
import * as path from 'path'

const SERVER_PORT = process.env.SERVER_PORT || 8888
// process.env.npm_package_version
// GIT_SHA
export default defineConfig({
  plugins: [
    react({fastRefresh: process.env.NODE_ENV !== 'test'}),
    svgLoader(),
    envCompatible({prefix: ''}),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 8080,
    proxy: {
      '/chronograf/v1': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
      '/oauth': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
})
