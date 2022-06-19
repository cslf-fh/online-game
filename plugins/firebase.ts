import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseUrl,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.measurementId,
    appId: config.appId,
    measurementId: config.measurementId,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  return {
    provide: {
      firebaseApp: firebaseApp,
    },
  };
});
