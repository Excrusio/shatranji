import "../App.css";
import "chessboard-element";
import React, { useState } from "react";
import Metamask from "../integrations/Metamask";
import CustomCard from "./card/CustomCard";
import { Button, Paper, setRef, Stack, TextField, Typography } from "@mui/material";
import { deposit } from "../Web3Client";
import { constants } from "buffer";

function PlayerTwo({ setBetAmount, setFenString }) {
	const [depositAmount, setDepositAmount] = useState(0);
	const [gameCode, setGameCode] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [disableJoin, setDisableJoin] = useState(false);
	const [showCode, setShowCode] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(gameCode, depositAmount);
		if (depositAmount !== 0) {
			await setBetAmount(depositAmount);
			setDisabled(true);
		}
	};

	const verifyGameCode = () => {
		let isValid =
			typeof gameCode === "string" &&
			gameCode.length === 6 &&
			!isNaN(Number("0x" + gameCode));
		console.log(isValid);

		if (!isValid) {
			window.alert("Game code is invalid, please enter again.");
			return;
		}
		// setFenString("rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3");
		setDisableJoin(true);
		setShowCode(true);
		// setFenString("start");
		// console.log(setFenString);
	};

	return (
		<div className="player-screen">
			<Metamask player="Player 2" />
			<Paper elevation={12}>
				<Stack>
					<TextField
						variant="outlined"
						type="number"
						onChange={(e) => setDepositAmount(e.target.value)}
						helperText="in Milliether"
						label="Enter the amount to deposit"
					></TextField>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={disabled}
					>
						Deposit
					</Button>
				</Stack>
			</Paper>
			<Paper elevation={12}>
				<Stack>
					<TextField
						variant="outlined"
						type="text"
						onChange={(e) => setGameCode(e.target.value)}
						helperText="6 Digit Hex Code"
						label="Enter a game code to join"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={verifyGameCode}
						disabled={disableJoin}
					>
						Join
					</Button>
				</Stack>
			</Paper>
			{showCode ? <Typography>Game Joined: {gameCode}</Typography> : ""}
		</div>
	);
}

// export default withMyHook(PlayerTwo);
export default PlayerTwo;
