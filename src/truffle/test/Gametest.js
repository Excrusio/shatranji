const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, bytecode } = require("../compile");

let Game;
let accounts;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	Game = await new web3.eth.Contract(abi).deploy({ data: bytecode }).send({ from: accounts[0], gas: "1000000" });
});

describe("Game Contract", () => {
	it("deploys a contract", () => {
		assert.ok(Game.options.address);
	});

	it("allows one account to enter", async () => {
		await Game.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether"),
		});

		const players = await Game.methods.getPlayers().call({
			from: accounts[0],
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(1, players.length);
	});

	it("allows multiple accounts to enter", async () => {
		await Game.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether"),
		});
		await Game.methods.enter().send({
			from: accounts[1],
			value: web3.utils.toWei("0.02", "ether"),
		});
		await Game.methods.enter().send({
			from: accounts[2],
			value: web3.utils.toWei("0.02", "ether"),
		});

		const players = await Game.methods.getPlayers().call({
			from: accounts[0],
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(accounts[1], players[1]);
		assert.equal(accounts[2], players[2]);
		assert.equal(3, players.length);
	});

	it("requires a minimum amount of ether to enter", async () => {
		try {
			await Game.methods.enter().send({
				from: accounts[0],
				value: 0,
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("only manager can call pickWinner", async () => {
		try {
			await Game.methods.pickWinner().send({
				from: accounts[1],
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("sends money to the winner and resets the players array", async () => {
		await Game.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("2", "ether"),
		});

		const initialBalance = await web3.eth.getBalance(accounts[0]);
		await Game.methods.pickWinner().send({ from: accounts[0] });
		const finalBalance = await web3.eth.getBalance(accounts[0]);
		const difference = finalBalance - initialBalance;

		assert(difference > web3.utils.toWei("1.8", "ether"));
	});
});
