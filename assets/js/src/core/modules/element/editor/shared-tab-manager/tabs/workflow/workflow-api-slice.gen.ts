import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Workflows"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            workflowGetDetails: build.query<WorkflowGetDetailsApiResponse, WorkflowGetDetailsApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/workflows/details`,
                    params: { elementId: queryArg.elementId, elementType: queryArg.elementType },
                }),
                providesTags: ["Workflows"],
            }),
            workflowActionSubmit: build.mutation<WorkflowActionSubmitApiResponse, WorkflowActionSubmitApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/workflows/action`,
                    method: "POST",
                    body: queryArg.submitAction,
                }),
                invalidatesTags: ["Workflows"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type WorkflowGetDetailsApiResponse = /** status 200 Detail data of element workflows */ {
    items?: WorkflowDetails[];
};
export type WorkflowGetDetailsApiArg = {
    /** ID of the element */
    elementId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type WorkflowActionSubmitApiResponse =
    /** status 200 Json encoded name of workflow, name and type of submitted action. */ {
        workflowName?: string;
        actionName?: string;
        actionType?: string;
    };
export type WorkflowActionSubmitApiArg = {
    submitAction: SubmitAction;
};
export type WorkflowStatus = {
    /** color */
    color: string;
    /** colorInverted */
    colorInverted: boolean;
    /** borderColor */
    title: string;
    /** label */
    label: string;
    /** visibleInDetail */
    visibleInDetail?: boolean;
};
export type AllowedTransition = {
    /** name */
    name: string;
    /** label */
    label: string;
    /** iconCls */
    iconCls: string;
    /** objectLayout */
    objectLayout: boolean;
    /** unsavedChangesBehaviour */
    unsavedChangesBehaviour: string;
    /** notes */
    notes: object[];
};
export type GlobalAction = {
    /** name */
    name: string;
    /** label */
    label: string;
    /** iconCls */
    iconCls: string;
    /** objectLayout */
    objectLayout: boolean;
    /** notes */
    notes: object[];
};
export type WorkflowDetails = {
    /** workflowName */
    workflowName: string;
    /** workflowStatus */
    workflowStatus: WorkflowStatus[];
    /** graph */
    graph: string;
    /** allowedTransitions */
    allowedTransitions: AllowedTransition[];
    /** globalActions */
    globalActions: GlobalAction[];
};
export type Error = {
    /** Message */
    message: string;
};
export type DevError = {
    /** Message */
    message: string;
    /** Details */
    details: string;
};
export type SubmitAction = {
    /** type of the action */
    actionType: string;
    /** Id of the element */
    elementId: number;
    /** Type of the element */
    elementType: string;
    /** Id of the workflow */
    workflowId?: string;
    /** Id of the transition */
    transitionId?: string;
    /** workflowOptions */
    workflowOptions: object;
};
export const { useWorkflowGetDetailsQuery, useWorkflowActionSubmitMutation } = injectedRtkApi;
