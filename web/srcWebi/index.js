//import Autorite from 'C:/Users/judelin/Desktop/ProjetIft/Autorite/build/contracts/Autorite';
//import Organisation from 'C:/Users/judelin/Desktop/ProjetIft/Organisations/build/contracts/Organisation';


import './index.css';

var web3;
var contract;
var contract_org;
var docum ="";
var doc = $("#fichier");
var chaine="";


/***************************************************************************************/
/* Cette fonction permet de lire un fichier pdf, mais ne permet de lire un fichier pdf scanné
si c'est scanné le fichier va consider comme vide.*/
$(doc).on("change", function(evt){

//https://stackoverflow.com/questions/52054746/read-pdf-file-with-html5-file-api
// code pour convertir un fichier pdf en text sur stackoverflow
var file = evt.target.files[0];

//Read the file using file reader
var fileReader = new FileReader();

fileReader.onload = function () {
//Turn array buffer into typed array
var typedarray = new Uint8Array(this.result);

//calling function to read from pdf file
getText(typedarray).then(function (text) {

/*Selected pdf file content is in the variable text. */
//console.log(text);
chaine=text;
//$("#content").html(text);
}, function (reason) //Execute only when there is some error while reading pdf file
{
alert('Seems this file is broken, please upload another file');
console.error(reason);
});


//getText() function definition. This is the pdf reader function.
function getText(typedarray) {

//PDFJS should be able to read this typedarray content

var pdf = PDFJS.getDocument(typedarray);
return pdf.then(function (pdf) {

// get all pages text
var maxPages = pdf.pdfInfo.numPages;
var countPromises = [];
// collecting all page promises
for (var j = 1; j <= maxPages; j++) {
var page = pdf.getPage(j);

var txt = "";
countPromises.push(page.then(function (page) {
// add page promise
var textContent = page.getTextContent();

return textContent.then(function (text) {
// return content promise
return text.items.map(function (s) {
return s.str;
}).join(''); // value page text
});
}));
}

// Wait for all pages and join text
return Promise.all(countPromises).then(function (texts) {
return texts.join('');
});
});
}
};
            //Read the file as ArrayBuffer
fileReader.readAsArrayBuffer(file);

});

function initWeb3(){

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try{
    window.ethereum.enable();
  }
  catch(error){

  }
  }
    
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {// We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);

  } 
    else {
    // We are on the server *OR* the user is not running metamask
    var provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);
  //}
 //window.ethereum.enable();
}
}

function initialiserContract(documentContrat,id, address) {
 //const web3 = new Web3("http://localhost:7545");

  //var initcontrat = Object.keys(documentContrat.networks)[id];

  var contrat=new web3.eth.Contract(

    documentContrat.abi, address
  );

  return contrat;

}
function initialiserContractAutorite(documentContrat,id) {
 //const web3 = new Web3("http://localhost:7545");

  var initcontrat = Object.keys(documentContrat.networks)[id];

  var contrat=new web3.eth.Contract(

    documentContrat.abi, 

    documentContrat

      .networks[initcontrat]

      .address
  );

  return contrat;
}

 function init(){
  contract=initialiserContractAutorite(Autorite,0);
  contract_org=initialiserContractAutorite(Organisation,0);
}

async function verifNom(org,nom){
  var verif=await retournNom();
  var verifOr=await verifierEnlevParAd();
  var enregis=false

  for(var i=0; i<verif.length; i++){
    if(verif[i]==nom || verifOr[i]==org){
      enregis=true;
      break;
    }
  }
  return enregis;
}

