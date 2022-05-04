import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import "chessboard-element";
import React, { useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Game from "./components/Game";
import { GlobalStyles } from "./components/globalStyles";
import PlayerOne from "./components/PlayerOne";
import PlayerTwo from "./components/PlayerTwo";
import { darkTheme, lightTheme } from "./components/Themes";
import { init, deposit, getBetAmount, setBetAmount } from "./Web3Client";

function App() {
	const [themeString, setThemeString] = React.useState("light");
	const [FEN_STRING, setFenString] = React.useState("start");
	console.log("App" + FEN_STRING);
	let theme = createTheme({ palette: { mode: themeString } });

	// const changeString = useCallback(() => {
	// 	setFenString((string) => (FEN_STRING = string));
	// }, []);

	function toggleColorMode() {
		themeString === "light" ? setThemeString("dark") : setThemeString("light");
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<ThemeProvider theme={themeString === "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<div className="container">
						<PlayerOne setBetAmount={setBetAmount} />
						<Game
							handleBetAmount={deposit}
							getBetAmount={getBetAmount}
							parentFenString={FEN_STRING}
						/>
						<PlayerTwo
							setBetAmount={setBetAmount}
							setFenString={setFenString}
						/>
					</div>
					<div style={{ display: "flex", marginLeft: "17%" }}>
						<IconButton
							sx={{ ml: 1 }}
							onClick={toggleColorMode}
							color="inherit"
						>
							{themeString === "dark" ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</div>
				</div>
			</MuiThemeProvider>
		</ThemeProvider>
	);
}

export default App;

{
	/* <BrowserRouter>
	<Routes>
		<Route
			path="/"
			exact
			element={<PlayerOne setBetAmount={setBetAmount} />}
		/>
		<Route
			path="/p2"
			element={<PlayerTwo setBetAmount={setBetAmount} />}
		/>
		<Route
			path="/game"
			element={
				<Game handleBetAmount={deposit} getBetAmount={getBetAmount} />
			}
		/>
	</Routes>
</BrowserRouter> */
}
