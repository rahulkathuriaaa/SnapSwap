// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract SnapSwap {
    /**
     * @dev Represents a person (investor) with their token holdings.
     * @param id The address of the investor.
     * @param tokens An array of token identifiers the investor holds.
     * @param tokenAmt An array of amounts corresponding to each token.
     */
    struct Person {
        address id;
        string[] tokens;
        uint256[] tokenAmt;
    }

    /**
     * @dev Represents a token swap transaction in a portfolio.
     * @param fromTokens The token being swapped from.
     * @param toTokens The token being swapped to.
     * @param currPrice The current price of the token being swapped from.
     * @param convertedPrice The price of the token being swapped to.
     */
    struct TokenPortfolio {
        string fromTokens;
        string toTokens;
        uint256 currPrice;
        uint256 convertedPrice;
    }

    /**
     * @dev Mapping from investor addresses to their token portfolios.
     */

    /**
     * @dev Mapping from investor addresses to their individual token balances.
     */
    mapping(address => TokenPortfolio[]) public tokensPortfolio;

    /**
     * @dev Mapping from investor addresses to their investor information.
     */
    mapping(address => mapping(string => uint256)) public indTokenPortfolio;

    mapping(address => Person) public investors;

    /**
     * @dev Initializes an investor's profile with their tokens and amounts.
     * @param _id The address of the investor.
     * @param _tokens An array of tokens the investor holds.
     * @param _tokenAmt An array of amounts corresponding to each token.
     */
    function initializeInvestors(
        address _id,
        string[] memory _tokens,
        uint256[] memory _tokenAmt
    ) public {
        require(msg.sender == _id, "You cannot initialize");
        Person memory newToken = Person(_id, _tokens, _tokenAmt);

        investors[_id] = newToken;

        for (uint256 i = 0; i < _tokens.length; i++) {
            indTokenPortfolio[_id][_tokens[i]] = _tokenAmt[i];
        }
    }

    /**
     * @dev Allows an investor to swap tokens in their portfolio.
     * @param _id The address of the investor.
     * @param _fromTokenId The token to swap from.
     * @param _toTokenId The token to swap to.
     * @param _currPrice The current price of the token being swapped from.
     * @param _convertedPrice The price of the token being swapped to.
     */
    function tokenSwap(
        address _id,
        string memory _fromTokenId,
        string memory _toTokenId,
        uint256 _currPrice,
        uint256 _convertedPrice
    ) public payable {
        require(msg.sender == _id, "You cannot swap");
        require(msg.value == _currPrice, "You cannot swap");

        TokenPortfolio memory newToken = TokenPortfolio(
            _fromTokenId,
            _toTokenId,
            _currPrice,
            _convertedPrice
        );

        // give an error if assest of particular tokenId is less than the current price.
        // Ensure the investor has enough balance of the fromTokenId.
        require(
            indTokenPortfolio[_id][_fromTokenId] >= _currPrice,
            "No proper balance"
        );
        tokensPortfolio[_id].push(newToken);

        indTokenPortfolio[_id][_fromTokenId] =
            indTokenPortfolio[_id][_fromTokenId] -
            _currPrice;
        indTokenPortfolio[_id][_toTokenId] =
            indTokenPortfolio[_id][_fromTokenId] +
            _convertedPrice;
    }

    // mutual fund swap similar to tradional finanical institutuion.
    /**
     * @dev Represents a mutual fund.
     * @param flag A unique identifier for the mutual fund.
     * @param name The name of the mutual fund.
     * @param tokens An array of tokens in the mutual fund.
     * @param investement The total investment amount in the mutual fund.
     */
    struct MF {
        uint256 flag;
        string name;
        string[] tokens;
        uint256 investement;
    }

    // mapping of address of a person/investor with their corresponding MF portfolio.
    /**
     * @dev Mapping of addresses to their mutual fund portfolios.
     */
    mapping(address => mapping(uint256 => MF)) public mfPortfolio;

    /**
     * @dev Initializes a mutual fund portfolio for an investor.
     * @param _id The address of the investor.
     * @param flag A unique identifier for the mutual fund.
     * @param _name The name of the mutual fund.
     * @param _investement The total investment amount in the mutual fund.
     * @param _tokens An array of tokens in the mutual fund.
     * @param _fromToken The token used for the investment.
     */
    function initializeMutualFund(
        address _id,
        uint256 flag,
        string memory _name,
        uint256 _investement,
        string[] memory _tokens,
        string memory _fromToken
    ) public payable {
        require(msg.sender == _id, "Can't initialize");
        MF memory newMf = MF(flag, _name, _tokens, _investement);
        mfPortfolio[_id][flag] = newMf;

        indTokenPortfolio[_id][_fromToken] =
            indTokenPortfolio[_id][_fromToken] -
            _investement;
    }

    // view functions

    // return multiple tokens of a user with swap data
    /**
     * @dev Returns the list of token swaps for a specific investor.
     * @param _id The address of the investor.
     * @return An array of TokenPortfolio structs representing the investor's swaps.
     */
    function AllSwaps(
        address _id
    ) public view returns (TokenPortfolio[] memory) {
        return tokensPortfolio[_id];
    }

    // get money present in wallet in indivisual token
    function EachTokenAssest(
        address _id,
        string memory _token
    ) public view returns (uint256) {
        return indTokenPortfolio[_id][_token];
    }

    // all data present with a user
    function AllData(address _id) public view returns (Person memory) {
        return investors[_id];
    }

    // get entire MF portfolio
    function entireMFPortfolio(
        address _id,
        uint256 _flag
    ) public view returns (MF memory) {
        return mfPortfolio[_id][_flag];
    }
}
