// Realtime Database
export type PLAYER_INFO = {
  userId: string;
  name: string;
  state: 'standby' | 'matching' | 'playing';
  roomId: string;
};
