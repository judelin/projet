/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./srcWebi/headNav.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./srcWebi/headNav.js":
/*!****************************!*\
  !*** ./srcWebi/headNav.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var a=$(\"#hea\").html('<h1>Authenticité document</h1>');\r\nvar b=$(\"#salut\").html('<nav class=\"navbar navbar-expand-sm navaB navbar-dark justify-content-center\">'+\r\n  '<ul class=\"navbar-nav\" id=\"menu\">'+\r\n    '<li class=\"nav-item active\">'+\r\n      '<a class=\"nav-link\" href=\"index.html\">Accueil</a>'+\r\n    '</li>'+\r\n    '<li class=\"nav-item\">'+\r\n    '<a class=\"nav-link\" href=\"#\">Apropos</a>'+\r\n    '</li>'+\r\n    '<li class=\"nav-item\">'+\r\n      '<a class=\"nav-link\" href=\"check.html\">Verifier</a>'+\r\n    \r\n  '</ul>'+\r\n  '<div class=\"dropdown\">'+\r\n  '<button class=\"logBut\" class=\"dropbtn\" >Login<span class=\"caret\"></span></button>'+\r\n   '<div class=\"dropdown-content\">'+\r\n      '<a id=\"clLog\" href=\"login.html\">Login with wallet</a>'+\r\n       '<a id=\"cl\" href=\"historique.html\">Historique</a>'+\r\n      '<a id=\"cl\" href=\"removeOrg.html\">Enlever organisa..</a>'+\r\n      '</div>'+\r\n  '</div>'+\r\n'</nav>');\r\n\r\nvar c=$(\"#foot\").html(\r\n'<a href=\"index.html\">Accueil</a><br>'+\r\n'<a href=\"check.html\">Verifier</a><br>'+\r\n'<a href=\"login.html\">Login</a><br>'+\r\n'<a href=\"#\">Apropos</a><br>'+\r\n \r\n'<small><i>Copyright &copy; 2020 Authenticité document</i></small>'+\r\n    '<small><i><br/>'+\r\n     '<a href=\"mailto:judelin@Seide.com\">judelin@seide.com</a></i></small>');\r\n\r\n\r\nvar model=$(\"#mod\").html('<!-- Modal --><div class=\"modal fade\" id=\"myModal\" role=\"dialog\"><div class=\"modal-dialog\">'+\r\n    \r\n      '<!-- Modal content-->'+\r\n      '<div class=\"modal-content\"> <div class=\"modal-header\"> <h4 class=\"title\"><i class=\"fas fa-users\"></i> Connect with wallet!</h4>'+\r\n          '<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>'+\r\n        '</div><div class=\"modal-body\">'+ \r\n         '<!--Facebook-->'+\r\n                 '<a type=\"button\" class=\"btn-floating btn-fb\"><i class=\"fab fa-facebook-f\">gggg</i></a>'+\r\n        '<p>Some text in the modal.</p></div><div class=\"modal-footer\">'+\r\n'</div></div></div></div>');\n\n//# sourceURL=webpack:///./srcWebi/headNav.js?");

/***/ })

/******/ });