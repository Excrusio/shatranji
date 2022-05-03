import { Button, Paper, Stack, Typography } from "@mui/material";
import "chessboard-element";
import React, { useState } from "react";
import "../App.css";
import WithMoveValidation from "../integrations/WithMoveValidation.js";

// Array.prototype.shuffle = function() {
// 	for (let i = this.length - 1; i > 0; i--) {
// 		let j = Math.floor(Math.random() * (i + 1));
// 		[this[i], this[j]] = [this[j], this[i]];
// 	}
// };

// function generateRandomFenString() {
// 	let board = [];
// 	for (let x = 0; x < 8; x++) board.push(". . . . . . . .".split(" "));

// 	function getRandPos() {
// 		return [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
// 	}

// 	function isOccupied(pos) {
// 		return board[pos[0]][pos[1]] != ".";
// 	}

// 	function isAdjacent(pos1, pos2) {
// 		if (pos1[0] == pos2[0] || pos1[0] == pos2[0] - 1 || pos1[0] == pos2[0] + 1)
// 			if (pos1[1] == pos2[1] || pos1[1] == pos2[1] - 1 || pos1[1] == pos2[1] + 1)
// 				return true;
// 		return false;
// 	}

// 	// place kings
// 	let wk, bk;
// 	do {
// 		wk = getRandPos();
// 		bk = getRandPos();
// 	} while (isAdjacent(wk, bk));
// 	board[wk[0]][wk[1]] = "K";
// 	board[bk[0]][bk[1]] = "k";

// 	// get peaces
// 	let peaces = [];
// 	let names = "PRNBQ";
// 	function pick() {
// 		for (let x = 1; x < Math.floor(Math.random() * 32); x++)
// 			peaces.push(names[Math.floor(Math.random() * names.length)]);
// 	}
// 	pick();
// 	names = names.toLowerCase();
// 	pick();
// 	peaces.shuffle();

// 	// place peaces
// 	while (peaces.length > 0) {
// 		let p = peaces.shift(),
// 			pos;
// 		// paws: cannot be placed in bottom or top row
// 		if (p == "p" || p == "P")
// 			do {
// 				pos = getRandPos();
// 			} while (isOccupied(pos) || pos[0] == 0 || pos[0] == 7);
// 		// everything else
// 		else
// 			do {
// 				pos = getRandPos();
// 			} while (isOccupied(pos));
// 		board[pos[0]][pos[1]] = p;
// 	}

// 	// write FEN
// 	let fen = [];
// 	for (let x = 0; x < board.length; x++) {
// 		let str = "",
// 			buf = 0;
// 		for (let y = 0; y < board[x].length; y++)
// 			if (board[x][y] == ".") buf++;
// 			else {
// 				if (buf > 0) {
// 					str += buf;
// 					buf = 0;
// 				}
// 				str += board[x][y];
// 			}
// 		if (buf > 0) str += buf;
// 		fen.push(str);
// 	}
// 	fen = fen.join("/") + " w - - 0 1";
// 	// console.table(board); // for demonstrating purpose
// 	return fen;
// }

// // example
// console.log(generateRandomFenString());

// var chb = new Array(8);
// for (i = 0; i < 8; i++) {
// 	chb[i] = new Array(8);
// }

// function clearChb() {
// 	for (y = 0; y < 8; y++) {
// 		for (x = 0; x < 8; x++) {
// 			chb[x][y] = "";
// 		}
// 	}
// }

// function getEmptyField() {
// 	do {
// 		x = parseInt(8 * Math.random());
// 		y = parseInt(8 * Math.random());
// 	} while (chb[x][y] != "");
// 	f = new Array(x, y);
// 	return f;
// }

// function makefen() {
// 	//strFig='rnbqbnrppppppppPPPPPPPPRNBQBNR';// figure pool
// 	let strFig = "";

// 	let n = 1;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "Q";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "R";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "B";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "N";
// 	}
// 	n = 8;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "P";
// 	}
// 	n = 1;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "q";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "r";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "b";
// 	}
// 	n = 2;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "n";
// 	}
// 	n = 8;
// 	for (i = 1; i <= n; i++) {
// 		strFig += "p";
// 	}

