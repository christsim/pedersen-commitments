var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var HN = require('./hex-number.js');
var crypto = require('crypto');

// commit to a Value X
//   r - private Key used as blinding factor
//   H - shared private? point on the curve
function commitTo(H, r, x) {
    return ec.g.mul(r).add(H.mul(x));
}

// sum two commitments using homomorphic encryption
//
function add(Cx, Cy) {
    return Cx.add(Cy);
}

// subtract two commitments using homomorphic encryption
//
function sub(Cx, Cy) {
    return Cx.add(Cy.neg());
}

// add two known values with blinding factors
//   and compute the committed value
//   add rX + rY (blinding factor private keys)
//   add vX + vY (hidden values)
function addPrivately(H, rX, rY, vX, vY) {
    // umod to wrap around if negative
    var rZ = rX.add(rY).umod(ec.n);
    return ec.g.mul(rZ).add(H.mul(vX + vY));
}

// subtract two known values with blinding factors
//   and compute the committed value
//   add rX - rY (blinding factor private keys)
//   add vX - vY (hidden values)
function subPrivately(H, rX, rY, vX, vY) {
    // umod to wrap around if negative
    var rZ = rX.sub(rY).umod(ec.n);
    return ec.g.mul(rZ).add(H.mul(vX - vY));
}

/**
 * Verifies that the commitment given is the same
 * 
 * @param {*} H - secondary point
 * @param {*} C - commitment
 * @param {*} r - blinding factor private key used to create the commitment
 * @param {*} v - original value committed to
 */
function verify(H, C, r, v) {
    return ec.g.mul(r).add(H.mul(v)).eq(C);
}

/**
 * generate a random number for my curve
 */
function generateRandom() {
    var random;
    do {
        random = HN.toBN(HN.fromBuffer(crypto.randomBytes(32)));
    } while (random.gte(ec.n)); // make sure it's in the safe range
    return random;
}

function generateH() {
    return ec.g.mul(generateRandom());
}


module.exports = {
    commitTo,
    add,
    sub,
    addPrivately,
    subPrivately,
    verify,
    generateRandom,
    generateH
}
