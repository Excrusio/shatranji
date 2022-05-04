import "../App.css";
import "chessboard-element";
import React, { useState } from "react";
import Metamask from "../integrations/Metamask";
import CustomCard from "./card/CustomCard";
import { Button, Paper, setRef, Stack, TextField, Typography } from "@mui/material";
import { deposit } from "../Web3Client";

function PlayerTwo({ setBetAmount }) {
	const [depositAmount, setDepositAmount] = useState(0);
	const [gameCode, setGameCode] = useState("");
	const [disabled, setDisabled] = useState(false);

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
					<Button variant="contained" color="primary" onClick={verifyGameCode}>
						Join
					</Button>
				</Stack>
			</Paper>
			<Button variant="contained" color="primary">
				Play
			</Button>
		</div>
	);
}

// export default withMyHook(PlayerTwo);
export default PlayerTwo;
