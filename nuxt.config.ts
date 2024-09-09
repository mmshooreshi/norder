import fs from 'node:fs'

const locales = fs.readdirSync('locales')
  .map(file => ({
    code: file.replace(/\.(yml|yaml|json)$/, ''),
    file,
  }))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nightrunner',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'preload', href: '/fonts/picoopic-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }, { rel: 'preload', href: '/fonts/picoopic-Bold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }, { rel: 'preload', href: '/fonts/picoopic-ExtraBold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }, { rel: 'preload', href: '/fonts/picoopic-Light.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }, { rel: 'preload', href: '/fonts/picoopic-Medium.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }, { rel: 'preload', href: '/fonts/picoopic-Thin.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }],

    },
  },

  imports: { // add folders here to auto-import them in your application
    dirs: [
      'stores',
      'composables/**',
    ],
  },

  components: [{ path: '~/components', pathPrefix: false }],

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  experimental: {
    typedPages: true,
  },

  // uncomment to disable SSR. This will basically make the app a SPA, like a normal Vue app, but with all the Nuxt goodies
  // ssr: false,

  // global CSS files
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/reset.css',
  ],

  // plugin configurations
  modules: ['@nuxtjs/i18n', '@vueuse/nuxt', '@unocss/nuxt', '@nuxtjs/critters', '@nuxtjs/color-mode', '@pinia/nuxt', '@nuxt/fonts'],

  i18n: {
    langDir: 'locales',
    defaultLocale: 'fa',
    locales,
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'color-scheme',
  },

  compatibilityDate: '2024-09-06',

  fonts: {
    families: [
      {
        name: 'Picoopic',
        src: [
          { url: '/fonts/picoopic-Regular.woff2', weight: '400', style: 'normal' },
          { url: '/fonts/picoopic-Bold.woff2', weight: '700', style: 'normal' },
          { url: '/fonts/picoopic-ExtraBold.woff2', weight: '800', style: 'normal' },
          { url: '/fonts/picoopic-Light.woff2', weight: '300', style: 'normal' },
          { url: '/fonts/picoopic-Medium.woff2', weight: '500', style: 'normal' },
          { url: '/fonts/picoopic-Thin.woff2', weight: '100', style: 'normal' },
        ],
      },
    ],
  },

  devtools: {
    enabled: true,
  },
})
