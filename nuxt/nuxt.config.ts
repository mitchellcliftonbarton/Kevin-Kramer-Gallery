import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /*
  Defaults
  */

  vite: {
    plugins: [tailwindcss()],
  },

  // plugins: ['~/plugins/server/meta-defaults.js'],

  devtools: { enabled: true },

  modules: ['@nuxtjs/sanity'],
  compatibilityDate: '2025-03-18',

  css: ['~/assets/css/main.css'],

  sanity: {
    projectId: 'ii4ohxov',
    dataset: 'production',
    apiVersion: '2024-07-19',
    useCdn: true,
  },

  runtimeConfig: {
    public: {
      // graphqlEndpoint: process.env.GRAPHQL_ENDPOINT_DEV,
      // allowedHostnames: ['localhost:3000', '127.0.0.1'],
    },
  },
})
