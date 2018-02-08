var assert = require('assert');

var PedersenHD = require('../src/pedersenHD.js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

describe('pedersenHD', () => {

    it('should commit to a number and verify it', () => {
        var params = PedersenHD.setup();
        console.log(params);
        var c1 = PedersenHD.commitTo(params, 10);
        assert(PedersenHD.verify(params, c1.C, c1.r, 10));
    });

    it('should be able to add two commitments', () => {
        var H = '18d364bf6dbb72333da1d87361e7e02ace8639bc29b52c93c39cc0366f13511d';
        var params = PedersenHD.setup(H);
        console.log(H);
        var c1 = PedersenHD.commitTo(params, 10);
        var c2 = PedersenHD.commitTo(params, 11);

        var C2 = PedersenHD.add(c1.C, c2.C);
        

    })
});