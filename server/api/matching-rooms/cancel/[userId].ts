import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import type { MATCH_STATE, PLAYER_INFO_STATE } from '~~/types';

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert('./firebase.admin.json'),
    databaseURL: useRuntimeConfig().public.databaseUrl,
  });
}

export default defineEventHandler(async (event) => {
  console.log('New request: ' + event.context.params.userId);
  const userId = event.context.params.userId;

  const db = getDatabase();
  const roomPath = 'matching-rooms';
  const playerPath = 'players-info';
  const roomRef = db.ref(`${roomPath}/${userId}`);
  const playerRef = db.ref(`${playerPath}/${userId}`);

  roomRef.once('value', (snapshot) => {
    const data = snapshot.val();
    const roomInfo = data;

    if (roomInfo.matchState !== 'matching') return; // マッチング中でなければ何もしない

    const matchState: MATCH_STATE = 'finished';
    const playerState: PLAYER_INFO_STATE = 'standby';

    roomRef.update({ matchState: matchState }); // ルームを終了状態に
    playerRef.update({ roomId: '', state: playerState }); // ユーザ情報行使飲
  });
});
