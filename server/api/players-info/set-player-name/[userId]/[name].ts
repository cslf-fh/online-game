import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert('./firebase.admin.json'),
    databaseURL: useRuntimeConfig().public.databaseUrl,
  });
}

export default defineEventHandler((event) => {
  console.log('New request: ' + decodeURI(event.context.params.name));
  const userId = event.context.params.userId;
  const playerName = decodeURI(event.context.params.name);

  const db = getDatabase();
  const playerRef = db.ref(`players-info/${userId}`);

  // プレイヤーの名前を更新
  playerRef.update({
    name: playerName,
  });

  return null;
});
