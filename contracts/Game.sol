pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract GameContract {
    using SafeMath for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _gameIds;

    event get_game_outcome(game_outcome);

    enum game_status {
        started,
        ongoing,
        ended
    }

    enum game_outcome {
        draw,
        player_one,
        player_two
    }

    //   Player 1 who creates game and player 2 is opponent
    struct Game {
        address player_one;
        address player_two;
        uint256 stake;
        string game_code;
        // string beforeMatchDataURI;
        // string afterMatchDataURI;
        game_status status;
        game_outcome outcome;
    }

    mapping(address => uint256) public balances_of_players;
    mapping(string => Game) public games;
    mapping(game_outcome => string) public outcomes;

    constructor() {
        outcomes[game_outcome.draw] = "draw";
        outcomes[game_outcome.player_one] = "player_one";
        outcomes[game_outcome.player_two] = "player_two";
    }

    function compare_strings(string memory a, string memory b)
        public
        view
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // Player 1 creates a game
    function start_game(
        string memory game_code,
        // string memory beforeMatchDataURI,
        address opponent,
        uint256 stake
    ) external {
        require(
            opponent != address(0x0) && opponent != msg.sender,
            "Enter a valid opponent address"
        );
        require(
            stake <= balances_of_players[msg.sender],
            "Players funds are insufficient"
        );

        balances_of_players[msg.sender] = balances_of_players[msg.sender].sub(
            stake
        );

        games[game_code].game_code = game_code;
        games[game_code].player_one = msg.sender;
        games[game_code].player_two = opponent;
        games[game_code].stake = stake;
        games[game_code].status = game_status.started;
    }

    //  Player 2 joins the game
    function participate_in_game(string memory game_code) external {
        require(
            games[game_code].player_two == msg.sender,
            "You are not Player 2 for this game"
        );
        require(
            games[game_code].status == game_status.started,
            "Game not started or has already been participated in"
        );

        uint256 gameStake = games[game_code].stake;
        require(
            gameStake <= balances_of_players[msg.sender],
            "Player funds are insufficient"
        );

        balances_of_players[msg.sender] = balances_of_players[msg.sender].sub(
            gameStake
        );
        games[game_code].status = game_status.ongoing;
    }

    //   finish the game
    function end_game(
        string memory game_code,
        // string memory afterMatchDataURI,
        string memory result
    ) external {
        require(
            games[game_code].status == game_status.ongoing,
            "Match did not started or invalid code"
        );
        require(
            compare_strings(result, outcomes[game_outcome.player_two]) ||
                compare_strings(result, outcomes[game_outcome.draw]) ||
                compare_strings(result, outcomes[game_outcome.player_one]),
            "Invalid Result"
        );

        games[game_code].status = game_status.ended;

        address player_one = games[game_code].player_one;
        address player_two = games[game_code].player_two;

        uint256 gameStake = games[game_code].stake;

        if (compare_strings(result, outcomes[game_outcome.draw])) {
            games[game_code].outcome = game_outcome.draw;
            balances_of_players[player_one] = balances_of_players[player_one]
                .add(gameStake);
            balances_of_players[player_two] = balances_of_players[player_two]
                .add(gameStake);
        } else if (compare_strings(result, outcomes[game_outcome.player_one])) {
            games[game_code].outcome = game_outcome.player_one;
            uint256 totalStakeWon = gameStake.mul(2);
            balances_of_players[player_one] = balances_of_players[player_one]
                .add(totalStakeWon);
        } else if (compare_strings(result, outcomes[game_outcome.player_two])) {
            games[game_code].outcome = game_outcome.player_two;
            uint256 totalStakeWon = gameStake.mul(2);
            balances_of_players[player_two] = balances_of_players[player_two]
                .add(totalStakeWon);
        }
    }

    // function deposit() external payable {
    //     require(
    //         msg.value > 0,
    //         "Please Deposit a valid amount greater than zero"
    //     );
    //     balances_of_players[msg.sender] = balances_of_players[msg.sender].add(msg.value);
    // }

    function deposit(uint256 deposit_amount) external payable {
        require(
            deposit_amount > 0,
            "Please Deposit a valid amount greater than zero"
        );
        balances_of_players[msg.sender] = balances_of_players[msg.sender].add(
            deposit_amount
        );
    }

    function get_player_balances(address player_address)
        external
        view
        returns (uint256 player_balance)
    {
        return balances_of_players[player_address];
    }
}
