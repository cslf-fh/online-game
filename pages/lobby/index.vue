<script setup lang="ts">
const { $userInfo } = useNuxtApp();
const { signOut } = useAuth();

await useFetch(`/api/players-info/${$userInfo.value.uid}`); // プレイヤー情報を追加
</script>

<template>
  <div>
    <SetPlayerNameForm></SetPlayerNameForm>
    <RouteToMatchingButton></RouteToMatchingButton>
    <v-btn v-if="$userInfo" @click="signOut">signout</v-btn>
    <p v-if="$userInfo">{{ $userInfo.uid }}</p>
  </div>
</template>
