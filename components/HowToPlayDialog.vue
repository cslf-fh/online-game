<script setup lang="ts">
const showDialog = ref(false);
</script>

<template>
  <v-btn prepend-icon="mdi-help-circle-outline" @click="showDialog = true">
    <v-dialog v-model="showDialog">
      <v-card
        max-height="80vh"
        class="py-2 scroll-y"
        :style="{ 'overflow-y': 'scroll' }"
      >
        <v-card-title>
          <v-alert
            border="start"
            color="primary"
            variant="contained-text"
            density="compact"
          >
            どんなゲームなの？
          </v-alert>
        </v-card-title>

        <v-card-text class="px-4 pt-0">
          3目<span class="text-caption">(しかない)</span>並べです。
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          ただ、駒を無くしてしまい、3個ずつしかありません。
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          でも、それでも、どうしても3目並べがしたいので、3目<span
            class="text-caption"
            >(しかない)</span
          >並べをすることにしました。
        </v-card-text>

        <v-divider></v-divider>

        <v-card-title>
          <v-alert
            border="start"
            color="primary"
            variant="contained-text"
            density="compact"
          >
            遊び方は？
          </v-alert>
        </v-card-title>

        <v-card-text class="px-4 pt-0">
          基本的には普通の3目並べと同じルールです。
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          ただ、駒が3個しかないので、駒が足りなくなったら一番前に置いた駒を手元に戻します。
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          それからその駒を置きますが、今手元に戻した場所以外にしか置けません。
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          それ以外はいたって普通の3目並べです。
        </v-card-text>

        <v-divider></v-divider>

        <v-card-title>
          <v-alert
            border="start"
            color="primary"
            variant="contained-text"
            density="compact"
          >
            連絡先
          </v-alert>
        </v-card-title>

        <v-card-text class="px-4 pt-0">
          <a
            href="https://twitter.com/cslf_fh"
            class="text-info text-decoration-none"
          >
            @cslf_hf
          </a>
        </v-card-text>

        <v-card-text class="px-4 pt-0">
          何かございましたらTwitterまでご連絡ください。
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            block
            :stacked="false"
            class="text-primary"
            @click="showDialog = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style lang="scss" scoped>
.scroll-y {
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
}
</style>
