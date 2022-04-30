import "./App.css";
import "chessboard-element";
import React, { useEffect, Component } from "react";
// import Chessboard from "chessboardjsx";
import Metamask from "./components/Metamask";
import WithMoveValidation from "./integrations/WithMoveValidation.js";
import useMetaMask from "./integrations/useMetaMask";

function withMyHook(Component) {
	return function WrappedComponent(props) {
		//   const myHookValue = useMyHook();
		const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask();
		return <Component {...props} connect={connect} disconnect={disconnect} isActive={isActive} account={account} shouldDisable={shouldDisable} />;
	};
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			name: "React",
		};
	}

	render() {
		return (
			<div className="App">
				{/* <h3> National Institute of Technology, Kurukshetra</h3> */}
				<hr></hr>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<h1>स्मार्ट शतरंज</h1>
				</div>
				<div style={boardsContainer}>
					<WithMoveValidation />
				</div>
				{/* <div style={{ display: "flex", justifyContent: "center" }}>
					<chess-board
						style={{ width: "600px" }}
						position="start"
						orientation={this.state.flipped ? "black" : "white"}
						draggable-pieces
						ref={(e) => (this.state.board = e)}
					></chess-board>
				</div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<button onClick={() => this.state.board.flip()}>Flip Board</button>
					<button onClick={() => this.state.board.game_over()}>End game</button>
					<button onClick={() => this.state.board.clear()}>Clear Board</button>
					<button onClick={() => this.state.board.setPosition("start")}>Start Position</button>
				</div> */}
				{/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<div className="break">
						<Button variant="primary" onClick={this.props.connect} disabled={this.props.shouldDisable}>
							<img src={metamaskIcon} alt="Metamask" width="25px" height="25px" />
							Connect to Metamask.
						</Button>
						<hr></hr>
					</div>
					<Card body>Connected Account: </Card>
				</div> */}
				<Metamask />
			</div>
		);
	}
}
export default withMyHook(App);

const boardsContainer = {
	display: "flex",
	justifyContent: "space-around",
	alignItems: "center",
	flexWrap: "wrap",
	width: "100vw",
	marginTop: 30,
	marginBottom: 50,
};
