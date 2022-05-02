import Web3 from "web3";
import GameContract from "./truffle/build/GameContract.json";
let selectedAccount;
let gameContract;
let stakeAmount = 0;

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
	gameContract = new web3.eth.Contract(GameContract.abi, "0xe7177af345bad36236a3625b6711c0afe1c4219e", { from: window.ethereum.selectedAccount });
};

export const start = async () => {
	// return gameContract.methods.startGame(gameCode, selectedAccount, stake);
};

export const setBetAmount = async (depositAmount) => {
	stakeAmount += parseInt(depositAmount);
};

export const getBetAmount = async () => {
	return stakeAmount;
};

export const deposit = async () => {
	console.log("Deposit Amount: " + stakeAmount);
	let deposited = await gameContract.methods.deposit().send({
		value: Web3.utils.toWei(stakeAmount, "ether"),
		gas: "2361366",
		gasPrice: "0xaf16b1bb3",
		nonce: "0x0",
		from: selectedAccount,
		// to: "0xe7177af345bad36236a3625b6711c0afe1c4219e",
	});
	console.log("Deposited: " + deposited);
};

export default Web3;
