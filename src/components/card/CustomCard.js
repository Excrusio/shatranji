import React, { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

// USELESS COMPONENT FOR NOW

const CustomCard = (props) => {
	const [amount, setAmount] = useState(0);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(amount);
	};

	return (
		<div>
			<Paper elevation={3} sx={{ p: 3, width: "500px" }}>
				<Stack spacing={2}>
					<Typography variant="h5"> {props.text} </Typography>
					{props.type === "text" ? (
						<div style={{ display: "flex", flexDirection: "column" }}>
							<TextField
								variant="outlined"
								type={props.inputType}
								onChange={(e) => setAmount(e.target.value)}
								helperText={props.helperText}
								label={props.label}
							></TextField>
							<Button variant="contained" color="primary" onClick={handleSubmit}>
								{props.buttonText}
							</Button>
						</div>
					) : (
						<Button variant="contained" color="primary">
							{props.buttonText}
						</Button>
					)}
					<Typography variant="h6"></Typography>
				</Stack>
			</Paper>
		</div>
	);
};

export default CustomCard;
