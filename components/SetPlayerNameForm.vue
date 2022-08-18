<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { $userInfo } = useNuxtApp();
const { mdAndUp } = useDisplay();

const playerName = ref('');
const showDialog = ref(false);
const form = ref();
const nameRules = [
  (v: string) => v.length <= 10 || '10字以内で入力してください',
];

const setPlayerName = async () => {
  const validate = await form.value.validate(); // バリデーション

  if (!validate.valid) return; // バリデーションが通らなければ何もしない
  if (playerName.value === '') playerName.value = '名無しさん'; // 未入力の場合はデフォルトネーム

  // プレイヤーの名前を更新
  await useFetch(
    `/api/players-info/set-player-name/${$userInfo.value.uid}/${encodeURI(
      `${playerName.value}`
    )}`
  );
  showDialog.value = false; // ダイアログを閉じる
};
</script>

<template>
  <v-btn
    color="primary"
    prepend-icon="mdi-script-text-outline"
    block
    size="x-large"
  >
    プレイヤー名を入力
    <v-dialog v-model="showDialog" activator="parent">
      <v-card width="50vw" :max-width="mdAndUp ? '560px' : '280px'">
        <v-card-title>プレイヤー名を入力</v-card-title>

        <v-form ref="form">
          <v-card-text class="pb-0">
            <v-text-field
              v-model="playerName"
              :rules="nameRules"
              counter="10"
              variant="outlined"
              label="プレイヤー名"
              placeholder="名無しさん"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              prepend-icon="mdi-gamepad-circle-down"
              block
              @click="setPlayerName"
            >
              決定
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
