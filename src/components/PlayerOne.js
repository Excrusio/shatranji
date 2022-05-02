import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import "chessboard-element";
import React, { useState } from "react";
import "../App.css";
import Metamask from "../integrations/Metamask";

function PlayerOne({ setBetAmount }) {
	const [depositAmount, setDepositAmount] = useState(0);
	const [gameCode, setGameCode] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(depositAmount);
		await setBetAmount(depositAmount);
	};

	const generateGameCode = () => {
		var letters = "0123456789ABCDEF";
		var code = "";
		for (var i = 0; i < 6; i++) {
			code += letters[Math.floor(Math.random() * 16)];
		}
		setGameCode(code);
		console.log(code);
	};

	return (
		<div className="player-screen">
			<Metamask player="Player 1" />
			<Paper elevation={3}>
				<Stack>
					<TextField
						variant="outlined"
						type="number"
						onChange={(e) => {
							setDepositAmount(e.target.value);
						}}
						label="Enter the amount to deposit"
						helperText="in Wei"
					/>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Deposit
					</Button>
				</Stack>
			</Paper>
			<Button variant="contained" color="primary" onClick={generateGameCode}>
				Create Game
			</Button>
		</div>
	);
}
// }
// }
// export default withMyHook(PlayerOne);
export default PlayerOne;
