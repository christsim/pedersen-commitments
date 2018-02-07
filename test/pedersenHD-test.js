var assert = require('assert');

var PedersenHD = require('../src/pedersenHD.js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

describe('pedersenHD', () => {

    it('should commit to a number and verify it', () => {
        var params = PedersenHD.setup();
        var c1 = PedersenHD.commitTo(params, 10);
        assert(PedersenHD.verify(params, c1.C, c1.r, 10));
    });

    it('should be able to add two commitments', () => {
        var params = PedersenHD.setup();
        console.log(params);
        var c1 = PedersenHD.commitTo(params, 10);
        assert(PedersenHD.verify(params, c1.C, c1.r, 10));

        

    })
});