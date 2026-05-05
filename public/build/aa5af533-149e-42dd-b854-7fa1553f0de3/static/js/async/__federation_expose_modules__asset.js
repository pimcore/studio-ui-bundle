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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__asset"], {
"./js/src/core/modules/execution-engine/jobs/download/abstract-download-job.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AbstractDownloadJob: () => (AbstractDownloadJob)
});
/* import */ var _message_handlers_message_bus_job_message_bus_job_handler__rspack_import_0 = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler.ts");
/* import */ var _message_handlers_message_bus_job_progress_calculator_progress_field_calculator__rspack_import_1 = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/progress-calculator/progress-field-calculator.ts");
/* import */ var _message_handlers_message_bus_job_step_tracker_child_job_step_tracker__rspack_import_2 = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/step-tracker/child-job-step-tracker.ts");
/* import */ var _message_handlers_message_bus_job_step_tracker_default_step_tracker__rspack_import_3 = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/step-tracker/default-step-tracker.ts");
/* import */ var _Pimcore_utils_files__rspack_import_4 = __webpack_require__("./js/src/core/utils/files.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_5 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var i18next__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_6);
/* import */ var lodash__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_7);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







class AbstractDownloadJob {
    usesChildJob() {
        return false;
    }
    async run(options) {
        const { messageBus } = options;
        const jobRunId = await this.executeAction();
        if (!(0,lodash__rspack_import_7.isNull)(jobRunId)) {
            messageBus.registerHandler(this.createHandler({
                jobRunId,
                hasChildJob: this.usesChildJob(),
                onRetry: async ()=>{
                    await this.run(options);
                }
            }));
        }
    }
    async executeAction() {
        try {
            return await this.options.action();
        } catch (e) {
            console.error(e);
            (0,_Pimcore_modules_app_error_handler__rspack_import_5["default"])(new _Pimcore_modules_app_error_handler__rspack_import_5.GeneralError((0,i18next__rspack_import_6.t)('jobs.job.download-error')));
            return null;
        }
    }
    // Bridge: lets run() use instance polymorphism to reach the subclass's static buildHandler
    createHandler(options) {
        return this.constructor.buildHandler(options);
    }
    static buildDownloadButton(downloadUrl) {
        return (context)=>{
            context.addSuccessButton({
                label: (0,i18next__rspack_import_6.t)('jobs.job.button-download'),
                handler: async ()=>{
                    const url = downloadUrl.replace('{jobRunId}', context.jobRunId.toString());
                    const available = await (0,_Pimcore_utils_files__rspack_import_4.downloadFromUrl)(url);
                    if (!available) {
                        context.showWarning('jobs.job.download-error', (0,i18next__rspack_import_6.t)('jobs.job.download-not-available'));
                    }
                }
            });
        };
    }
    static getTitle() {
        return '';
    }
    static getDownloadUrl() {
        return null;
    }
    static buildHandler(options) {
        const downloadUrl = this.getDownloadUrl();
        return new _message_handlers_message_bus_job_message_bus_job_handler__rspack_import_0.MessageBusJobHandler({
            jobRunId: options.jobRunId,
            ancestorJobRunIds: options.ancestorJobRunIds,
            title: this.getTitle(),
            stepTracker: options.hasChildJob === true ? new _message_handlers_message_bus_job_step_tracker_child_job_step_tracker__rspack_import_2.ChildJobStepTracker({
                totalSteps: 2,
                startAtStep: options.startAtStep
            }) : new _message_handlers_message_bus_job_step_tracker_default_step_tracker__rspack_import_3.DefaultStepTracker(),
            progressCalculator: new _message_handlers_message_bus_job_progress_calculator_progress_field_calculator__rspack_import_1.ProgressFieldCalculator(),
            onRetry: options.onRetry,
            onCustomizeButtons: downloadUrl !== null ? AbstractDownloadJob.buildDownloadButton(downloadUrl) : undefined
        });
    }
    constructor(options){
        this.options = options;
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__asset.js.map