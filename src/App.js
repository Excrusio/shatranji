import "chessboard-element";
import React, { useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import PlayerOne from "./components/PlayerOne";
import PlayerTwo from "./components/PlayerTwo";
import { deposit, getBetAmount, init, setBetAmount } from "./Web3Client";

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
