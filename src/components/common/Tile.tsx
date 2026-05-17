import { LetterState } from '../../types/game';

interface TileProps {
  letter: string;
  state: LetterState;
  isCurrentRow: boolean;
}

export default function Tile({ letter, state, isCurrentRow }: TileProps) {
  const getBgColor = () => {
    if (state === 'correct') return 'bg-green-600 text-white';
    if (state === 'present') return 'bg-yellow-500 text-white';
    if (state === 'absent') return 'bg-gray-600 text-white';
    return isCurrentRow ? 'border-2 border-gray-400' : 'border border-gray-300';
  };

  return (
    <div
      className={`w-14 h-14 flex items-center justify-center text-3xl font-bold border-2 transition-all duration-300 ${getBgColor()} ${letter ? 'scale-100' : 'scale-95'}`}
    >
      {letter}
    </div>
  );
}
