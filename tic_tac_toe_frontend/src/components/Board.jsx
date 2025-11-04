import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component renders a 3x3 grid of squares.
 * Props:
 * - squares: (('X'|'O'|null)[]) length 9
 * - onSquareClick: (index: number) => void
 * - winningLine: number[] | null - indices of winning squares to highlight
 */
export default function Board({ squares, onSquareClick, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = winningLine ? winningLine.includes(i) : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      <div className="ttt-row" role="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="ttt-row" role="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="ttt-row" role="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
