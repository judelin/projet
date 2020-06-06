var a=$("#hea").html('<h1>Authenticité document</h1>');
var b=$("#salut").html('<nav class="navbar navbar-expand-sm navaB navbar-dark justify-content-center">'+
  '<ul class="navbar-nav" id="menu">'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="index.html">Accueil</a>'+
    '</li>'+
    '<li class="nav-item">'+
    '<a class="nav-link" href="#">Apropos</a>'+
    '</li>'+
    '<li class="nav-item">'+
      '<a class="nav-link" href="check.html">Verifier</a>'+
    
  '</ul>'+
  '<div class="dropdown">'+
  '<button class="logBut" class="dropbtn" >Login<span class="caret"></span></button>'+
   '<div class="dropdown-content">'+
      '<a id="clLog" href="login.html">Login with wallet</a>'+
       '<a id="cl" href="historique.html">Historique</a>'+
      '<a id="cl" href="removeOrg.html">Enlever organisa..</a>'+
      '</div>'+
  '</div>'+
'</nav>');

var c=$("#foot").html(
'<a href="index.html">Accueil</a><br>'+
'<a href="check.html">Verifier</a><br>'+
'<a href="login.html">Login</a><br>'+
'<a href="#">Apropos</a><br>'+
 
'<small><i>Copyright &copy; 2020 Authenticité document</i></small>'+
    '<small><i><br/>'+
     '<a href="mailto:judelin@Seide.com">judelin@seide.com</a></i></small>');


var model=$("#mod").html('<!-- Modal --><div class="modal fade " id="myModal" role="dialog"><div class="modal-dialog">'+
    
      '<!-- Modal content-->'+
      '<div class="modal-content backgr"> <div class="modal-header"> <h4 class="title" ><i class="fas fa-users"></i> Connect with wallet!</h4>'+
          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
        '</div><div class="modal-body">'+ 
        '<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" value="" class="back "><i class="fas fa-users"></i></a><br><br><br>'+
        '<a href="https://trustwallet.com/" value="" class="back1 "><i class="fas fa-users"></i></a><br><br><br>'+
        '<a href="https://authereum.com/welcome" value="" class="back2 "><i class="fas fa-users"></i></a>'+

        '<p></p></div><div class="modal-footer">'+
'</div></div></div></div>');