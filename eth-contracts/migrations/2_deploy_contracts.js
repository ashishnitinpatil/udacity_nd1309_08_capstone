// migrating the appropriate contracts
const SquareVerifier = artifacts.require("SquareVerifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
    deployer.deploy(SquareVerifier);
    deployer.deploy(SolnSquareVerifier);
};
