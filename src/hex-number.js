var BN = require('bn.js')

function add(r1, r2) {
    var _r1 = toBN(r1);
    var _r2 = toBN(r2);

    return _r1.add(_r2).toString('hex');
}

function sub(r1, r2) {
    var _r1 = toBN(r1);
    var _r2 = toBN(r2);

    return _r1.sub(_r2).toString('hex');
}

function toBN(hn) {
    return new BN(hn, 'hex');
}

function fromBN(bn) {
    return bn.toString('hex');
}

function fromPoint(p) {
    return p.encode('hex');
}

function toPoint(ec, hn) {
    return ec.curve.decodePoint(hn, 'hex');
}

function fromBuffer(b) {
    return b.toString('hex');
}

module.exports = {
    add,
    sub,
    fromBN,
    toBN,
    fromPoint,
    toPoint,
    fromBuffer
}


