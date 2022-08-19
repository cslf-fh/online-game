<script setup lang="ts">
const { theme } = useTheme();

useHead({
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
