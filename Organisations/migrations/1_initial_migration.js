const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
// deployer.deploy(Migrations,{gas: 4612388, from: "0xAa901cc7a4e94c3ee668e014c1Faa36358434224"});