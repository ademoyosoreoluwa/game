import { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, onReset }) {
  const { winner, winningLine } = calculateWinner(squares);
  let status = (winner === 'draw') ? 'No winner: Restart the game.' : winner ? 'Winner: ' + winner : 'Player: ' + (xIsNext ? '1' : '2');

  function handleClick(i) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? '♟️' : '⚜️';
    onPlay(nextSquares);
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {squares.slice(0, 3).map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winningLine.includes(i)}
          />
        ))}
      </div>
      <div className='board-row'>
        {squares.slice(3, 6).map((square, i) => (
          <Square
            key={i + 3}
            value={square}
            onSquareClick={() => handleClick(i + 3)}
            isWinningSquare={winningLine.includes(i + 3)}
          />
        ))}
      </div>
      <div className='board-row'>
        {squares.slice(6, 9).map((square, i) => (
          <Square
            key={i + 6}
            value={square}
            onSquareClick={() => handleClick(i + 6)}
            isWinningSquare={winningLine.includes(i + 6)}
          />
        ))}
      </div>
      {winner && <button onClick={onReset}>Restart Game</button>}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description = (move !== 0) ? 'Go to move No: ' + move : 'Begin the game !';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
          onReset={resetGame} 
        />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  if (!squares.includes(null)) return { winner: 'draw', winningLine: [] };
  return { winner: null, winningLine: [] };
}



// import { useState } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className='square' onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay, onReset }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) return;
//     const nextSquares = squares.slice();
//     nextSquares[i] = xIsNext ? '♟️' : '⚜️';

//     // if (xIsNext) { 
//     //   nextSquares[i] = '♟️' ;
//     // } else { 
//     //   nextSquares[i] = '⚜️';
//     // }

//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status = (winner === 'draw')? 'No winner: Restart the game.' : winner? 'winner: ' + winner : 'Player: ' + (xIsNext ? '1' : '2');

//   // let status;
//   // if (winner === 'draw') {
//   //   status = 'No winner: Restart the game.';
//   // } else if (winner) {
//   //   statue = 'Winner: ' + winner;  
//   // } else {
//   //   status = 'Player: ' + (xIsNext ? '1' : '2');
//   // }

//   return (
//     <>
//       <div className='status'>{status}</div>
//       <div className='board-row'>
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className='board-row'>
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className='board-row'>
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//       {winner && <button onClick={onReset}>Restart Game</button>}
//     </>
//   );
// }

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   function resetGame() {
//     setHistory([Array(9).fill(null)]);
//     setCurrentMove(0);
//   }

//   const moves = history.map((squares, move) => {
//     let description = (move !== 0) ? 'Go to move No: ' + move : 'Begin the game !';

//     // let description;
//     // if (move > 0) {
//     //   description = 'Go to move #' + move;
//     // } else {
//     //   description = 'Go to game start';
//     // }

//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   })

//   return (
//     <div className='game'>
//       <div className='game-board'>
//         <Board 
//           xIsNext={xIsNext} 
//           squares={currentSquares} 
//           onPlay={handlePlay}
//           onReset={resetGame} 
//         />
//       </div>
//       <div className='game-info'>
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
//   }
//   if (!squares.includes(null)) return 'draw';
//   return null; 
// }