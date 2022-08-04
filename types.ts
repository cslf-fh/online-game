// Realtime Database
export type PLAYER_INFO = {
  userId: string;
  name: string;
  state: 'standby' | 'matching' | 'playing';
  roomId: string;
};

export type MATCHING_ROOM = {
  makeRoomAt: number;
  roomId: string;
  player1: MATCHING_PLAYER_INFO;
  player2: MATCHING_PLAYER_INFO;
  turn: 'player1' | 'player2';
  matchState: 'matching' | 'playing';
  boardState: BOARD_STATE;
};

export type MATCHING_PLAYER_INFO = {
  userId: string;
  name: string;
  state: 'connected' | 'disconnected';
};

export type TILE_STATE = {
  state: -1 | 0 | 1;
  move: number;
};

export type BOARD_STATE_ROW = [TILE_STATE, TILE_STATE, TILE_STATE];

export type BOARD_STATE = [BOARD_STATE_ROW, BOARD_STATE_ROW, BOARD_STATE_ROW];
