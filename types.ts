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
  firstMove: TURN;
  move: number;
  turn: TURN;
  matchState: MATCH_STATE;
  winner: TURN | 'nobody';
  boardState: BOARD_STATE;
};

export type MATCHING_PLAYER_INFO = {
  userId: string;
  name: string;
  state: 'connected' | 'disconnected';
};

export type TURN = 'player1' | 'player2';

export type MATCH_STATE = 'matching' | 'playing' | 'finished';

export type TILE = {
  state: -1 | 0 | 1;
  move: number;
};

export type BOARD_STATE_ROW = [TILE, TILE, TILE];

export type BOARD_STATE = [BOARD_STATE_ROW, BOARD_STATE_ROW, BOARD_STATE_ROW];
