import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import type { PLAYER_INFO } from '~~/types';

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert('./firebase.admin.json'),
    databaseURL: useRuntimeConfig().public.databaseUrl,
  });
}

export default defineEventHandler((event) => {
  console.log('New request: ' + event.context.params.userId);
  const userId = event.context.params.userId;

  const db = getDatabase();
  const playersInfoRef = db.ref('players-info');

  // プレイヤー情報を取得
  playersInfoRef.once('value', (snapshot) => {
    const playersInfo = snapshot.val();
    const playerExists = userId in playersInfo; // プレイヤー情報情報があるかどうか

    if (playerExists) return; // ある場合は何もしない

    const playerRef = db.ref(`players-info/${userId}`);
    const playerInfo: PLAYER_INFO = {
      userId: userId,
      name: '名無しさん',
      state: 'standby',
      roomId: '',
    };

    playerRef.set(playerInfo); // プレイヤー情報を追加
  });

  return null;
});
