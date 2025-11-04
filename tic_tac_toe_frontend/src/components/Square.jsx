import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square component for a single Tic Tac Toe cell.
 * Props:
 * - value: 'X' | 'O' | null - the symbol to display in the square.
 * - onClick: () => void - click handler to mark the square.
 * - isWinning: boolean - whether this square is part of the winning line; used to highlight.
 */
export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`ttt-square ${isWinning ? 'ttt-square--winning' : ''}`}
      onClick={onClick}
      aria-label={`Square ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}
