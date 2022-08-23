<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { $userInfo } = useNuxtApp();
const { pageTitle } = usePageTitle();

const routeToLobby = () => {
  if ($userInfo.value.uid === undefined) return; // サインインしていない場合は何もしない

  router.push({ path: '/lobby' });
};

useHead({ title: pageTitle(route.path) });
</script>

<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        flat
        width="100vw"
        height="100vh"
        class="d-flex flex-column align-center text-high-emphasis"
        v-bind="props"
        :style="{
          'justify-content': 'space-evenly',
        }"
        @click="routeToLobby"
      >
        <v-card-title class="text-h2">
          3目
          <span class="text-body-1">(しかない)</span>
          並べ
        </v-card-title>

        <v-card-text
          class="text-h5"
          :class="!isHovering ? `fade-in-out` : null"
        >
          Touch to start
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<style scoped>
.fade-in-out {
  animation: fade-in-out 2s ease-in-out infinite;
}

@keyframes fade-in-out {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
