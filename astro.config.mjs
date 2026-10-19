import alpinejs from '@astrojs/alpinejs'
import node from '@astrojs/node'
import react from '@astrojs/react'
import icon from 'astro-iconset'
import { defineConfig, fontProviders, memoryCache, passthroughImageService } from 'astro/config'
import { emdashSmtp } from 'emdash-smtp'
import emdash, { local } from 'emdash/astro'
import { github } from 'emdash/auth/providers/github'
import { sqlite } from 'emdash/db'
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  cache: { provider: memoryCache() },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    service: passthroughImageService()
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    fallback: { id: 'en' }
  },
  integrations: [
    react(),
    alpinejs({ entrypoint: '/src/alpine' }),
    icon({
      include: {
        'keyline-icons': [
          'app-window',
          'arrow-left',
          'arrow-right',
          'arrow-up-right',
          'list',
          'monitor',
          'moon',
          'search',
          'settings',
          'sun',
          'x'
        ]
      }
    }),
    emdash({
      database: sqlite({ url: 'file:./storage/data.db' }),
      storage: local({
        directory: './storage/uploads',
        baseUrl: '/_emdash/api/media/file'
      }),
      sandboxRunner: '@emdash-cms/sandbox-workerd/sandbox',
      authProviders: [github()],
      plugins: [emdashSmtp()],
      mcp: false
    })
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
      fallbacks: ['sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal', 'italic'],
      fallbacks: ['serif']
    }
  ],
  devToolbar: { enabled: false },
  vite: {
    build: {
      emptyOutDir: true,
      chunkSizeWarningLimit: 1024 * 8
    },
    server: { port: 4321, strictPort: true },
    preview: { port: 4321, strictPort: true },
    resolve: { tsconfigPaths: true, dedupe: ['react', 'react-dom'] }
  }
})
