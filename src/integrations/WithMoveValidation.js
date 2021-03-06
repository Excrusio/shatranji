import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from "chessboardjsx";

// Draw string
// let INITIAL_FEN_STRING = "k7/1R1RN3/p3p3/P3P2p/1PP4P/3K1PP1/8/8 b - h3 0 1";

// White winner string
let INITIAL_FEN_STRING = "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";

// Start from a fen string
// let INITIAL_FEN_STRING = "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2";

// Default
// let INITIAL_FEN_STRING = "start";
let NEW_FEN_STRING = INITIAL_FEN_STRING;
let gameWinner = " ";
let winnerCallbackFunc;
class HumanVsHuman extends Component {
	static propTypes = { children: PropTypes.func };

	state = {
		fen: INITIAL_FEN_STRING,
		// fen: "start",
		// square styles for active drop square
		dropSquareStyle: {},
		// custom square styles
		squareStyles: {},
		// square with the currently clicked piece
		pieceSquare: "",
		// currently clicked square
		square: "",
		// array of past game moves
		history: [],
	};
	// componentDidUpdate() {
	// 	console.log(this.props.fenString);
	// 	if (
	// 		this.props.fenString !== "" &&
	// 		this.props.fenString !== FEN_STRING &&
	// 		this.props.fenString
	// 	) {
	// 		console.log("FEN_STRING: ", this.props.fenString);
	// 		this.setState({ ...this.state, fen: this.props.fenString });
	// 	}
	// }

	componentDidMount() {
		if (INITIAL_FEN_STRING === "start") this.game = new Chess();
		else this.game = new Chess(INITIAL_FEN_STRING);
	}

	// keep clicked square style and remove hint squares
	removeHighlightSquare = () => {
		this.setState(({ pieceSquare, history }) => ({
			squareStyles: squareStyling({ pieceSquare, history }),
		}));
	};

	checkGameEnd = () => {
		const ifCheckmate = this.game.in_checkmate();
		if (ifCheckmate) {
			let winner = this.game.turn();
			if (winner === "w") {
				winner = "White";
			} else {
				winner = "Black";
			}
			gameWinner = winner;
			winnerCallbackFunc(gameWinner, true);
			alert(`Game Over! Player ${winner} is the winner!`);
			// let prevState = {...this.state}
			this.setState({
				...this.state,
				fen: "start",
			});
			this.game = new Chess();
		}

		const ifDraw = this.game.in_draw();
		if (ifDraw) {
			alert("Game Over! The game is a draw.");
		}
	};

	// show possible moves
	highlightSquare = (sourceSquare, squaresToHighlight) => {
		const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce((a, c) => {
			return {
				...a,
				...{
					[c]: {
						background:
							"radial-gradient(circle, #fffc00 36%, transparent 40%)",
						borderRadius: "50%",
					},
				},
				...squareStyling({
					history: this.state.history,
					pieceSquare: this.state.pieceSquare,
				}),
			};
		}, {});

		this.setState(({ squareStyles }) => ({
			squareStyles: { ...squareStyles, ...highlightStyles },
		}));
	};

	onDrop = ({ sourceSquare, targetSquare }) => {
		// see if the move is legal
		let move = this.game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: "q", // always promote to a queen for example simplicity
		});

		this.checkGameEnd();
		// illegal move
		if (move === null) return;

		let fenToChange;
		if (NEW_FEN_STRING !== INITIAL_FEN_STRING) {
			fenToChange = NEW_FEN_STRING;
		} else {
			fenToChange = this.game.fen();
		}
		this.setState(({ history, pieceSquare }) => ({
			fen: fenToChange,
			history: this.game.history({ verbose: true }),
			squareStyles: squareStyling({ pieceSquare, history }),
		}));
	};

	onMouseOverSquare = (square) => {
		// get list of possible moves for this square
		let moves = this.game.moves({
			square: square,
			verbose: true,
		});

		// exit if there are no moves available for this square
		if (moves.length === 0) return;

		let squaresToHighlight = [];
		for (var i = 0; i < moves.length; i++) {
			squaresToHighlight.push(moves[i].to);
		}

		this.highlightSquare(square, squaresToHighlight);
	};

	onMouseOutSquare = (square) => this.removeHighlightSquare(square);

	// central squares get diff dropSquareStyles
	onDragOverSquare = (square) => {
		this.setState({
			dropSquareStyle:
				square === "e4" || square === "d4" || square === "e5" || square === "d5"
					? { backgroundColor: "cornFlowerBlue" }
					: { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" },
		});
	};

	onSquareClick = (square) => {
		this.setState(({ history }) => ({
			squareStyles: squareStyling({ pieceSquare: square, history }),
			pieceSquare: square,
		}));

		let move = this.game.move({
			from: this.state.pieceSquare,
			to: square,
			promotion: "q", // always promote to a queen for example simplicity
		});

		this.checkGameEnd();
		// illegal move
		if (move === null) return;

		let fenToChange;
		if (NEW_FEN_STRING !== INITIAL_FEN_STRING) {
			fenToChange = NEW_FEN_STRING;
		} else {
			fenToChange = this.game.fen();
		}
		this.setState({
			fen: fenToChange,
			history: this.game.history({ verbose: true }),
			pieceSquare: "",
		});
	};

	onSquareRightClick = (square) =>
		this.setState({
			squareStyles: { [square]: { backgroundColor: "deepPink" } },
		});

	render() {
		const { fen, dropSquareStyle, squareStyles } = this.state;

		return this.props.children({
			position: fen,
			onDrop: this.onDrop,
			onMouseOverSquare: this.onMouseOverSquare,
			onMouseOutSquare: this.onMouseOutSquare,
			squareStyles,
			dropSquareStyle,
			onDragOverSquare: this.onDragOverSquare,
			onSquareClick: this.onSquareClick,
			onSquareRightClick: this.onSquareRightClick,
		});
	}
}

export default function WithMoveValidation({ winnerCallback, parentFenString }) {
	// console.log("CAllbackx" + winnerCallback);
	console.log("WithMoveV " + parentFenString);
	NEW_FEN_STRING = parentFenString;
	winnerCallbackFunc = winnerCallback;
	// FEN_STRING = parentFenString;
	return (
		<div>
			<HumanVsHuman>
				{({
					position,
					onDrop,
					onMouseOverSquare,
					onMouseOutSquare,
					squareStyles,
					dropSquareStyle,
					onDragOverSquare,
					onSquareClick,
					onSquareRightClick,
				}) => (
					<Chessboard
						id="humanVsHuman"
						width={520}
						position={position}
						onDrop={onDrop}
						onMouseOverSquare={onMouseOverSquare}
						onMouseOutSquare={onMouseOutSquare}
						boardStyle={{
							borderRadius: "5px",
							boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
						}}
						squareStyles={squareStyles}
						dropSquareStyle={dropSquareStyle}
						onDragOverSquare={onDragOverSquare}
						onSquareClick={onSquareClick}
						onSquareRightClick={onSquareRightClick}
					/>
				)}
			</HumanVsHuman>
		</div>
	);
}

const squareStyling = ({ pieceSquare, history }) => {
	const sourceSquare = history.length && history[history.length - 1].from;
	const targetSquare = history.length && history[history.length - 1].to;

	return {
		[pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
		...(history.length && {
			[sourceSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)",
			},
		}),
		...(history.length && {
			[targetSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)",
			},
		}),
	};
};