async function verifierOrgg(address,chaine){
  
  var j=0;
  var enregis=false
    //var accounts= await web3.eth.getAccounts();
  var results= await contract.getPastEvents(
  'ajouterOrganEven',
  {
   filter: {"nom":chaine},
    fromBlock:5430,
    toBlock:'latest'
    }
  );

    var result= await contract.getPastEvents(
  'ajouterOrganEven',
  {
   filter: {"orga":address},
    fromBlock:5430,
    toBlock:'latest'
    }
  );
  
 //console.log("longueur "+results[0].returnValues.nom);
 for(var i=0; i<results.length; i++){
  if(results.length==0&& results[i].returnValues.nom!=chaine){
    //console.log("array is empty");

    enregis=false;
  }
  else if(await verifNom(address,chaine)==false){
    console.log(chaine)
    enregis=false;

  }
  else if(results.length!=0||results[i].returnValues.nom==chaine){
     enregis=true;
   }
    
   }
  return enregis;
}

async function verifierOrgExist(address){
  
  var enregis=false
  var results= await contract.getPastEvents(
  'ajouterOrganEven',
  {
    filter: {"pub":address},
    fromBlock:5430,
    //toBlock:'latest'
    }
  );
    var account=await web3.eth.getAccounts();

  var ret=await contract.methods.retournerAdresse(account[0]).call();
  var elem=await elementTrouver(ret);
  //console.log("res"+ret);
  //console.log("elem "+elem);
  //console.log(results);
  if(results.length==0){
    //console.log("array is empty");
    enregis=false;
  }
  else if(elem==false){
    enregis==false;
  }
  
  else if(results.length!=0){
    //console.log("vrai")
        enregis=true;
    }
  return enregis;  
}


function removeDuplicates(table){
  return[...new Set(table)];
}
function removeDuplicatess(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};
function getDuplicates(table){
  return table.filter((value, index)=>table.indexOf(value)!==index);
}

function mergeTab(tab,tab1){
   var difference=tab.filter(x=>tab1.indexOf(x)===-1);
   return difference;
}


async function verifierEnlevParAd(ind){
  var concat_difference;
   var difference1;
   var difference;
  var tab=[];
  var tab1=[];
  var tab2=[];
  var tab3=[];
  var account= await web3.eth.getAccounts();

   var resultat=await contract.getPastEvents('ajouterOrganEven',{
    filter: {"etat":[1]},
    fromBlock:5430,
    toBlock:'latest'});

   for(var i=0; i<resultat.length; i++){
    if(ind==0){
    tab[i]=resultat[i].returnValues.orga;
  }
  else if(ind==1){
     tab[i]=resultat[i].returnValues.pub;
   }
     else if(ind==2){
     tab[i]=resultat[i].returnValues.nom;
   }
  }

  var resultatt=await contract.getPastEvents('enleverOrganEven',{
    filter: {"etat":[0]},
    fromBlock:5430,
    toBlock:'latest'});

  for(var i=0; i<resultatt.length; i++){
      if(ind==0){
    tab1[i]=resultatt[i].returnValues.addrOrg;
  }
  else if(ind==1){
     tab1[i]=resultatt[i].returnValues.org;
  }
   else if(ind==2){
     tab1[i]=resultatt[i].returnValues.nom;
  }
   }

     difference=mergeTab(tab,tab1);
    var tab2=removeDuplicatess(getDuplicates(tab))
    var tab3=removeDuplicatess(getDuplicates(tab1))
   
    difference1=removeDuplicatess(getDuplicates(tab2.concat(tab3)));

   if(getDuplicates(tab).length==getDuplicates(tab1).length){
    concat_difference= difference;
  }
  else{
    concat_difference= difference.concat(difference1);
  }
   //console.log(concat_difference);
   return concat_difference;
}

function verifierHash(){
 verifierEnlevParAd(2).then(results=>{
  
    var opti='<label for="orga">Choisir une organisation:</label>'+
    '<select id="organis" name="organis">';
   for(var i=0; i<results.length; i++){
        opti +='<option value='+results[i]+'>'+results[i]+'</option>';
   }
   opti +='</select>';
    $("#organiss").html(opti);
  });
}


