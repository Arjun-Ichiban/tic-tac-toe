'use client'
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: null };
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board).winner) return;
    
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const result = calculateWinner(newBoard);
    if (result.line) {
      setWinningLine(result.line);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const result = calculateWinner(board);
  const status = result.winner 
    ? `Winner: ${result.winner}`
    : board.every(square => square) 
    ? "Game is a draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
      
      <div className="mb-4 text-xl font-semibold">{status}</div>
      
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((square, index) => (
          <button
            key={index}
            className={`w-20 h-20 bg-white border-2 border-gray-300 text-4xl font-bold text-gray-800 flex items-center justify-center hover:bg-gray-100 
              ${winningLine?.includes(index) ? 'bg-green-200 border-green-400' : ''}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
