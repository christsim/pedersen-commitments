var assert = require('assert');

var pedersen = require('../src/pedersen.js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

// pre-generate a bunch of blinding factors
var r = Array(10).fill().map((x, i) => i).map(i => pedersen.generateRandom());

// this is another point of the curve that will be used
//   as the generate points for the hidden values
var H = pedersen.generateH();

describe('pedersen', () => {

    it('should commit to a sum of two values', () => {

        //transfer amount - we want to transfer 5 tokens
        var tC = pedersen.commitTo(H, r[1], 5);

        // Alice 10 - 5 = 5
        var aC1 = pedersen.commitTo(H, r[2], 10);
        var aC2 = pedersen.sub(aC1, tC);

        // bob 7 + 5 (aC2) = 12
        var bC1 = pedersen.commitTo(H, r[4], 7);
        var bC2 = pedersen.add(bC1, tC);

        // alice's balance to go down by 5
        // aC1 - tC = aC2
        var checkAC2 = pedersen.subPrivately(H, r[2], r[1], 10, 5);
        assert(aC2.eq(checkAC2));

        // bob's balance to go up by 5
        // bC1 + tC = bC2 
        var checkBC2 = pedersen.addPrivately(H, r[4], r[1], 7, 5);

        assert(bC2.eq(checkBC2));
        
        // verify the commitment
        assert(pedersen.verify(H, bC2, r[4].add(r[1]), 7 + 5));
    });

    it('should fail if not using the correct blinding factors', () => {
        //transfer amount - we want to transfer 5 tokens
        var tC = pedersen.commitTo(H, r[1], 5);

        // Alice 10 - 5 = 5
        var aC1 = pedersen.commitTo(H, r[2], 10);
        var aC2 = pedersen.sub(aC1, tC);

        // bob 7 + 5 (aC2) = 12
        var bC1 = pedersen.commitTo(H, r[4], 7);
        var bC2 = pedersen.add(bC1, tC);

        // now to check
        // r[0] -> is not the correct blinding factor
        var checkAC2 = pedersen.subPrivately(H, r[0], r[1], 10, 5);

        assert(aC2.eq(checkAC2) == false);
        
        // now to check
        // r[0] -> is not the correct blinding factor
        var checkBC2 = pedersen.addPrivately(H, r[0], r[1], 7, 5);

        assert(bC2.eq(checkBC2) == false);
    })
});