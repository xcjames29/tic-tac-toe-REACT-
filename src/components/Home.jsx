import Square from "./Square";
import "./board.css";
import { useState } from "react";

let move = true;
let hasWinner = false;
let p1 =true;
export default function Board(props) {

    let [cells, setCells] = useState(new Array(9).fill(""));
    let [status, setStatus] = useState("Player X Turn!");
    let temp = cells.slice();
    let [xScore,setXScore] = useState(0);
    let [oScore, setOScore] = useState(0);
    let setNewValue = (index) => {
        if (!hasWinner) {
            console.log(index);
            console.log("clicked" + cells[index]);
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
            }
            let win = validate(temp);
            console.log(temp);
            if (validate(temp)) {
                setStatus(win);
                hasWinner = true;
                setShow("");
            }
            else {
                if (move) {
                    setStatus("Player X Turn");
                }
                else {
                    setStatus("Player O Turn!");
                }
            }
        }
    }

    let validate = (arr) => {
        let winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (let x = 0; x < winCondition.length; x++) {
            let set = winCondition[x];
            if (set.every(e => arr[e] === "X")) {
                setXScore(xScore+1);
                return "Player X Win!"
            }
            else if (set.every(e => arr[e] === "O")) {
                setOScore(oScore+1);
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
        if(p1){
            setStatus("Player O Turn!");
            move = false;
            p1=false;
        }
        else{
            setStatus("Player X Turn!");
            move = true;
            p1=true;
        }
        
        hasWinner = false;
        setShow("hidden");
    }


    return (
        <div className="container">
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
            <h2>Player X: {xScore}</h2>
            <h2>Player O: {oScore}</h2>
            <button onClick={resetGame} className={"reset "+show}>Play again?</button>
        </div>

    )
}
