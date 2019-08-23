pragma solidity 0.5.11;

import {DecentralandERC721Token} from "./ERC721Mintable.sol";
import {SquareVerifier} from "./SquareVerifier.sol";



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is DecentralandERC721Token {
    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    SquareVerifier public verifierContract;

    constructor(address verifierAddress) public{
        verifierContract = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address to;
    }

    // TODO define an array of the above struct
    Solution[] submittedSolutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(
        address indexed to,
        uint256 indexed tokenId,
        bytes32 indexed key
    );

    // TODO Create a function to add the solutions to the array and emit the event
    function _addSolution(address _to, uint256 _tokenId, bytes32 _key)
        internal
    {
        Solution memory _soln = Solution({tokenId : _tokenId, to : _to});
        submittedSolutions.push(_soln);
        uniqueSolutions[_key] = _soln;
        emit SolutionAdded(_to, _tokenId, _key);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mintToken(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        whenNotPaused
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].to == address(0), "Solution is already used");
        require(verifierContract.verifyTx(a, b, c, input), "Solution is incorrect");
        _addSolution(to, tokenId, key);
        super.mint(to, tokenId);
    }
}
