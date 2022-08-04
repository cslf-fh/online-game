<script setup lang="ts">
import type { PLAYER_INFO } from '@/types';

const router = useRouter();
const { $userInfo } = useNuxtApp();
const { getData } = useDatabase();

const { narrowedData: playerInfo } = getData<PLAYER_INFO>(
  'players-info',
  $userInfo.value.uid
);

const routeToMatching = () => {
  router.push({ path: `/matching/${$userInfo.value.uid}` });
};
const routeToRoom = () => {
  router.push({ path: `/room/${playerInfo.value.roomId}` });
};
</script>

<template>
  <div v-if="playerInfo">
    <v-btn v-if="playerInfo.state === 'standby'" @click="routeToMatching">
      standby
    </v-btn>
    <v-btn v-else-if="playerInfo.state === 'matching'" @click="routeToMatching">
      matching
    </v-btn>
    <v-btn v-else-if="playerInfo.state === 'playing'" @click="routeToRoom">
      playing
    </v-btn>
  </div>
</template>
