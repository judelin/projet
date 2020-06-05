const Organisation = artifacts.require("Organisation");


module.exports = function(deployer) {
  deployer.deploy(Organisation);
};
//deployer.deploy(Organisation,{gas: 4612388, from: "0xAa901cc7a4e94c3ee668e014c1Faa36358434224"})