function nomOrgan(){
 
 web3.eth.getAccounts().then(account=>{
   contract.getPastEvents(
  'ajouterOrganEven',
  {
    filter: {"pub":account[0]},
    fromBlock:5430,
    toBlock:'latest'
    }
  ).then(results=>{

    var opti='<label for="orga">Organisation </label> '+
    '<select id="nomOr" name="organis">';
  if(results.length!=0){
        opti +='<option value='+results[0].returnValues.nom+'>'+results[0].returnValues.nom+'</option>';
      
   }
   opti +='</select>';
    $("#organ").html(opti);
  });
})
}

async function verifierDocc(hashi){
  var j=0;
  var enregis=0
    var accounts= await web3.eth.getAccounts();
      var resultat= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    filter: {"hash": hashi},
    fromBlock:5430,
    toBlock:'latest'
    }
  );
 
  //console.log(resultat.length);
  if(resultat.length==0){
    //console.log("array is empty");
    enregis=0;
  }
  else if(resultat.length==2){
    enregis=2;
  }
 
  else{
    enregis=3;
  }
  return enregis;   
}

async function resultatHash(){

   var j=0;
   
  var enregis;
  var account= await web3.eth.getAccounts();
  var resu= await contract.methods.retournerAdresse(account[0]).call();
      //console.log(resu)
        contract_org.options.address=resu;
        contract_org.options.jsonInterface;
   var resultatt=await contract_org.getPastEvents('ajouteDocEvent',{
    //filter: {"organisa": account,"etatDoc":[1,0]},
    fromBlock:5430,
    toBlock:'latest'});
   
    //console.log(resultatt.length);
    var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
    for(var i=0; i<resultatt.length; i++){
      enregis=await verifierDocc(resultatt[i].returnValues.hash);
      if(enregis!=2){
        j=j+1;
        table += "<tr><th scope="+"row"+">"+j+"</th><td>"+resultatt[i].returnValues.hash+"</td></tr>";
      }
    
    }
    table += "</tbody></table>";
    $("#datab").html(table);
    //$("tbody>tr").append("<input type='checkbox' />");
  //});
  //}
  
}

async function elementTrouver(elem){
  var enregis=false;
  var resul=await verifierEnlevParAd(0);
  //console.log(resul);

  for(var i=0; i<resul.length; i++){
    if(resul[i]==elem){
      enregis=true;
      //console.log("vrai "+enregis)
      break;
    }
  }
  return enregis;
}

async function histo(){
  var enregis;
  var results=await contract.getPastEvents('ajouterOrganEven',{
    //filter: {"pub":address},
    fromBlock:5430,
    toBlock:'latest'});
    var resultss=await verifierEnlevParAd(2);
    var result=await verifierEnlevParAd(0);
    var resul=await verifierEnlevParAd(1);
      var account=await web3.eth.getAccounts();
       var k=1;
        var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Organisation</th><th scope="col">From</th><th scope="col">To</th><th scope="col">Hash</th><th scope="col">Datetime</th></tr></thead><tbody>';
      for(var j=0; j<result.length; j++){
        //console.log(results[j].returnValues.orga);
        if(await elementTrouver(result[j])==true){
            //console.log(await elementTrouver(results[j].returnValues.orga));
        contract_org.options.address=result[j];
        //console.log(results[j].returnValues.nom);
        //console.log("true "+contract_org.options.address)
        contract_org.options.jsonInterface;
       var resultat= await contract_org.getPastEvents('ajouteDocEvent',{
        //filter: {"organisa": account,"etatDoc":[1,0]},
        fromBlock:5430,
        toBlock:'latest'});
        //console.log(resultat);
       
        for(var i=0; i<resultat.length; i++){
         enregis=await verifierDocc(resultat[i].returnValues.hash);
         if(enregis!=2){
          table += "<tr><th scope="+"row"+">"+k+"</th><td  style=overflow-x:auto> <div>"+resultss[j]+
          "</div></td> <td style=overflow-x:auto> <div class=a>"+resul[j]+
          "</div></td><td  style=overflow-x:auto> <div class=a>"+result[j]+"</div></td> <td  style=overflow-x:auto> <div class=a>"
          +resultat[i].returnValues.hash+"</div></td><td><div class =b>"+new Date(resultat[i].returnValues.date*1000).toString()+"</div></td></tr>";
            k=k+1;
          }
        
        }
     
      }
        
}
 table += "</tbody></table>";
          $("#dataOrg").html(table);
}


