import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert('./firebase.admin.json'),
    databaseURL: useRuntimeConfig().public.databaseUrl,
  });
}

export default defineEventHandler(async (event) => {
  console.log('New request: ' + event.context.params.userId);
  const body = await useBody(event);
  const userId = event.context.params.userId;

  const db = getDatabase();
  const playerPath = 'players-info';
  const playerRef = db.ref(`${playerPath}/${userId}`);

  playerRef.update(body); // プレイヤー情報を更新
});
