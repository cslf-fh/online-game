<script setup lang="ts">
import { useDisplay } from 'vuetify';

const route = useRoute();
const { $userInfo } = useNuxtApp();
const { themeIcon, toggleTheme } = useTheme();
const { pageTitle } = usePageTitle();
const { smAndUp } = useDisplay();

await useFetch(`/api/players-info/${$userInfo.value.uid}`); // プレイヤー情報を追加

useHead({ title: pageTitle(route.path) });
</script>

<template>
  <div>
    <v-card flat width="100vw" height="100vh">
      <v-card flat width="80vw" height="100vh" class="ma-auto">
        <v-row no-gutters align="center" :style="{ height: '100%' }">
          <v-col cols="12">
            <v-spacer></v-spacer>
          </v-col>

          <v-col cols="12">
            <SetPlayerNameForm />
          </v-col>

          <v-col cols="12">
            <RouteToMatchingButton />
          </v-col>

          <v-col cols="12">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-card>
    </v-card>

    <v-bottom-navigation :grow="smAndUp">
      <HowToPlayDialog />

      <ShareButtonsDialog />

      <v-btn :prepend-icon="themeIcon" @click="toggleTheme"></v-btn>
    </v-bottom-navigation>
  </div>
</template>
