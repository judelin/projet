const Web3 = require('web3');
const rpcURL = 'http://localhost:7545'; 
const web3 = new Web3(rpcURL);


const Autorite =artifacts.require('Autorite');
contract('Autorite', ()=>{
		let autorite=null;
		let organis ="";
		let accounts="";
		let nomOrg="";
		
	  before(async () => {
			 autorite = await Autorite.deployed();
			 organis='0x0cB860314ce520e6BC033fD7Cd1699b1b4A9bc04';
			 accounts='0x133117968dAa886FE3121AF5bf939bF5A5D6b0c7';
			 nomOrg='UMONTE';
	 });
	
  it('Should be addOrg', async () =>{
	     await autorite.ajouterOrganisation(organis,accounts,nomOrg);
		 const address=await autorite.retournerAdress(nomOrg);
		 assert(address===organis);
	
	});
	
	 it('Should be removeOrg', async () =>{
		  
		 await autorite.enleverOrganisation(accounts,organis,nomOrg);
		 const address=await autorite.retournerAdress(nomOrg);
		 assert(address!==organis);
	});
		
		it('Should be returnAddress', async () =>{
		 const address=await autorite.retournerAdress(nomOrg);
		 assert(address!==organis);

	});
	
	
});