import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

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

  const firebaseApp = initializeApp(firebaseConfig); // 初期化

  //getAnalytics(firebaseApp);

  const auth = getAuth();
  signInAnonymously(auth); // 匿名サインイン

  const { userInfo } = useAuth(); // ユーザ情報取得

  return {
    provide: {
      firebaseApp: firebaseApp,
      userInfo: userInfo,
    },
  };
});
