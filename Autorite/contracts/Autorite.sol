pragma solidity ^0.5.16;

contract Autorite{
    address public owner;
 
  struct organisations{
        address organis;
        address pub;
        bool estEnregis;    
    }
	
    constructor() public {
        owner = msg.sender;
          
    }
   
    mapping(address=>organisations) stokOr;
    mapping(string=>address)chain;

    modifier organisaExiste(address organ){
        require(stokOr[organ].estEnregis==false,"deja existé");
        _;
    }
    
    event ajouterOrganEven(address indexed orga,address indexed pub,string nom, uint indexed etat);
	event enleverOrganEven(address indexed org, address indexed addrOrg,string nom,uint indexed etat);
	
    function ajouterOrganisation(address organisation, address addr,string memory _orga)public organisaExiste(addr){
        chain[_orga]=organisation;
        stokOr[addr]=organisations({organis:organisation, pub:addr, estEnregis:true});
        emit ajouterOrganEven(organisation, addr,_orga,1);  
    }
	
	function enleverOrganisation(address orga, address addrOrg,string memory ch)public{
	    require(stokOr[orga].estEnregis==true,"organisation n'existe pas");
	    require(orga!=address(0) && keccak256(abi.encodePacked(ch)) != keccak256(abi.encodePacked("")));
        emit enleverOrganEven(orga,addrOrg,ch,0);  
		delete stokOr[orga];
	    delete chain[ch];
    }
	
    function retournerAdress(string memory nom) view public returns(address){
        return chain[nom];
    }
    	
    function retournerAdresse(address nom)view public returns(address){
        return stokOr[nom].organis;
    }
}