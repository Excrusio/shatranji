import React, { useEffect } from "react";
import "./App.css";
import "chessboard-element";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { init, deposit, setBetAmount, getBetAmount } from "./Web3Client";
import PlayerOne from "./components/PlayerOne";
import PlayerTwo from "./components/PlayerTwo";
import Game from "./components/Game";

function App() {
	useEffect(() => {
		init();
	}, []);

	return (
		<div className="App">
			{/* <BrowserRouter>
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
			</BrowserRouter> */}
			<div className="container">
				<PlayerOne setBetAmount={setBetAmount} />
				<Game handleBetAmount={deposit} getBetAmount={getBetAmount} />
				<PlayerTwo setBetAmount={setBetAmount} />
			</div>
		</div>
	);
}

export default App;
