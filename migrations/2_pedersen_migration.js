var PedersenAbstractions = artifacts.require("./Pedersen.sol");
var BigNumber = require('bignumber.js');

module.exports = function(deployer) {
  var zero = new BigNumber(1);
  deployer.deploy(PedersenAbstractions, [zero, zero]);
};
