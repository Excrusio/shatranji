const path = require("path");
const fs = require("fs");
const solc = require("solc");

const GamePath = path.resolve(__dirname, "truffle/contracts", "Game.sol");
const source = fs.readFileSync(GamePath, "utf8");

let input = {
	language: "Solidity",
	sources: {
		[GamePath]: {
			content: source,
		},
	},

	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
	abi: output.contracts[[GamePath]]["Game"].abi,
	bytecode: output.contracts[[GamePath]]["Game"].evm.bytecode.object,
};
