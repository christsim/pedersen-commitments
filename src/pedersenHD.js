var pedersen = require('./pedersen');

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var BN = require('bn.js')
var crypto = require('crypto');

/**
 * A managed pedersen commitment scheme 
 * To help keep generate commitments simpler
 * 
 */
function setup(Hp) {
    return {
        Hp: Hp || generatePrivateKey().toString('hex')
    };
}

// functions
function commitTo(params, value) {
    var r = generatePrivateKey();
    var C = pedersen.commitTo(ec.curve.mul(params.Hp), r, value);
    return {
        C: C.toJSON(),
        r: r.toString('hex'),
        v: value
    }
}

function verify(params, C, r, value) {
    var cp = ec.curve.pointFromJSON(C);
    return pedersen.verify(ec.curve.pointFromJSON(params.H), cp, r, value);
}

function add(c1, c2) {
    var cp1 = ec.curve.pointFromJSON(c1);
    var cp2 = ec.curve.pointFromJSON(c2);
    var cp3 = pedersen.addCommitments(cp1, cp2);
    return cp3.toJSON();
}

function sub(c1, c2) {
    var cp1 = ec.curve.pointFromJSON(c1);
    var cp2 = ec.curve.pointFromJSON(c2);
    var cp3 = pedersen.subCommitments(cp1, cp2);
    return cp3.toJSON();
}

function toNumber(priv) {
    return new BN(priv.toString('hex'), 'hex');
}

function generatePrivateKey() {
    var random;
    do {
        random = toNumber(crypto.randomBytes(32));
    } while (random >= ec.n); // make sure it's in the safe range
    return random;
}

module.exports = {
    setup,
    commitTo,
    verify,
    add,
    sub
};