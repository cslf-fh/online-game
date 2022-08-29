<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardStore } from '~~/stores/board';

type PROPS = {
  showResults: boolean;
};
const { showResults } = defineProps<PROPS>();

const router = useRouter();
const { twitter } = useShareUrl();
const { url: sharedUrl } = usePageTitle();
const boardStore = useBoardStore();
const { countMove, displayItems, winnerName, sharedText } =
  storeToRefs(boardStore);

const routeToLobby = () => {
  router.push({ path: '/lobby' });
};
</script>

<template>
  <v-fab-transition>
    <v-btn
      v-if="boardStore.$state.roomInfo.matchState === 'finished'"
      color="primary"
      icon
      position="fixed"
      :style="{ top: '16px', right: '16px' }"
      @click="showResults = !showResults"
    >
      <v-icon icon="mdi-information-outline"></v-icon>

      <v-dialog v-model="showResults">
        <v-card>
          <v-card-text class="text-center">
            <v-row no-gutters align="center">
              <v-col cols="5">
                <p>{{ displayItems.player.move }}</p>

                <p>{{ displayItems.player.name }}</p>
              </v-col>

              <v-col cols="2">
                <v-icon icon="mdi-minus"></v-icon>
              </v-col>

              <v-col cols="5">
                <p>{{ displayItems.enemy.move }}</p>

                <p>{{ displayItems.enemy.name }}</p>
              </v-col>

              <v-col cols="12" class="mt-4">
                <p>{{ `${countMove}、${winnerName}の勝ち` }}</p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-space-around">
            <v-btn
              color="primary"
              prepend-icon="mdi-arrow-left-bold-outline"
              @click="routeToLobby"
            >
              ロビーへ戻る
            </v-btn>

            <v-btn
              color="primary"
              prepend-icon="mdi-twitter"
              @click="twitter(sharedUrl, sharedText)"
            >
              結果をシェア
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-fab-transition>
</template>
