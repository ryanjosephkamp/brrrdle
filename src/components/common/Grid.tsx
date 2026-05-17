import Tile from './Tile';
import { GameRow } from '../../types/game';

interface GridProps {
  rows: GameRow[];
  currentRow: number;
  wordLength: number;
}

export default function Grid({ rows, currentRow, wordLength }: GridProps) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.tiles.map((tile, colIndex) => (
            <Tile
              key={colIndex}
              letter={tile.letter}
              state={tile.state}
              isCurrentRow={rowIndex === currentRow}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
