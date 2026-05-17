import { useEffect } from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onKeyPress('ENTER');
      else if (e.key === 'Backspace') onKeyPress('⌫');
      else if (/^[a-zA-Z]$/.test(e.key)) onKeyPress(e.key.toUpperCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className="flex flex-col gap-2 max-w-[500px] mx-auto">
      {keys.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="px-4 py-4 text-sm font-bold bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
