import React, { useMemo, useState } from 'react';
import Board from './components/Board';
import './styles.css';

/**
 * Compute the winner of a Tic Tac Toe board.
 * Returns:
 * - { winner: 'X' | 'O', line: number[] } if someone won
 * - null otherwise
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * App is the main Tic Tac Toe game component. It manages game state (board, turn),
 * detects wins and draws, displays status, and provides a Reset button.
 */
export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const isDraw = !result && isBoardFull;
  const statusText = result
    ? `Winner: ${result.winner}`
    : isDraw
      ? 'Draw'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleSquareClick = (i) => {
    // Ignore clicks if game over or square already filled
    if (result || squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="app-container">
      <div className="game-card">
        <h1 className="game-title">TIC · TAC · TOE</h1>
        <div className="status" role="status" aria-live="polite">
          {result ? (
            <span className="winner">Winner: {result.winner}</span>
          ) : isDraw ? (
            <span className="draw">Draw</span>
          ) : (
            <span>Next player: {xIsNext ? 'X' : 'O'}</span>
          )}
        </div>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={result ? result.line : null}
        />

        <div className="controls">
          <button className="btn" onClick={resetGame} aria-label="Reset game">
            Reset
          </button>
        </div>

        <div className="footer-note">Retro light theme • No backend required</div>
      </div>
    </div>
  );
}
