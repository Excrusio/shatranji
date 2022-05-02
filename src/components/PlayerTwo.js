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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(gameCode, depositAmount);
		await setBetAmount(depositAmount);
	};

	return (
		<div className="PlayerTwo">
			{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
			<hr></hr>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>स्मार्ट शतरंज</h1>
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
				<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<Metamask player="Player 2" />
				</div>
				<br></br>
				<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<div>
						<Paper elevation={3} sx={{ p: 3, width: "500px" }}>
							<Stack spacing={2}>
								<Typography variant="h5"> Enter a Game Code to Join: </Typography>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<TextField
										variant="outlined"
										type="text"
										onChange={(e) => setGameCode(e.target.value)}
										helperText="Each game has a unique code"
										label="Game Code"
									></TextField>
									<Button variant="contained" color="primary" onClick={handleSubmit}>
										Submit
									</Button>
								</div>
								<Typography variant="h6"></Typography>
							</Stack>
						</Paper>
					</div>
				</div>
				<br></br>
				<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<div>
						<Paper elevation={3} sx={{ p: 3, width: "500px" }}>
							<Stack spacing={2}>
								<Typography variant="h5"> Enter the Amount to Deposit: </Typography>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<TextField
										variant="outlined"
										type="number"
										onChange={(e) => setDepositAmount(e.target.value)}
										helperText="Enter the Amount in Wei"
										label="Amount"
									></TextField>
									<Button variant="contained" color="primary" onClick={handleSubmit}>
										"Submit"
									</Button>
								</div>
								<Typography variant="h6"></Typography>
							</Stack>
						</Paper>
					</div>
				</div>
				<br></br>
				<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<CustomCard text="Play Game" type="button" buttonText="Play" />
				</div>
			</div>
		</div>
	);
}

// export default withMyHook(PlayerTwo);
export default PlayerTwo;
