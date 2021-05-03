import Square from "./Square";
import "./board.css";
import { useState } from "react";
import History from "./HistoryBtn";


let move = true;
let hasWinner = false;
let p1 = true;
export default function Board(props) {

    let [cells, setCells] = useState(new Array(9).fill(""));
    let [status, setStatus] = useState("Player X Turn!");
    let temp = cells.slice();
    let [xScore, setXScore] = useState(0);
    let [oScore, setOScore] = useState(0);
    let [moveNum, setMoveNum] = useState(0);
    let [history, setHistory] = useState([{
        move: move,
        hasWinner: hasWinner,
        cells: cells,
        status: status,
        xScore: xScore,
        oScore: oScore,
        player: p1,
        moveNumber: 0
    }])

    let [isHistoryTrigger, setIsHistoryTrigger] = useState(false);
    let setNewValue = (index) => {
        if (!hasWinner) {
            if (cells[index] === "") {
                let player = "O"
                if (move) {
                    player = "X";
                    move = false;
                }
                else {
                    move = true;
                }
                temp[index] = player;
                setCells(temp);
                let win = validate(temp);
                let statusTemp = "";
                if (validate(temp)) {
                    statusTemp = win;
                    setStatus(statusTemp);
                    hasWinner = true;
                    setShow("");
                }
                else {
                    if (move) {
                        statusTemp = "Player X Turn";
                        setStatus(statusTemp);
                    }
                    else {
                        statusTemp = "Player O Turn!";
                        setStatus(statusTemp);
                    }
                }
                if (!isHistoryTrigger) {
                    let newHistory = {
                        move: move,
                        hasWinner: hasWinner,
                        cells: temp,
                        status: statusTemp,
                        xScore: xScore,
                        oScore: oScore,
                        player: p1,
                        moveNumber: history[history.length - 1].moveNumber + 1
                    }
                    let historyTemp = JSON.parse(JSON.stringify(history));
                    historyTemp.push(newHistory);
                    setHistory(historyTemp);
                    console.log(historyTemp);
                    console.log("wewewew");
                }
                else {
                    setIsHistoryTrigger(false);
                    let newHistory = {
                        move: move,
                        hasWinner: hasWinner,
                        cells: temp,
                        status: statusTemp,
                        xScore: xScore,
                        oScore: oScore,
                        player: p1,
                        moveNumber: history[moveNum].moveNumber + 1
                    }
                    let historyTemp = history.reduce((acc, val, index) => {
                        if (index <= moveNum) {
                            acc.push(val);
                        }
                        return acc;
                    }, [])
                    historyTemp.push(newHistory);
                    setHistory(historyTemp);
                }
            }
        }
    }

    let validate = (arr) => {
        let winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let x = 0; x < winCondition.length; x++) {
            let set = winCondition[x];
            if (set.every(e => arr[e] === "X")) {
                setXScore(xScore + 1);
                return "Player X Win!"
            }
            else if (set.every(e => arr[e] === "O")) {
                setOScore(oScore + 1);
                return "Player O Win!"
            }
        }
        if (arr.every(e => e !== "")) {
            return "Game Is Draw!"
        }
        return false;
    }
    let [show, setShow] = useState("hidden");

    let resetGame = () => {
        setCells(new Array(9).fill(""));
        if (p1) {
            setStatus("Player O Turn!");
            move = false;
            p1 = false;
        }
        else {
            setStatus("Player X Turn!");
            move = true;
            p1 = true;
        }

        hasWinner = false;
        setShow("hidden");
        setHistory([history[0]]);
        setIsHistoryTrigger(false);
        setMoveNum(0);
    }


    let showHistory = (gameData) => {
        console.log(gameData);
        setCells(gameData.cells);
        setStatus(gameData.status);
        setMoveNum(gameData.moveNumber);
        setIsHistoryTrigger(true);
        move = gameData.move;
        hasWinner = gameData.hasWinner;
        p1 = gameData.p1;
    }
    return (
        <div className="container">
            <div className="board-container">
                <h1>{status}</h1>
                <div className="gameBoard">
                    <div>
                        <Square value={cells[0]} index={0} pindot={setNewValue} />
                        <Square value={cells[1]} index={1} pindot={setNewValue} />
                        <Square value={cells[2]} index={2} pindot={setNewValue} />
                    </div>

                    <div>
                        <Square value={cells[3]} index={3} pindot={setNewValue} />
                        <Square value={cells[4]} index={4} pindot={setNewValue} />
                        <Square value={cells[5]} index={5} pindot={setNewValue} />
                    </div>
                    <div>
                        <Square value={cells[6]} index={6} pindot={setNewValue} />
                        <Square value={cells[7]} index={7} pindot={setNewValue} />
                        <Square value={cells[8]} index={8} pindot={setNewValue} />
                    </div>

                </div>
                <h1>Scoreboard:</h1>
                <h2>Player X: {xScore} | Player O: {oScore}</h2>
                <button onClick={resetGame} className={"reset " + show}>Play again?</button>
            </div>

            <div className="history">
                <h1>History</h1>
                <History num="0" messege="Before move" history={history[0]} goHistory={showHistory} />
                <History num="1" messege="1st move" history={history[1]} goHistory={showHistory} />
                <History num="2" messege="2nd move" history={history[2]} goHistory={showHistory} />
                <History num="3" messege="3rd move" history={history[3]} goHistory={showHistory} />
                <History num="4" messege="4th move" history={history[4]} goHistory={showHistory} />
                <History num="5" messege="5th move" history={history[5]} goHistory={showHistory} />
                <History num="6" messege="6th move" history={history[6]} goHistory={showHistory} />
                <History num="7" messege="7th move" history={history[7]} goHistory={showHistory} />
                <History num="8" messege="8th move" history={history[8]} goHistory={showHistory} />
                <History num="9" messege="9th move" history={history[9]} goHistory={showHistory} />
            </div>
        </div>

    )
}
