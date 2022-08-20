<script setup lang="ts">
import type { PLAYER_INFO } from '@/types';

const router = useRouter();
const { $userInfo } = useNuxtApp();
const { getData } = useDatabase();
const { showCancelAlert, startCountdown, stopCountdown, resetCountdown } =
  useCountdown();

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
// マッチングキャンセルのリクエスト
const cancelReq = async (routeEnabled: boolean) => {
  stopCountdown(); // カウントダウン停止
  const { refresh } = await useFetch(
    `/api/matching-rooms/cancel/${$userInfo.value.uid}`
  );
  refresh();
  if (routeEnabled) router.push({ path: '/lobby' });
};
const routeToLobby = () => {
  router.push({ path: '/lobby' });
};

matchingReq(); // マッチングのリクエスト
if (showCancelAlert.value) resetCountdown(); // カウントダウンでマッチングをキャンセルしていた場合、カウントダウンを初期化
startCountdown(); // カウントダウン開始

watch(playerInfo, () => {
  if (playerInfo.value.state === 'playing') {
    router.push({ path: `/room/${playerInfo.value.roomId}` }); // マッチングが完了したらルームへ移動
  }
});
watch(showCancelAlert, () => {
  if (showCancelAlert.value === true) {
    cancelReq(false); // カウントダウンが0になったらマッチングをキャンセル
  }
});
</script>

<template>
  <div>
    <v-card flat width="100vw" height="100vh">
      <MatchingCountdownCircular />

      <v-card flat width="80vw" height="100vh" class="ma-auto text-center">
        <v-row
          v-if="showCancelAlert"
          no-gutters
          align="center"
          :style="{ height: '100%' }"
        >
          <v-col v-for="i in 3" :key="i" cols="12"></v-col>

          <v-col cols="12">
            <v-card-text class="text-h6">マッチング不成立</v-card-text>
          </v-col>

          <v-col cols="12">
            <v-alert type="warning" variant="contained-text" class="text-left">
              マッチングが成立しなかったので、キャンセルしました
            </v-alert>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              prepend-icon="mdi-arrow-left-bold-outline"
              @click="routeToLobby"
            >
              ロビーへ戻る
            </v-btn>
          </v-col>

          <v-col cols="12"></v-col>
        </v-row>

        <v-row v-else no-gutters align="center" :style="{ height: '100%' }">
          <v-col v-for="i in 3" :key="i" cols="12"></v-col>

          <v-col cols="12">
            <v-card-text class="text-h6">
              マッチング待機中
              <v-progress-circular
                indeterminate
                color="primary"
                class="ml-4"
              ></v-progress-circular>
            </v-card-text>
          </v-col>

          <v-col cols="12"></v-col>

          <v-col cols="12">
            <v-btn
              color="grey"
              prepend-icon="mdi-cancel"
              @click="cancelReq(true), resetCountdown()"
            >
              キャンセル
            </v-btn>
          </v-col>

          <v-col cols="12"></v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>
