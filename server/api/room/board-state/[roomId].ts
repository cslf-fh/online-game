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
  console.log('New request: ' + event.context.params.roomId);
  const body = await useBody(event);
  const roomId = event.context.params.roomId;

  const db = getDatabase();
  const roomPath = 'matching-rooms';
  const roomRef = db.ref(`${roomPath}/${roomId}`);

  roomRef.update(body); // ルーム情報を更新
});
