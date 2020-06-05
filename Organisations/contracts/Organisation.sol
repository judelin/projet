pragma solidity ^0.5.16;

contract Organisation{
   address public org_adr;
 
   constructor() public {
        org_adr = msg.sender;
    }
    
    uint public etat;
    mapping(bytes32=>bool) docums;
  
    event ajouteDocEvent(address indexed organisa,uint indexed etatDoc, uint date, bytes32 indexed hash);
    event enleverDocEvent(uint indexed etatDoc, bytes32 indexed hash);
   
    modifier onlyOrganisa() { // déclaration du modificateur
         require(msg.sender==org_adr,"vous n'etes pas proprietaires");
        _;
    }
	
   modifier hashExiste(bytes32 hash){
       require(docums[hash]==false,"document deja dans la blockchain");
       _;
       
   }
    function ajouterDoc(bytes32 hash) external hashExiste(hash)  {// require non organisation de preference
      
       require(org_adr==msg.sender,"Vous n'etes pas le proprietaires");
       etat=1;
       docums[hash]=true;
       emit ajouteDocEvent(org_adr,etat,now,hash);
     }
     
    function enleverDoc(bytes32 hash) external {// require non organisation de preference
       // require(org_adr==msg.sender,"Vous n'etes pas le proprietaires");
        require(docums[hash]==true,"Document existe deja");
        etat=0;
        delete docums[hash];

        emit ajouteDocEvent(org_adr,etat,now,hash);
		emit enleverDocEvent(etat,hash);
     }
    
    function verifierDoc(bytes32 hash)  view external returns(bool){
        return docums[hash]==true;    
  }
  
}