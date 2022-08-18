<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';

const route = useRoute();
const roomId = route.params.roomId as string;

const boardStore = useBoardStore();
const { countStones, displayItems } = storeToRefs(boardStore);
const tileSize = 25; // ゲームタイルのサイズ(vw)
const showResults = ref(false); // リザルト画面のフラグ

boardStore.initBoardStore(roomId); // ボードストアを初期化

watch(boardStore.$state, () => {
  if (boardStore.$state.roomInfo.matchState === 'finished') {
    // ゲーム終了時
    showResults.value = true; // リザルト画面を表示
    boardStore.updatePlayerInfo(); // プレイヤー情報を更新
  }
});
</script>

<template>
  <div>
    <v-card
      v-if="boardStore.$state.showBoard"
      flat
      width="100vw"
      height="100vh"
    >
      <v-card
        flat
        :width="`${tileSize * 3}vw`"
        height="100vh"
        :max-width="`${tileSize * 6 * 3}px`"
        class="ma-auto"
      >
        <v-row no-gutters align="center" :style="{ height: '100%' }">
          <v-col cols="12">
            <v-row no-gutters align="center">
              <v-col cols="12" class="mb-4 text-h5">
                <div class="mb-2">
                  <span class="mr-4">{{ displayItems.enemy.name }}</span>

                  <span>
                    {{
                      displayItems.enemy.stone.repeat(
                        3 - countStones(displayItems.enemy.turn)
                      )
                    }}
                  </span>
                </div>

                <RoomControllableBar camp="enemy" />
              </v-col>

              <v-col cols="12">
                <RoomBoard
                  :room-info="boardStore.$state.roomInfo"
                  :tile-size="tileSize"
                />
              </v-col>

              <v-col cols="12" class="mt-4 text-h5 text-right">
                <RoomControllableBar camp="player" />

                <div class="mt-2">
                  <span>
                    {{
                      displayItems.player.stone.repeat(
                        3 - countStones(displayItems.player.turn)
                      )
                    }}
                  </span>

                  <span class="ml-4">{{ displayItems.player.name }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <RoomPlayerMoveDialog />

      <RoomResultsDialog :show-results="showResults" />
    </v-card>

    <v-card v-else flat width="100vw" height="100vh"></v-card>
  </div>
</template>
