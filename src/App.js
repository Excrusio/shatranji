import React, { useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import "chessboard-element";
// import React from "react";
// import { use effect } from "react";
import { init, deposit, setBetAmount, getBetAmount } from "./Web3Client";
import PlayerOne from "./components/PlayerOne";
import Game from "./components/Game";
import PlayerTwo from "./components/PlayerTwo";
// import
// import { getOwnBalance } from "./Web3Client";

function App() {
	// const [minted, setMinted] = useState(false);
	// const providerUrl = process.PROVIDER_URL || "http://localhost:7545";
	// const [balance, setBalance] = useState(0);
	useEffect(() => {
		init();
	}, []);

	return (
		<div className="App">
			<PlayerOne setBetAmount={setBetAmount} />
			<PlayerTwo setBetAmount={setBetAmount} />
			<Game handleBetAmount={deposit} getBetAmount={getBetAmount} />
		</div>
	);
}

export default App;
