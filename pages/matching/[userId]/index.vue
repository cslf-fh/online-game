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

// マッチングのリクエスト
await useFetch(
  `/api/matching-rooms/${$userInfo.value.uid}/${encodeURI(
    playerInfo.value.name
  )}`
);

watch(playerInfo, () => {
  if (playerInfo.value.state === 'playing') {
    router.push({ path: `/room/${playerInfo.value.roomId}` }); // マッチングが完了したらルームへ移動
  }
});
</script>

<template>
  <div>
    <p>matching</p>
    <p v-if="$userInfo">{{ $userInfo.uid }}</p>
    <p v-if="playerInfo">{{ playerInfo }}</p>
  </div>
</template>
