export interface TileState {
  letter: string;
  status: 'empty' | 'tbd' | 'absent' | 'present' | 'correct';
}

export interface GameRow {
  tiles: TileState[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  wordLength: number;
  maxGuesses: number;
  currentRow: number;
  grid: GameRow[];
  status: GameStatus;
  targetWord: string;
  hardMode: boolean;
}
