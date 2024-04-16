import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'main': resolve(__dirname, 'index.html'),
        'customelements-button-sample': resolve(__dirname, 'customelements-button-sample/index.html'),
      },
    },
  },
})
