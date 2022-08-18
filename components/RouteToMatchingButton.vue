<script setup lang="ts">
import type { PLAYER_INFO } from '@/types';

const router = useRouter();
const { $userInfo } = useNuxtApp();
const { getData } = useDatabase();

// プレイヤー情報を取得
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
    <v-btn
      v-if="playerInfo.state === 'standby' || playerInfo.state === 'matching'"
      color="primary"
      prepend-icon="mdi-gamepad-variant-outline"
      block
      size="x-large"
      @click="routeToMatching"
    >
      対戦
    </v-btn>

    <v-btn
      v-else-if="playerInfo.state === 'playing'"
      color="primary"
      prepend-icon="mdi-arrow-right-bold-outline"
      block
      size="x-large"
      @click="routeToRoom"
    >
      ルームへ移動
    </v-btn>
  </div>

  <div v-else>
    <v-btn
      color="primary"
      prepend-icon="mdi-gamepad-variant-outline"
      block
      size="x-large"
    >
      対戦
    </v-btn>
  </div>
</template>
