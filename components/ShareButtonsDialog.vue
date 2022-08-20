<script setup lang="ts">
const baseUrl = 'https://qiita.com/cslf-fh';
const facebookBaseUrl = 'https://www.facebook.com/sharer/sharer.php';
const twitterBaseUrl = 'https://twitter.com/intent/tweet';
const lineBaseUrl = 'https://social-plugins.line.me/lineit/share';
const showDialog = ref(false);
const size = 64;

const shareFacebook = () => {
  const shareUrl = `${facebookBaseUrl}?u=${baseUrl}`;
  window.open(shareUrl);
};
const shareTwitter = () => {
  const shareUrl = `${twitterBaseUrl}?url=${baseUrl}`;
  window.open(shareUrl);
};
const shareLine = () => {
  const shareUrl = `${lineBaseUrl}?url=${baseUrl}`;
  window.open(shareUrl);
};
</script>

<template>
  <v-btn prepend-icon="mdi-share" @click="showDialog = true">
    <v-dialog v-model="showDialog">
      <v-card width="75vw">
        <v-card-title>シェアする</v-card-title>

        <v-card-text class="text-center">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex flex-column align-center">
              <v-avatar :size="size" class="is-hover" @click="shareFacebook">
                <v-img src="/images/facebook.png"></v-img>
              </v-avatar>

              <p class="mt-2">Facebook</p>
            </v-col>

            <v-col cols="4" class="d-flex flex-column align-center">
              <v-avatar :size="size" class="is-hover" @click="shareTwitter">
                <v-img src="/images/twitter.png"></v-img>
              </v-avatar>

              <p class="mt-2">Twitter</p>
            </v-col>

            <v-col cols="4" class="d-flex flex-column align-center">
              <v-avatar :size="size" class="is-hover" @click="shareLine">
                <v-img src="/images/line.png"></v-img>
              </v-avatar>

              <p class="mt-2">LINE</p>
            </v-col>
          </v-row>
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
.is-hover {
  cursor: pointer;
}
</style>
