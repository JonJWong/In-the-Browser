/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game/arrow.js":
/*!***************************!*\
  !*** ./src/game/arrow.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("var arrowImg = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module ''\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZS9hcnJvdy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxRQUFRLEdBQUdDLG1CQUFPLENBQUMsK0hBQUQsQ0FBeEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10aGUtZ3Jvb3ZlLy4vc3JjL2dhbWUvYXJyb3cuanM/OWNmNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcnJvd0ltZyA9IHJlcXVpcmUoJycpIl0sIm5hbWVzIjpbImFycm93SW1nIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/game/arrow.js\n");

/***/ }),

/***/ "./src/game/play_area.js":
/*!*******************************!*\
  !*** ./src/game/play_area.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Arrow = __webpack_require__(/*! ./arrow.js */ \"./src/game/arrow.js\");\n\nvar PlayArea = /*#__PURE__*/_createClass(function PlayArea(playAreaOptions) {\n  _classCallCheck(this, PlayArea);\n\n  this.lane = playAreaOptions[\"lane\"];\n  this.lifebar = playAreaOptions[\"lifebar\"];\n  this.receptors = playAreaOptions[\"receptors\"];\n  this.arrows = [];\n});\n\nmodule.exports = PlayArea;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZS9wbGF5X2FyZWEuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxtQkFBTyxDQUFDLHVDQUFELENBQXJCOztJQUVNQyxRLDZCQUNKLGtCQUFZQyxlQUFaLEVBQTZCO0FBQUE7O0FBQzNCLE9BQUtDLElBQUwsR0FBWUQsZUFBZSxDQUFDLE1BQUQsQ0FBM0I7QUFDQSxPQUFLRSxPQUFMLEdBQWVGLGVBQWUsQ0FBQyxTQUFELENBQTlCO0FBQ0EsT0FBS0csU0FBTCxHQUFpQkgsZUFBZSxDQUFDLFdBQUQsQ0FBaEM7QUFDQSxPQUFLSSxNQUFMLEdBQWMsRUFBZDtBQUNELEM7O0FBR0hDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlAsUUFBakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10aGUtZ3Jvb3ZlLy4vc3JjL2dhbWUvcGxheV9hcmVhLmpzP2EwOTUiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQXJyb3cgPSByZXF1aXJlKCcuL2Fycm93LmpzJyk7XG5cbmNsYXNzIFBsYXlBcmVhIHtcbiAgY29uc3RydWN0b3IocGxheUFyZWFPcHRpb25zKSB7XG4gICAgdGhpcy5sYW5lID0gcGxheUFyZWFPcHRpb25zW1wibGFuZVwiXTtcbiAgICB0aGlzLmxpZmViYXIgPSBwbGF5QXJlYU9wdGlvbnNbXCJsaWZlYmFyXCJdO1xuICAgIHRoaXMucmVjZXB0b3JzID0gcGxheUFyZWFPcHRpb25zW1wicmVjZXB0b3JzXCJdO1xuICAgIHRoaXMuYXJyb3dzID0gW107XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5QXJlYTsiXSwibmFtZXMiOlsiQXJyb3ciLCJyZXF1aXJlIiwiUGxheUFyZWEiLCJwbGF5QXJlYU9wdGlvbnMiLCJsYW5lIiwibGlmZWJhciIsInJlY2VwdG9ycyIsImFycm93cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/game/play_area.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("window.addEventListener(\"DOMContentLoaded\", function (event) {\n  var playArea = __webpack_require__(/*! ./game/play_area.js */ \"./src/game/play_area.js\");\n\n  window.canvasEl = document.getElementById(\"game-canvas\");\n  window.ctx = canvasEl.getContext(\"2d\");\n  window.playArea = playArea;\n  console.log('DOM fully loaded and parsed');\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFVBQUNDLEtBQUQsRUFBVztBQUNyRCxNQUFNQyxRQUFRLEdBQUdDLG1CQUFPLENBQUMsb0RBQUQsQ0FBeEI7O0FBRUFKLEVBQUFBLE1BQU0sQ0FBQ0ssUUFBUCxHQUFrQkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQWxCO0FBQ0FQLEVBQUFBLE1BQU0sQ0FBQ1EsR0FBUCxHQUFhSCxRQUFRLENBQUNJLFVBQVQsQ0FBb0IsSUFBcEIsQ0FBYjtBQUVBVCxFQUFBQSxNQUFNLENBQUNHLFFBQVAsR0FBa0JBLFFBQWxCO0FBQ0FPLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaO0FBQ0QsQ0FSRCIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRoZS1ncm9vdmUvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBsYXlBcmVhID0gcmVxdWlyZSgnLi9nYW1lL3BsYXlfYXJlYS5qcycpO1xuXG4gIHdpbmRvdy5jYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG4gIHdpbmRvdy5jdHggPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgd2luZG93LnBsYXlBcmVhID0gcGxheUFyZWE7XG4gIGNvbnNvbGUubG9nKCdET00gZnVsbHkgbG9hZGVkIGFuZCBwYXJzZWQnKTtcbn0pIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInBsYXlBcmVhIiwicmVxdWlyZSIsImNhbnZhc0VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10aGUtZ3Jvb3ZlLy4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;