/*!
 * 
 *       /**
 *        * Pimcore
 *        *
 *        * This source file is available under two different licenses:
 *        * - Pimcore Open Core License (POCL)
 *        * - Pimcore Commercial License (PCL)
 *        * Full copyright and license information is available in
 *        * LICENSE.md which is distributed with this source code.
 *        *
 *        *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *        *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 *        * /
 *
 */
"use strict";
(self["webpackChunkstudio_core"] = self["webpackChunkstudio_core"] || []).push([["js_src_core_app_public-api_index_ts"],{

/***/ "./js/src/core/app/public-api/index.ts":
/*!*********************************************!*\
  !*** ./js/src/core/app/public-api/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pimcore: () => (/* binding */ Pimcore)
/* harmony export */ });
/* harmony import */ var _depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../depency-injection */ "./js/src/core/app/depency-injection/index.ts");
/* harmony import */ var _plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugin-system/plugin-system */ "./js/src/core/app/plugin-system/plugin-system.ts");
/* harmony import */ var _config_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/services */ "./js/src/core/app/config/services/index.ts");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/



var Pimcore = {
  container: _depency_injection__WEBPACK_IMPORTED_MODULE_0__.container,
  serviceIds: _config_services__WEBPACK_IMPORTED_MODULE_2__.serviceIds,
  pluginSystem: _plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__.pluginSystem
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNfc3JjX2NvcmVfYXBwX3B1YmxpYy1hcGlfaW5kZXhfdHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUQ7QUFDYTtBQUNkO0FBQ3pDLElBQU1HLE9BQU8sR0FBRztFQUNuQkgsU0FBUyxFQUFUQSx5REFBUztFQUNURSxVQUFVLEVBQVZBLHdEQUFVO0VBQ1ZELFlBQVksRUFBWkEsc0VBQVlBO0FBQ2hCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkaW9fY29yZS8uL2pzL3NyYy9jb3JlL2FwcC9wdWJsaWMtYXBpL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBQaW1jb3JlXG4qXG4qIFRoaXMgc291cmNlIGZpbGUgaXMgYXZhaWxhYmxlIHVuZGVyIHR3byBkaWZmZXJlbnQgbGljZW5zZXM6XG4qIC0gUGltY29yZSBPcGVuIENvcmUgTGljZW5zZSAoUE9DTClcbiogLSBQaW1jb3JlIENvbW1lcmNpYWwgTGljZW5zZSAoUENMKVxuKiBGdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiBpcyBhdmFpbGFibGUgaW5cbiogTElDRU5TRS5tZCB3aGljaCBpcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXG4qXG4qICBAY29weXJpZ2h0ICBDb3B5cmlnaHQgKGMpIFBpbWNvcmUgR21iSCAoaHR0cDovL3d3dy5waW1jb3JlLm9yZylcbiogIEBsaWNlbnNlICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9waW1jb3JlL3N0dWRpby11aS1idW5kbGUvYmxvYi8xLngvTElDRU5TRS5tZCBQT0NMIGFuZCBQQ0xcbiovXG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9kZXBlbmN5LWluamVjdGlvbic7XG5pbXBvcnQgeyBwbHVnaW5TeXN0ZW0gfSBmcm9tICcuLi9wbHVnaW4tc3lzdGVtL3BsdWdpbi1zeXN0ZW0nO1xuaW1wb3J0IHsgc2VydmljZUlkcyB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2aWNlcyc7XG5leHBvcnQgY29uc3QgUGltY29yZSA9IHtcbiAgICBjb250YWluZXIsXG4gICAgc2VydmljZUlkcyxcbiAgICBwbHVnaW5TeXN0ZW1cbn07XG4iXSwibmFtZXMiOlsiY29udGFpbmVyIiwicGx1Z2luU3lzdGVtIiwic2VydmljZUlkcyIsIlBpbWNvcmUiXSwic291cmNlUm9vdCI6IiJ9