function returnNom(){
 
 web3.eth.getAccounts().then(account=>{
   contract.getPastEvents(
  'ajouterOrganEven',
  {
    filter: {"pub":account[0]},
    fromBlock:5430,
    toBlock:'latest'
    }
  ).then(results=>{

  
  if(results.length!=0){
      $("#idi").html('<span id="id"><strong>'+results[0].returnValues.nom.toUpperCase()+'</strong></span> ');
   }
  
  });
})
}
/****************************************************************************************************/

/*Cette fonction est responsable de gerer les gens qui ont deja un compte
metamask et aussi inscrire dans la blockchain ou se trouve le proprietaire.
Chaque organisation peut devenir proprietaire.
*/
   function AppAutorite(){
       
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    $("#entre").click(function(e){
      e.preventDefault();

  //var organisation = $("#addr_contrat").val();
      web3.eth.getAccounts().then(account=>{
      verifierOrgExist(account[0]).then(result=>{

       //alert(result);
        if(result==false){
           $('#insc').load('inscription.html',function(){});
           
         }
        else{
         
           $('#insc').load('AjouterDocument.html',function(){});
       
         }

      })
    });

  });
   
}else{
   $('#myModal').modal('show');
  //alert("Connect with wallet")
}
//Inscription
   $("#inscri").click( function(e){
    e.preventDefault();
   
var nom_orga = $("#nom_org").val();
  var organisation = $("#addr_contrat").val();
   web3.eth.getAccounts().then(account=>{
   verifierOrgg(organisation,nom_orga).then(resul=>{
      if(resul==false && nom_orga!=""&& organisation!=""){

        contract.methods.ajouterOrganisation(organisation, account[0],nom_orga
          ).send({
            from:account[0],
            //gas:10000
          }).then(result=>{
            //console.log("organisation ajoutée");    
            $("#dataIn").hide();
          $('#dataIns').load('AjouterDocument.html',function(){});
        })//.then(error=>{console.log("erreur")})
      } else if(organisation=="" || nom_orga==""){
       // alert("Veuillez remplir ces champs SVP.");
            $("#aler").html('<p class="alert alert-warning">'+
              "Veuillez remplir ces champs SVP!"+'</p>');
               }
                else{
                // alert("interdiction de prendre comme mot de passe ou nom organisation");
                $("#aler").html('<p class="alert alert-danger">'+
                  "L'un ou les deux est(sont) deja existé(s)!"+'</p>')
              }
          });
      });
  });
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

     web3.eth.getAccounts().then(account=>{

     contract.methods.retournerAdresse(account[0]).call().then(result=>{
     //console.log("sa "+result)
      elementTrouver(result).then(result=>{
  
    if(result==true){
    $("#orgN").click(function(e){
   e.preventDefault();
      histo();    

    });
    $("#enlev").click(function(e){
   e.preventDefault();
    $('#enlData').load('enlev.html',function(){});   

    });
 $("#enlevOrg").click(function(e){
   e.preventDefault();
    //alert("enlever");  
    web3.eth.getAccounts().then(account=>{
     var orga=$("#organ option:selected").text();
     contract.methods.enleverOrganisation(account[0],contract_org.options.address, orga
          ).send({
            from:account[0],
            //gas:200000
          }).then(result=>{
            console.log("organisation enlevée");
         })
      })
    });
}
 })
})
   })
    }else{}
}

