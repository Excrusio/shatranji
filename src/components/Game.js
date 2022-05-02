import { Button, Paper, Stack, Typography } from "@mui/material";
import "chessboard-element";
import React, { useState } from "react";
import "../App.css";
import WithMoveValidation from "../integrations/WithMoveValidation.js";

function Game({ handleBetAmount, getBetAmount }) {
	const [betAmount, setBetAmount] = useState(0);

	const checkBetAmount = async (e) => {
		e.preventDefault();
		let amount = await getBetAmount();
		setBetAmount(amount);
		await console.log("WALLALA" + amount);
	};

	// Send money to the winner
	// await handleBetAmount();

	return (
		<div className="Game">
			{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
			<hr></hr>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>स्मार्ट शतरंज</h1>
			</div>
			<div style={boardsContainer}>
				<WithMoveValidation />
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Paper elevation={3} sx={{ p: 3, width: "500px" }}>
						<Stack spacing={2}>
							<Typography variant="h5"> Total Amount Deposited: </Typography>
							<Button variant="contained" onClick={checkBetAmount}>
								Check Bet Amount
							</Button>
							<Typography variant="h5">{betAmount}</Typography>
						</Stack>
					</Paper>
				</div>
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
	width: "100vw",
	marginTop: 30,
	marginBottom: 50,
};
