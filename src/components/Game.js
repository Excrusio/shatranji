import "../App.css";
import "chessboard-element";
import React from "react";
import Metamask from "../integrations/Metamask";
import WithMoveValidation from "../integrations/WithMoveValidation.js";

// class Game extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			name: "React",
// 		};
// 	}

function Game() {
	// render() {
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

			{/* <div style={{ display: "flex", justifyContent: "center" }}>
					<Metamask />
				</div> */}
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
