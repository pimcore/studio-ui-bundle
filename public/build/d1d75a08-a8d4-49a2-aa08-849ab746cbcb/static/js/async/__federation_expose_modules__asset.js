/*!
 * 
 *             /**
 *              * This source file is available under the terms of the
 *              * Pimcore Open Core License (POCL)
 *              * Full copyright and license information is available in
 *              * LICENSE.md which is distributed with this source code.
 *              *
 *              *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *              *  @license    Pimcore Open Core License (POCL)
 *              * /
 *
 */
"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__asset"], {
"./js/src/core/modules/execution-engine/jobs/download/download-job.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DownloadJob: () => (DownloadJob)
});
/* ESM import */var _message_handlers_message_bus_job_message_bus_job_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



class DownloadJob {
    async run(options) {
        const { messageBus } = options;
        const jobRunId = await this.executeAction();
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(jobRunId)) {
            const handler = this.createHandler(jobRunId, options);
            messageBus.registerHandler(handler);
        }
    }
    async executeAction() {
        try {
            return await this.options.action();
        } catch (e) {
            console.error(e);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError((0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('jobs.job.download-error')));
            return null;
        }
    }
    createHandler(jobRunId, options) {
        const { title, downloadUrl } = this.options;
        return new _message_handlers_message_bus_job_message_bus_job_handler__WEBPACK_IMPORTED_MODULE_0__.MessageBusJobHandler({
            jobRunId,
            title,
            onRetry: async ()=>{
                await this.run(options);
            },
            onCustomizeButtons: (context)=>{
                context.addSuccessButton({
                    label: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('jobs.job.button-download'),
                    handler: ()=>{
                        const a = document.createElement('a');
                        a.href = downloadUrl.replace('{jobRunId}', jobRunId.toString());
                        a.download = '';
                        a.click();
                    }
                });
            }
        });
    }
    constructor(options){
        this.options = options;
    }
}

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

}]);
//# sourceMappingURL=__federation_expose_modules__asset.js.map