<script setup lang="ts">
const { countdown, circular } = useCountdown();
</script>

<template>
  <div class="ma-4" :style="{ 'z-index': 1, position: 'fixed' }">
    <v-progress-circular
      :model-value="circular"
      color="primary"
      size="72"
      :style="{ position: 'fixed' }"
    >
    </v-progress-circular>

    <v-btn
      position="fixed"
      icon
      color="primary"
      width="64"
      height="64"
      variant="contained-text"
      disabled
      class="ma-1 text-h5"
    >
      {{ countdown }}
    </v-btn>
  </div>
</template>
