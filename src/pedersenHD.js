var HDKey = require('hdkey');
var pedersen = require('./pedersen');

/**
 * A managed pedersen commitment scheme using hd keys
 * To help keep track of commitments
 * 
 * @param {*} hdKeyString - xpriv key string
 * @param {*} H - H generator point for the commitments for this system
 * @param {*} rIndex - starting blinding key index
 */
function PedersenHD(hdKeyString, H, rIndex = 0) {
    this.rootPath = "m/0";
    this.hdRoot = HDKey.fromExtendedKey(hdKeyString);
    this.rIndex = rIndex; // current index count

    // must not change for our system
    this.H = H;
}

PedersenHD.prototype
    .getBlindingFactorPath(index) = this.rootPath + "/'/" + index;     // hardened

// functions
PedersenHD.prototype
    .getAndIncrementRIndex = () => this.rIndex++;

PedersenHD.prototype
    .commitTo = (value) => {
        var index = this.getAndIncrementRIndex();
        var blindingPath = this.getBlindingFactorPath(index);
        var hdR = this.hdRoot.derive(blindingPath);
        var r = toNumber(hdR.privateKey);
        var C = pedersen.commitTo(this.H, r, value);
        return {
            C,
            path: blindingPath,
            private: {
                r,
                value
            }
        }
    }

PedersenHD.prototype
    .verify = (C, path, value) => {
        var blindingPath = this.getBlindingFactorPath(index);
        var hdR = this.hdRoot.derive(blindingPath);
        var r = toNumber(hdR.privateKey);
        return pedersen.verify(this.H, C, rG, value);
    }

function toNumber(priv) {
    return new BN(priv.toString('hex'), 'hex');
}
