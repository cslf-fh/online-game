<script setup lang="ts">
const { $userInfo } = useNuxtApp();

const playerName = ref('');
const dialog = ref(false);
const form = ref();
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length <= 10 || 'Name must be less than 10 characters',
];

const setPlayerName = async () => {
  //正規表現(playerName.value);
  const validate = await form.value.validate(); // バリデーション

  if (!validate.valid) return; // バリデーションが通らなければ何もしない
  if (playerName.value === '') playerName.value = '名無しさん'; // 未入力の場合はデフォルトネーム

  // プレイヤーの名前を更新
  await useFetch(
    `/api/players-info/set-player-name/${$userInfo.value.uid}/${encodeURI(
      `${playerName.value}`
    )}`
  );
  dialog.value = false; // ダイアログを閉じる
};
</script>

<template>
  <v-btn>
    Set player name
    <v-dialog v-model="dialog" activator="parent">
      <v-card width="50vw">
        <v-card-title>Set player name</v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="playerName"
              :rules="nameRules"
              counter="10"
              variant="outlined"
              label="Player name"
              placeholder="名無しさん"
            ></v-text-field>

            <div class="d-flex justify-center">
              <v-btn @click="setPlayerName">submit</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