function Organ(){
   
  var etatD=false;
  resultatHash();
  
/******************************************************************************/
  var signa;
  var ref;
   
  var documen
  
 $("#docu").click(function(e){
    e.preventDefault();
    //alert(accounts[0]);
     ref=$("#nomOrg").val();
     docum = web3.utils.soliditySha3(chaine);
    //alert(chaine);
    web3.eth.getAccounts().then(account=>{
     contract.methods.retournerAdresse(account[0]).call().then(result=>{
      //console.log(result)
        contract_org.options.address=result;
        contract_org.options.jsonInterface;
        if(chaine!=""){

        verifierDocc(docum).then(resul=>{
        //alert(resul);
        if(resul==0){
          var res=web3.eth.sign(docum, account[0]);
          //console.log(res);
          signa=res;
          contract_org.methods.ajouterDoc(docum
            ).send({
              from:account[0],
              gas:60000
            }).then(result=>{
              //console.log("document ajouté");
              $("#aler").html('<p class="alert alert-success">'+
                "Document ajouté!"+'</p>')
               resultatHash();
          })
            
          }
          else if(resul==3){
           $("#aler").html('<p class="alert alert-danger">'+
            "Document deja existe!"+'</p>');
         }
         else if(resul==2){
            $("#aler").html('<p class="alert alert-danger">'+
            "Document deja enlevé!"+'</p>');
         }
       });
       }
       else{
        $("#aler").html('<p class="alert alert-danger">'+"Fichier invalide!"+'</p>')
      }
    })
    });
    });
  
 $("#enl").click(function(e) {
  e.preventDefault();
  alert("enlever Hash");
   docum = web3.utils.soliditySha3(chaine);
   verifierDocc(docum).then(resul=>{
    if(resul==3){
   web3.eth.getAccounts().then(account=>{
     contract.methods.retournerAdresse(account[0]).call().then(resulta=>{
        contract_org.options.address=resulta;
        contract_org.options.jsonInterface;
          
     contract_org.methods.enleverDoc(docum
            ).send({
              from:account[0],
            }).then(result=>{
              resultatHash();

          });
        })

  })
 }  
 
 else{
  $("#aler").html('<p class="alert alert-danger">'+"Document n'existe pas!"+'</p>');

 }
 })
})

}

/************************************************************************************************/
/* La fonction  qui permet n'importe qui de verifier si un document existe pas besoin d'avoir un 
compte avec un portefeuille*/
function AppVerifier(){

  $("#org").click( function(e){
    e.preventDefault();
      var orga=$("#organis option:selected").text();
  //console.log(orga);
   var dofil = web3.utils.soliditySha3(chaine);
   //alert(dofil);
   //alert(chaine);
    contract.methods.retournerAdress(orga).call().then(resul=>{
      contract_org.options.address=resul;
      contract_org.methods.verifierDoc(dofil).call().then(result=>{
    if(result==true){
    //alert("document existe");
    $("#aler").html('<p class="alert alert-success">'+"Document existe!"+'</p>');
  }
  else if(chaine==""){
   $("#aler").html('<p class="alert alert-warning">'+"Veuillez remplir ce champs SVP!"+'</p>')
    }
    else{
    //alert("document n'existe pas");
    $("#aler").html('<p class="alert alert-danger">'+"Document n'existe pas!"+'</p>');
       }
      })
    })
  });
}

/***************************************************************************************************/
/* La fonction principale qui permet de faire fonctionner l'application*/
$(document).ready( async function() {
 
  initWeb3();
  //init();

  //AppAutorite();
  
  //Organ();
     if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        //returnNom();
           }
      else{}
  //tabb();
  var a= [5, 2, 9, 4];
  //console.log(removeDuplicatess(getDuplicates(a)));
  //console.log("true "+contract_org.options.address)
  //elementTrouver(contract_org.options.address).then(result=>{console.log(result)});
  //nomOrgan();
 // verifierHash();
 // AppVerifier();
  
});