pragma solidity ^0.4.19;


contract Pedersen {

    mapping (address => uint) balances;

    function Pedersen(uint amount) public {
        balances[msg.sender] = amount;
    }

    function transfer(address target, uint amount) {
        require(balances[msg.sender] != 0x0);

        if(balances[target] == 0) {
            balances[target] = amount;
        } else {
            // target ec add amount
//  https://medium.com/@bekahoxoo/precompiles-solidity-e5d29bd428c4
        }


        // balances[msg.sender] ec add amount.neg

    }

}