// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {MultiSig} from "./multisig.sol";

contract MultiSigFactory {
    MultiSig[] public _multisig;
    event Create(MultiSig _adr);

    function createMultisig(
        address[] memory _admins
    ) external payable returns (MultiSig newMultisig) {
        newMultisig = new MultiSig{value: msg.value}(_admins);
        _multisig.push(newMultisig);
        emit Create(newMultisig);
    }

    function getAllMultisig() external view returns (MultiSig[] memory) {
        return _multisig;
    }
}
