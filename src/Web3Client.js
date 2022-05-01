import Web3 from "web3";
import GameContract from "./truffle/build/GameContract.json";
let selectedAccount;
let gameContract;

export const init = async () => {
	let provider = window.ethereum;
	if (typeof provider !== "undefined") {
		provider
			.request({ method: "eth_requestAccounts" })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log("Selected Account is: ", selectedAccount);
			})
			.catch((err) => {
				console.log(err);
			});
		window.ethereum.on("accountsChanged", function(accounts) {
			console.log("Selected Account changed to: ", selectedAccount);
		});
	}

	const web3 = new Web3(provider);
	const networkId = await web3.eth.net.getId();
	console.log(GameContract);
	gameContract = new web3.eth.Contract(GameContract.abi, "0xd9145CCE52D386f254917e481eB44e9943F39138", { from: window.ethereum.selectedAccount });
};

export const start = async () => {
	// return gameContract.methods.startGame(gameCode, selectedAccount, stake);
};

export const deposit = async (depositAmount) => {
	console.log(depositAmount);
	let deposited = await gameContract.methods.deposit().send({ value: depositAmount });
	console.log(deposited);
};

export default Web3;
