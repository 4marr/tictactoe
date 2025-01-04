/* eslint-disable react/prop-types */
import { useState } from 'react'

function Square({ value, onSquareClick, highlight }) {
    return (
        <button className={`square w-24 h-24 text-2xl font-semibold bg-gray-100 rounded-lg m-2 ${highlight ? 'border-2 border-indigo-700' : ''}`} onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || CalculateWinner(squares)) return;
        const newSquares = squares.slice();

        newSquares[i] = xIsNext ? 'X' : 'O';

        onPlay(newSquares);
    }

    const winner = CalculateWinner(squares);
    const winningSquares = winner ? CalculateWinningSquares(squares) : [];
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <div className="status text-lg font-semibold m-2">{status}</div>
            <div className="board-row flex">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={winningSquares.includes(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={winningSquares.includes(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={winningSquares.includes(2)} />
            </div>
            <div className="board-row flex">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={winningSquares.includes(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={winningSquares.includes(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={winningSquares.includes(5)} />
            </div>
            <div className="board-row flex">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={winningSquares.includes(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={winningSquares.includes(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={winningSquares.includes(8)} />
            </div>
        </>
    )
}

function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove].squares;

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    function handlePlay(newSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: newSquares }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button className="bg-gray-100 rounded py-2 w-full px-3" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game py-16 w-full min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl text-gray-700 text-center font-bold mb-10">Tic-Tac-Toe</h1>
            <div className="md:flex">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info flex flex-col justify-center items-center w-full mt-6 md:mt-0">
                    <p className="mb-4 text-lg">Game Info</p>
                    <ol className="grid grid-cols-2 gap-2">
                        {moves}
                    </ol>
                </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Copyright © 2024 Ammar. All Right Reserved</p>
        </div>
    )
}

function CalculateWinner(squares) {
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
            return squares[a];
        }
    }
    return null;
}
function CalculateWinningSquares(squares) {
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
            return [a, b, c]; // Return the indices of the winning squares
        }
    }
    return [];
}

export default Game
