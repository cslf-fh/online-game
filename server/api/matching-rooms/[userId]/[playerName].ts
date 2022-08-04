import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getTime } from 'date-fns';
import type { MATCHING_ROOM, BOARD_STATE, PLAYER_INFO } from '~~/types';

const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert('./firebase.admin.json'),
    databaseURL: useRuntimeConfig().public.databaseUrl,
  });
}

// 初期盤面
const initBoard: BOARD_STATE = [
  [
    { state: 0, move: 0 },
    { state: 0, move: 0 },
    { state: 0, move: 0 },
  ],
  [
    { state: 0, move: 0 },
    { state: 0, move: 0 },
    { state: 0, move: 0 },
  ],
  [
    { state: 0, move: 0 },
    { state: 0, move: 0 },
    { state: 0, move: 0 },
  ],
];

export default defineEventHandler((event) => {
  console.log(
    'New request: ' +
      event.context.params.userId +
      '/' +
      decodeURI(event.context.params.playerName)
  );
  const userId = event.context.params.userId;
  const playerName = decodeURI(event.context.params.playerName);
  const makeRoomAt = getTime(new Date());

  const db = getDatabase();
  const playerInfoPath = 'players-info';
  const matchingRoomsPath = 'matching-rooms';
  const playerInfoRef = db.ref(`${playerInfoPath}/${userId}`);
  const matchingRoomsRef = db.ref(`${matchingRoomsPath}`);

  playerInfoRef.once('value', (snapshot) => {
    const playerInfo: PLAYER_INFO = snapshot.val(); // プレイヤー情報を取得

    if (playerInfo.state !== 'standby') return; // マッチング済みなら何もしない

    matchingRoomsRef.once('value', (snapshot) => {
      const matchingRooms = snapshot.val(); // マッチングルームのリストを取得
      const matchingRoomExists = userId in matchingRooms; // ルーム作成済みかどうか

      if (matchingRoomExists) return; // ルーム作成済みなら何もしない

      const sortedRooms: MATCHING_ROOM[] = Object.values(matchingRooms); // ソートしやすいように、プロパティの値を配列に
      sortedRooms.sort((a, b) => a.makeRoomAt - b.makeRoomAt); // ルーム作成日時でソート

      // マッチング可能なルームを取得
      const matchingRoom: MATCHING_ROOM | undefined = sortedRooms.find(
        (elm) => {
          return elm.matchState === 'matching';
        }
      );

      if (matchingRoom) {
        // マッチング可能なルームがある場合
        const matchingRoomRef = db.ref(
          `${matchingRoomsPath}/${matchingRoom.roomId}`
        );
        const player1Ref = db.ref(
          `${playerInfoPath}/${matchingRoom.player1.userId}`
        );
        const matchingRoomInfo: MATCHING_ROOM = {
          makeRoomAt: matchingRoom.makeRoomAt,
          roomId: matchingRoom.roomId,
          player1: matchingRoom.player1,
          player2: {
            userId: userId,
            name: playerName,
            state: 'connected',
          },
          turn: matchingRoom.turn,
          matchState: 'playing',
          boardState: matchingRoom.boardState,
        };
        const player1Info: PLAYER_INFO = {
          userId: matchingRoom.player1.userId,
          name: matchingRoom.player1.name,
          state: 'playing',
          roomId: matchingRoom.roomId,
        };
        const player2Info: PLAYER_INFO = {
          ...playerInfo,
          state: 'playing',
          roomId: matchingRoom.roomId,
        };

        matchingRoomRef.update(matchingRoomInfo); // ルーム情報更新
        player1Ref.update(player1Info); // プレイヤー情報更新
        playerInfoRef.update(player2Info);
      } else {
        // マッチング可能なルームがない場合
        const matchingRoomRef = db.ref(`${matchingRoomsPath}/${userId}`);
        const rand = Math.floor(Math.random() * 100);
        const turn = rand < 50 ? 'player1' : 'player2';
        const matchingRoomInfo: MATCHING_ROOM = {
          makeRoomAt: makeRoomAt,
          roomId: userId,
          player1: {
            userId: userId,
            name: playerName,
            state: 'connected',
          },
          player2: {
            userId: '',
            name: '',
            state: 'disconnected',
          },
          turn: turn,
          matchState: 'matching',
          boardState: initBoard,
        };
        const player1Info: PLAYER_INFO = {
          ...playerInfo,
          state: 'matching',
          roomId: userId,
        };

        matchingRoomRef.set(matchingRoomInfo); // ルーム作成
        playerInfoRef.update(player1Info); // プレイヤー情報更新
      }
    });
  });
});
