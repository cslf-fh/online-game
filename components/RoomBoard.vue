<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';
import type { MATCHING_ROOM } from '~~/types';

type PROPS = {
  roomInfo: MATCHING_ROOM;
  tileSize: number;
};
const { roomInfo, tileSize } = defineProps<PROPS>();

const boardStore = useBoardStore();
const { tileState, removedTile } = storeToRefs(boardStore);
</script>

<template>
  <div class="d-flex justify-center" :style="{ 'user-select': 'none' }">
    <v-sheet
      border
      :width="`${tileSize * 3}vw`"
      :height="`${tileSize * 3}vw`"
      :max-width="`${tileSize * 6 * 3}px`"
      :max-height="`${tileSize * 6 * 3}px`"
    >
      <div
        v-for="(row, rowIndex) in roomInfo.boardState"
        :key="row[rowIndex].move"
        class="d-flex justify-center"
      >
        <div v-for="(tile, colIndex) in row" :key="tile.move">
          <v-sheet
            border
            :width="`${tileSize}vw`"
            :height="`${tileSize}vw`"
            :max-width="`${tileSize * 6}px`"
            :max-height="`${tileSize * 6}px`"
            @click="
              boardStore.putStone(roomInfo.turn, tile, rowIndex, colIndex),
                boardStore.removeStone(rowIndex, colIndex)
            "
            class="d-flex flex-column justify-center align-center text-h2"
            :class="removedTile(rowIndex, colIndex) ? 'bg-grey' : null"
          >
            <p>{{ tileState(rowIndex, colIndex) }}</p>
          </v-sheet>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