// 	//alert(strFig);
// 	pl = strFig.length;

// 	clearChb();

// 	wbf = "";
// 	bbf = "";

// 	nfig = 32;
// 	if (nfig > pl + 2) {
// 		nfig = pl + 2;
// 	}

// 	//1. set black King
// 	f = getEmptyField();
// 	chb[f[0]][f[1]] = "k";

// 	//2. set white King
// 	do {
// 		f = getEmptyField();
// 	} while (!allowedPos(f[0], f[1], "K"));
// 	chb[f[0]][f[1]] = "K";
// 	// showField();

// 	//3. other figures
// 	for (n = 2; n < nfig; n++) {
// 		//get random figure from pool
// 		do {
// 			pos = parseInt(pl * Math.random());
// 		} while (strFig.substr(pos, 1) == "_");
// 		cfig = strFig.substr(pos, 1);
// 		strFig = strFig.substr(0, pos) + "_" + strFig.substr(pos + 1, pl - 1 - pos);

// 		// set figure
// 		do {
// 			f = getEmptyField(); /*alert((n+1)+": Try to set "+cfig+" on "+f);*/
// 		} while (!allowedPos(f[0], f[1], cfig));
// 		chb[f[0]][f[1]] = cfig;
// 		// showField();
// 	}

// 	//make fen
// 	cFen = "";
// 	z = 0;

// 	for (y = 0; y < 8; y++) {
// 		for (x = 0; x < 8; x++) {
// 			if (x == 0) {
// 				if (z > 0) {
// 					cFen += z;
// 				}
// 				if (x > 0 || y > 0) {
// 					cFen += "/";
// 				}
// 				z = 0;
// 			}
// 			if (chb[x][y] == "") {
// 				z++;
// 			} else {
// 				if (z > 0) {
// 					cFen += z;
// 				}
// 				cFen += chb[x][y];
// 				z = 0;
// 			}
// 		}
// 	}
// 	if (z > 0) {
// 		cFen += z;
// 	}
// 	cFen += " w - - 0 1";

// 	document.getElementById("fen").value = cFen;
// }

function Game({ handleBetAmount, getBetAmount }) {
	const [betAmount, setBetAmount] = useState(0);
	const [gameWinner, setGameWinner] = useState("");
	const [gameFinished, setGameFinished] = useState(false);

	// setFenString(FEN_STRING);

	const checkBetAmount = async (e) => {
		e.preventDefault();
		let amount = await getBetAmount();
		await setBetAmount(amount);
		console.log("Bet Amount:" + amount);
	};

	const winnerCallback = (winner, finished) => {
		console.log("From parent component " + winner);
		setGameWinner(winner);
		setGameFinished(finished);
		sendMoneyToWinner();
	};

	// Send money to the winner
	const sendMoneyToWinner = async () => {
		if (gameWinner === "White") await handleBetAmount();
		else await handleBetAmount();
	};

	return (
		<div className="Game">
			{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
			<hr></hr>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>स्मार्ट शतरंज</h1>
			</div>
			<div style={boardsContainer}>
				<WithMoveValidation winnerCallback={winnerCallback} />
			</div>
			<div className="player-screen">
				<Paper elevation={3}>
					<Stack spacing={2}>
						<Typography variant="h5"> Total Amount Deposited: </Typography>
						<Button variant="contained" onClick={checkBetAmount}>
							Check Bet Amount
						</Button>
						<Typography variant="h5">
							{betAmount === 0 ? 0 : betAmount + " milliether"}
						</Typography>
					</Stack>
				</Paper>
			</div>
		</div>
	);
	// }
}
// export default withMyHook(Game);
export default Game;

const boardsContainer = {
	display: "flex",
	justifyContent: "space-around",
	alignItems: "center",
	flexWrap: "wrap",
	marginTop: 30,
	marginBottom: 50,
};
