<script setup lang="ts">
const { theme } = useTheme();
const { title } = usePageTitle();
const description = `理由(ワケ)あって石が3目しかない3目並べです。それ以外は普通の3目並べです。`;
const url = 'https://sanmoku-shikanai-narabe.netlify.app';

useHead({
  meta: [
    { name: 'description', content: description },
    // OGPの設定
    { property: 'og:title', content: title },
    { property: 'og:site_name', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: `${url}/icons/icon-512x512.png` },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'ja_JP' },
    { property: 'twitter:image', content: `${url}/icons/icon-512x512.png` },
    { property: 'twitter:card', content: 'summary' },
  ],
  link: [
    // Google Fontsの設定
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
      rel: 'stylesheet',
    },
    {
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
      rel: 'stylesheet',
    },
    // ファビコンの設定
    { href: '/favicon.ico', rel: 'icon', sizes: 'any' },
    { href: '/icons/icon.svg', rel: 'icon', type: 'image/svg+xml' },
    { href: '/icons/apple-touch-icon.png', rel: 'apple-touch-icon' },
    { href: '/manifest.webmanifest', rel: 'manifest' },
  ],
});
</script>

<template>
  <v-app :theme="theme">
    <NuxtPage />
  </v-app>
</template>

<style lang="scss">
@import '~~/sass/variables.scss';

body {
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
}

.v-application,
.v-overlay {
  [class*='text-'] {
    font-family: $body-font-family;
  }
  [class*='v-card-'] {
    font-family: $body-font-family;
  }
  [class*='v-input'] {
    font-family: $body-font-family;
  }
  font-family: $body-font-family;
}

.v-overlay__content {
  max-width: 80vw !important;
  max-height: 100vh !important;
}
</style>
