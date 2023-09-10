// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "./IMultisig.sol";

interface IFactoryMultisig {
    function createMultisig(address[] memory _admins) external payable returns (IMultisig newMultisig);
}
