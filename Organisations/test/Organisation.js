const Web3 = require('web3');
const rpcURL = 'http://localhost:7545'; 
const web3 = new Web3(rpcURL);


const Organisation =artifacts.require('Organisation');
contract('Organisation', ()=>{
		let documen=null;
		let accounts=[];
		let docum ="";
	  before(async () => {
			 documen = await Organisation.deployed();
			docum = await web3.utils.soliditySha3("salut")
	 });
	
  it('Should be addDoc', async () =>{
	     await documen.ajouterDoc(docum);
		 const check=await documen.verifierDoc(docum);
		 assert(check===true);
	
	});
	
	 it('Should be removeDoc', async () =>{
		 await documen.enleverDoc(docum);
		 const check=await documen.verifierDoc(docum);
		 assert(check===false);

	});
		
		it('Should be checkDoc', async () =>{
		 const check=await documen.verifierDoc(docum);
		 assert(check===false);

	});
	
	
});