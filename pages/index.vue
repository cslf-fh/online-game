<script setup lang="ts">
const router = useRouter();
const { $userInfo } = useNuxtApp();

const routeToLobby = () => {
  if ($userInfo.value.uid === undefined) return; // サインインしていない場合は何もしない

  router.push({ path: `/lobby` });
};
</script>

<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        variant="plain"
        width="100vw"
        height="100vh"
        class="d-flex justify-center align-center"
        v-bind="props"
        @click="routeToLobby"
      >
        <v-card-text :class="[`text-h4`, !isHovering ? `fade-in-out` : null]">
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
