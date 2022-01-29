//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Foobar {
    uint256 public magicNum;
    uint256 public tonyLength = 3;
    uint256[] public tony = [1, 2, 7];

    function hello() public pure returns (string memory) {
        return "foo";
    }

    function hello2() public pure returns (uint256) {
        return 100_000_000_000;
    }

    function increment() public {
        magicNum += 1;
    }

    function swap() public {
        uint256 oldFirstElement = tony[0];
        uint256 oldLastElement = tony[tonyLength - 1];

        tony[0] = oldLastElement;
        tony[tonyLength - 1] = oldFirstElement;
    }

    function pop() public {
        delete tony[tonyLength - 1];
        tonyLength--;
    }

    function append(uint256 newElement) public {
        tony.push(newElement);
        tonyLength++;
    }
}
