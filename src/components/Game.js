import { Button, Paper, Stack, Typography } from "@mui/material";
import "chessboard-element";
import React, { useEffect, useState } from "react";
import "../App.css";
import WithMoveValidation from "../integrations/WithMoveValidation.js";

function Game({ handleBetAmount, getBetAmount, parentFenString }) {
	const [betAmount, setBetAmount] = useState(0);
	const [gameWinner, setGameWinner] = useState("");
	const [gameFinished, setGameFinished] = useState(false);
	const [fenString, setFenString] = useState(parentFenString);

	// setFenString(FEN_STRING);

	console.log("Rendering Game");
	console.log("Fen in game " + parentFenString);

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

	useEffect(() => {
		setFenString(parentFenString);
		console.log("GAme" + fenString);
	}, [parentFenString]);

	return (
		<div className="Game">
			{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
			<hr></hr>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>स्मार्ट शतरंज</h1>
			</div>
			<div style={boardsContainer}>
				<WithMoveValidation
					winnerCallback={winnerCallback}
					parentFenString={!parentFenString ? "start" : parentFenString}
					// parentFenString="start"
				/>
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
