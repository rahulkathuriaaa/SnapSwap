// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract SnapSwap {
    struct Person {
        address id;
        string[] tokens;
        uint256[] tokenAmt;
    }

    struct TokenPortfolio {
        string fromTokens;
        string toTokens;
        uint256 currPrice;
        uint256 convertedPrice;
    }
    mapping(address => TokenPortfolio[]) public tokensPortfolio;
    // how much token of each type
    mapping(address => mapping(string => uint256)) public indTokenPortfolio;

    mapping(address => Person) public investors;

    // onboard investors
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

    // make persons token portfolio

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

        // cut money
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

    // mutual fund swap
    struct MF {
        uint256 flag;
        string name;
        string[] tokens;
        uint256 investement;
    }

    // get entire MF portfolio

    mapping(address => mapping(uint256 => MF)) public mfPortfolio;

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
    function allSwapsOfUser(address _id)
        public
        view
        returns (TokenPortfolio[] memory)
    {
        return tokensPortfolio[_id];
    }

    // get money present in wallet in indivisual token

    function countOfIndivisualToken(address _id, string memory _token)
        public
        view
        returns (uint256)
    {
        return indTokenPortfolio[_id][_token];
    }

    // all data present with a user

    function allUserData(address _id) public view returns (Person memory) {
        return investors[_id];
    }

    // get entire MF portfolio

    function entireMFPortfolio(address _id, uint256 _flag)
        public
        view
        returns (MF memory)
    {
        return mfPortfolio[_id][_flag];
    }
}
