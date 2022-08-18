<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';

const boardStore = useBoardStore();
const { displayItems, countMove, currentTurn } = storeToRefs(boardStore);
const showDialog = ref(true); // 手番画面のフラグ
</script>

<template>
  <v-alert
    v-if="boardStore.$state.playableState === 'watcher'"
    position="fixed"
    type="info"
    variant="contained-text"
    density="compact"
    :style="{ top: '16px', left: '16px' }"
  >
    <p>観戦モード</p>

    <p>{{ `${currentTurn} ${countMove}` }}</p>
  </v-alert>

  <v-dialog
    v-else-if="boardStore.$state.roomInfo.move === 0"
    v-model="showDialog"
  >
    <v-card>
      <v-card-text class="text-center">
        {{ `あなたは${displayItems.player.move}です` }}
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" block @click="showDialog = false">
          対局開始
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
