<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';

const route = useRoute();
const roomId = route.params.roomId as string;

const boardStore = useBoardStore();
const { countStones, countMove, isControllable } = storeToRefs(boardStore);

boardStore.initBoardStore(roomId); // ボードストアを初期化

watch(boardStore.$state, () => {
  if (boardStore.$state.roomInfo.matchState === 'finished') {
    // ゲーム終了時
    boardStore.updatePlayerInfo(); // プレイヤー情報を更新
  }
});
</script>

<template>
  <div>
    <p>room</p>
    <div v-if="boardStore.$state.showBoard">
      <p>{{ isControllable }}</p>
      <p>{{ boardStore.$state.userId }}</p>
      <p>{{ boardStore.$state.playableState }}</p>
      <p v-if="boardStore.$state.roomInfo.winner">
        {{ boardStore.$state.roomInfo.winner }}勝
      </p>
      <p>{{ countMove }}</p>
      <p>{{ countStones('player1') + '個' }}</p>
      <p>{{ countStones('player2') + '個' }}</p>

      <board :room-info="boardStore.$state.roomInfo" />

      <p>{{ boardStore.$state.roomInfo }}</p>
    </div>

    <v-btn to="/lobby">lobby</v-btn>
  </div>
</template>
