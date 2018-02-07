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
function setup(H, randomPrivateKeyGenerator) {
    randomPrivateKeyGenerator = randomPrivateKeyGenerator || generatePrivateKey;
    console.log(ec.g.mul(randomPrivateKeyGenerator()).toJSON());
    return {
        H:  H || ec.g.mul(randomPrivateKeyGenerator()).toJSON(),
        randomPrivateKeyGenerator
    };
}

// functions
function commitTo (params, value) {
        var r = params.randomPrivateKeyGenerator();
        var C = pedersen.commitTo(ec.curve.pointFromJSON(params.H), r, value);
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

function toNumber(priv) {
    return new BN(priv.toString('hex'), 'hex');
}

function generatePrivateKey() {
    var random;
    do {
        random = toNumber(crypto.randomBytes(32));
    } while(random >= ec.n);    // make sure it's in the safe range
    return random;
}

module.exports = {
    setup,
    commitTo,
    verify
};