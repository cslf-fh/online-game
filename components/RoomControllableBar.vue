<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';

type PROPS = {
  camp: 'player' | 'enemy';
};
const { camp } = defineProps<PROPS>();

const boardStore = useBoardStore();
const { displayItems } = storeToRefs(boardStore);
const height = 10; // 手番表示バーの高さ
</script>

<template>
  <v-sheet
    v-if="displayItems[camp].turn === boardStore.$state.roomInfo.turn"
    color="primary"
    :height="height"
    rounded
  ></v-sheet>

  <v-spacer v-else :style="{ height: `${height}px` }"></v-spacer>
</template>
