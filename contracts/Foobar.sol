//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Foobar {

     uint public magicNum;

     function hello() public pure returns (string memory) {

         return "foo";
     }

     function hello2() public pure returns (uint) {
         return 100_000_000_000;
     }

     function increment() public {
         magicNum += 1;
     }

}