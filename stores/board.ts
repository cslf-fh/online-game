import { defineStore } from 'pinia';
import { getDatabase, ref, onValue } from 'firebase/database';
import type { MATCHING_ROOM, BOARD_STATE, TURN, TILE } from '~~/types';

type PLAYABLE_STATE = 'player1' | 'player2' | 'watcher';

// 盤面が勝利条件を満たすかどうかをチェックする配列
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useBoardStore = defineStore({
  id: 'board',
  state: () => ({
    userId: '', // ユーザID
    roomInfo: {} as MATCHING_ROOM, // DBから取得したルームのデータ
    showBoard: false, // 盤面表示フラグ
    playableState: '' as PLAYABLE_STATE, // 1Pか2Pか観戦か
  }),

  getters: {
    // 盤面のマスを見つける
    findTile(state) {
      return (rowIndex: number, colIndex: number): TILE => {
        const tile = state.roomInfo.boardState[rowIndex][colIndex];

        return tile;
      };
    },

    // 操作可能かどうか
    isControllable(state): boolean {
      return state.roomInfo.turn === state.playableState ? true : false;
    },

    // マスに置かれた石
    tileState(state) {
      return (rowIndex: number, colIndex: number): '○' | '×' | null => {
        const tile = state.roomInfo.boardState[rowIndex][colIndex];

        switch (tile.state) {
          case 1:
            return '○';
          case -1:
            return '×';
          default:
            return null;
        }
      };
    },

    // 取り除かなければならないマス
    removedTile(state) {
      return (rowIndex: number, colIndex: number): boolean => {
        const tile = state.roomInfo.boardState[rowIndex][colIndex];

        // 取り除かなければならないマスかどうか
        if (
          tile.state !== 0 &&
          state.roomInfo.move - tile.move === 5 &&
          state.roomInfo.matchState === 'playing'
        ) {
          // 石が置かれていて、かつ5手前に置かれたマスで対戦中の場合
          return true;
        } else {
          return false;
        }
      };
    },

    // 盤面に置かれた石の数
    countStones(state) {
      return (player: TURN): 0 | 1 | 2 | 3 => {
        let stones: 0 | 1 | 2 | 3 = 0;
        const tileState = player === state.roomInfo.firstMove ? 1 : -1;

        state.roomInfo.boardState.forEach((rowElm) => {
          rowElm.forEach((colElm) => {
            colElm.state === tileState ? stones++ : null;
          });
        });

        return stones;
      };
    },

    // 今何手目か
    countMove(state): string | null {
      switch (state.roomInfo.matchState) {
        case 'playing':
          return `${state.roomInfo.move + 1}手目`;
        case 'finished':
          return `${state.roomInfo.move}手まで`;
        default:
          return null;
      }
    },

    // 勝利条件を満たしているかどうか
    checkWinFlag(state): boolean {
      let winFlag = false; // 勝利条件のフラグ
      const putPattern: number[] = []; // 石を置いたマスのインデックスの配列
      const tileState =
        state.roomInfo.turn === state.roomInfo.firstMove ? 1 : -1;

      // 盤面を検索
      state.roomInfo.boardState.forEach((rowElm, rowIndex) => {
        rowElm.forEach((colElm, colIndex) => {
          const tileIndex = rowIndex * 3 + colIndex; // マスのインデックス

          colElm.state === tileState ? putPattern.push(tileIndex) : null; // 石が置かれていれば配列に追加
        });
      });

      // 勝利条件を検索
      winPatterns.forEach((elm) => {
        const winPatternToString = JSON.stringify(elm);
        const putPatternToString = JSON.stringify(putPattern);

        winPatternToString === putPatternToString ? (winFlag = true) : null; // 勝利条件を満たしていればフラグをオン
      });

      return winFlag;
    },
  },

  actions: {
    // ボードストアの初期化
    initBoardStore(roomId: string) {
      const { $userInfo } = useNuxtApp(); // サインインしているユーザの情報
      const { $firebaseApp } = useNuxtApp();
      const db = getDatabase($firebaseApp);

      onValue(ref(db, `matching-rooms/${roomId}`), (snapshot) => {
        const data = snapshot.val();

        this.userId = $userInfo.value.uid; // ユーザID
        this.roomInfo = data; // ルームの情報
        this.showBoard = true; // 盤面を表示
        // 1Pか2Pか観戦か
        this.playableState =
          this.roomInfo.player1.userId === this.userId
            ? 'player1'
            : this.roomInfo.player2.userId === this.userId
            ? 'player2'
            : 'watcher';
      });
    },

    // マスに石を置く
    putStone(turn: TURN, tile: TILE, rowIndex: number, colIndex: number) {
      // マスに石を置けるかどうか
      if (
        !this.isControllable ||
        this.countStones(turn) > 2 ||
        tile.state !== 0 ||
        tile.move === -1
      )
        // 操作不可、盤面に石が既に3個置かれている、マスに石が既に置かれている、または配置不可マスの場合は何もしない
        return;

      const tileState = turn === this.roomInfo.firstMove ? 1 : -1;
      const placedTile = this.findTile(rowIndex, colIndex);

      placedTile.state = tileState;
      placedTile.move = this.roomInfo.move + 1;

      // 勝利フラグを満たしているかどうか
      if (this.checkWinFlag) {
        // 満たしている場合
        this.setResults(); // 終了処理
      } else {
        // 満たしていない場合
        this.changeTurn(); // ターン変更処理
        this.refleshRemovedTile(); // 配置不可マスを配置可に
      }

      this.updateRoomInfo(); // DBのルーム情報更新
    },

    // マスから石を取り除く
    removeStone(rowIndex: number, colIndex: number) {
      // マスから石を取り除けるかどうか
      if (!this.isControllable || !this.removedTile(rowIndex, colIndex))
        // 操作不可、または取り除くマスではなければ何もしない
        return;

      const removedTile = this.findTile(rowIndex, colIndex);

      removedTile.state = 0;
      removedTile.move = -1; // 配置不可マスにする
      this.updateRoomInfo();
    },

    // ターン変更処理
    changeTurn() {
      this.roomInfo.move++;
      this.roomInfo.turn === 'player1'
        ? (this.roomInfo.turn = 'player2')
        : (this.roomInfo.turn = 'player1');
    },

    // 配置不可マスを配置可にする処理
    refleshRemovedTile() {
      this.roomInfo.boardState.forEach((rowElm) => {
        rowElm.forEach((colElm) => {
          colElm.move === -1 ? (colElm.move = 0) : null;
        });
      });
    },

    // ゲーム終了処理
    setResults() {
      this.roomInfo.move++;
      this.roomInfo.winner = this.roomInfo.turn;
      this.roomInfo.matchState = 'finished';
    },

    // 盤面情報を更新
    async updateRoomInfo() {
      await $fetch(`/api/room/board-state/${this.roomInfo.roomId}`, {
        method: 'POST',
        body: this.roomInfo,
      });
    },

    // プレイヤー情報を更新
    async updatePlayerInfo() {
      const playerInfo = { state: 'standby', roomId: '' };

      await $fetch(`/api/room/player-info/${this.userId}`, {
        method: 'POST',
        body: playerInfo,
      });
    },
  },
});
