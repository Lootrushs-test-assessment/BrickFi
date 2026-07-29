// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quote {
    function quote(uint256 sharePrice, uint256 shares, uint256 remaining)
        external
        pure
        returns (uint256 cost, bool canFill)
    {
        return (0, false);
    }
}
