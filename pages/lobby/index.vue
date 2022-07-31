<script setup lang="ts">
import type { PLAYER_INFO } from '@/types';

const router = useRouter();
const { $userInfo } = useNuxtApp();
const { signOut } = useAuth();
const { getData } = useDatabase();

await useFetch(`api/players-info/${$userInfo.value.uid}`); // プレイヤー情報を追加

const { narrowedData: playerInfo } = getData<PLAYER_INFO>(
  'players-info',
  $userInfo.value.uid
);

const routeToMatching = () => {
  router.push({ path: `/matching/${$userInfo.value.uid}` });
};
</script>

<template>
  <div>
    <SetPlayerNameForm></SetPlayerNameForm>
    <v-btn @click="routeToMatching">matching</v-btn>
    <v-btn v-if="$userInfo" @click="signOut">signout</v-btn>
    <p v-if="$userInfo">{{ $userInfo.uid }}</p>
    <p v-if="playerInfo">{{ playerInfo }}</p>
  </div>
</template>
