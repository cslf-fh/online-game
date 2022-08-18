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
    <v-card flat width="100vw" height="100vh">
      <div class="ma-4" :style="{ 'z-index': 1, position: 'fixed' }">
        <v-progress-circular
          model-value="40"
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
          class="ma-1 text-h5"
        >
          168
        </v-btn>
      </div>

      <v-card flat width="80vw" height="100vh" class="ma-auto text-center">
        <v-row no-gutters align="center" :style="{ height: '100%' }">
          <v-col v-for="i in 3" :key="i" cols="12">
            <v-spacer></v-spacer>
          </v-col>

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

          <v-col v-if="true" cols="12">
            <v-alert type="warning" variant="contained-text" class="text-left">
              マッチングが成立しなかったので、キャンセルします
            </v-alert>
          </v-col>

          <v-col v-else cols="12">
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="12">
            <v-btn color="grey" prepend-icon="mdi-cancel" @click="cancelReq">
              キャンセル
            </v-btn>
          </v-col>

          <v-col cols="12">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>
