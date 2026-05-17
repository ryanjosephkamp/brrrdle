export function getTileStates(guess: string, solution: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = Array(guess.length).fill('absent');
  const solutionLetters = [...solution];
  const guessLetters = [...guess];

  // First pass: mark correct letters (green)
  for (let i = 0; i < guess.length; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      result[i] = 'correct';
      solutionLetters[i] = '#'; // mark as used
      guessLetters[i] = '#';
    }
  }

  // Second pass: mark present letters (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (guessLetters[i] !== '#' && result[i] === 'absent') {
      const index = solutionLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = 'present';
        solutionLetters[index] = '#';
      }
    }
  }

  return result;
}
