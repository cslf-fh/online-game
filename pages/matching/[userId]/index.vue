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
const matchingReq = async () => {
  const { refresh } = await useFetch(
    `/api/matching-rooms/matching/${$userInfo.value.uid}/${encodeURI(
      playerInfo.value.name
    )}`
  );
  refresh();
};
matchingReq();

// マッチングキャンセルのリクエスト
const cancelReq = async () => {
  const { refresh } = await useFetch(
    `/api/matching-rooms/cancel/${$userInfo.value.uid}`
  );
  refresh();
  router.push({ path: '/lobby' });
};

watch(playerInfo, () => {
  if (playerInfo.value.state === 'playing') {
    router.push({ path: `/room/${playerInfo.value.roomId}` }); // マッチングが完了したらルームへ移動
  }
});
</script>

<template>
  <div>
    <p>matching</p>
    <v-btn @click="cancelReq">cancel</v-btn>
    <p v-if="$userInfo">{{ $userInfo.uid }}</p>
    <p v-if="playerInfo">{{ playerInfo }}</p>
  </div>
</template>
