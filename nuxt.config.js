require('dotenv').config()

const fs = require('fs')

export default {
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    ssr: true,
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        titleTemplate: '%s - Currency App',
        title: 'Exchange' || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0' }
        ],
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', defer: true },
            { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', integrity: 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p', crossorigin: 'anonymous'}
        ],
        link: [
            { 
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css', 
                rel: 'stylesheet',
                integrity: 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3',
                crossorigin: 'anonymous'
            }
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        // '~/assets/css/main.scss',
    ],
    loading: {
        color: '#9D91CF',
        height: '5px'
    },

    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        { src: '~/plugins/vloading', ssr: false },
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/dotenv',
    ],
    router: {
        // middleware: ['isLogin']
    },
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
    ],
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        presets: ['@nuxt/babel-preset-app'],
        babel: {
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              ['@babel/plugin-proposal-private-methods', { loose: true }],
              ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
            ]
        },
    },
    pwa: {
        
    } 
}
