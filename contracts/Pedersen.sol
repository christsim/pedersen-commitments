pragma solidity ^0.4.19;


contract Pedersen {

    mapping (address => uint) balances;

    function Pedersen(uint amount) public {
        balances[msg.sender] = amount;
    }

    function transfer(address target, uint amount) public {
        require(balances[msg.sender] != 0x0);

        if(balances[target] == 0) {
            balances[target] = amount;
        } else {
            // target ec add amount
//  https://medium.com/@bekahoxoo/precompiles-solidity-e5d29bd428c4
        }


        // balances[msg.sender] ec add amount.neg

    }

//Base EC Functions
    function ecAdd(uint256[2] p0, uint256[2] p1)
        public constant returns (uint256[2] p2)
    {
        assembly {
            //Get Free Memory Pointer
            let p := mload(0x40)
            
            //Store Data for ECAdd Call
            mstore(p, mload(p0))
            mstore(add(p, 0x20), mload(add(p0, 0x20)))
            mstore(add(p, 0x40), mload(p1))
            mstore(add(p, 0x60), mload(add(p1, 0x20)))
            
            //Call ECAdd
            let success := call(sub(gas, 2000), 0x06, 0, p, 0x80, p, 0x40)
            
            // Use "invalid" to make gas estimation work
 			switch success case 0 { revert(p, 0x80) }
 			
 			//Store Return Data
 			mstore(p2, mload(p))
 			mstore(add(p2, 0x20), mload(add(p,0x20)))
        }
    }

}