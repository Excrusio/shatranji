import "../App.css";
import "chessboard-element";
import React, { useState } from "react";
import Metamask from "../integrations/Metamask";
import CustomCard from "./card/CustomCard";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

function PlayerOne({ handleDepositAmount }) {
	const [depositAmount, setDepositAmount] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(depositAmount);
		await handleDepositAmount(depositAmount);
	};

	return (
		<div className="PlayerOne">
			{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
			<hr></hr>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>स्मार्ट शतरंज</h1>
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
				<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<Metamask player="Player 1" />
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
										// onChange={(e) => setDepositAmount(e.target.value)}
										onChange={(e) => {
											setDepositAmount(e.target.value);
										}}
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
					<CustomCard text="Create Game" type="button" buttonText="Create" />
				</div>
			</div>
		</div>
	);
}
// }
// }
// export default withMyHook(PlayerOne);
export default PlayerOne;
