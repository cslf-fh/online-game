<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';
import type { MATCHING_ROOM } from '~~/types';

type PROPS = {
  roomInfo: MATCHING_ROOM;
};
const { roomInfo } = defineProps<PROPS>();

const boardStore = useBoardStore();
const { tileState, removedTile } = storeToRefs(boardStore);
</script>

<template>
  <div class="d-flex justify-center">
    <v-sheet border width="75vw" height="75vw">
      <div
        v-for="(row, rowIndex) in roomInfo.boardState"
        :key="'foo'"
        class="d-flex justify-center"
      >
        <div v-for="(tile, colIndex) in row" :key="'bar'">
          <v-sheet
            border
            width="25vw"
            height="25vw"
            @click="
              boardStore.putStone(roomInfo.turn, tile, rowIndex, colIndex),
                boardStore.removeStone(rowIndex, colIndex)
            "
            class="d-flex flex-column justify-center align-center"
          >
            <p>{{ tileState(rowIndex, colIndex) }}</p>
            <p>{{ removedTile(rowIndex, colIndex) }}</p>
            <p>{{ rowIndex }}/{{ colIndex }}</p>
          </v-sheet>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
