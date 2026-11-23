import { api } from "@sdk/api";
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
                    params: {
                        elementId: queryArg.elementId,
                        elementType: queryArg.elementType,
                    },
                }),
                providesTags: ["Workflows"],
            }),
            workflowGetElements: build.query<WorkflowGetElementsApiResponse, WorkflowGetElementsApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/workflows/elements/${queryArg.elementType}`,
                    params: {
                        workflowName: queryArg.workflowName,
                        stateName: queryArg.stateName,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["Workflows"],
            }),
            workflowGetNames: build.query<WorkflowGetNamesApiResponse, WorkflowGetNamesApiArg>({
                query: () => ({ url: `/pimcore-studio/api/workflows/names` }),
                providesTags: ["Workflows"],
            }),
            workflowGetPlaces: build.query<WorkflowGetPlacesApiResponse, WorkflowGetPlacesApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/workflows/places`,
                    params: {
                        workflowName: queryArg.workflowName,
                    },
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
    items: WorkflowDetails[];
    layoutId: string;
};
export type WorkflowGetDetailsApiArg = {
    /** ID of the element */
    elementId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type WorkflowGetElementsApiResponse = /** status 200 Paginated list of elements in the given workflow state */ {
    totalItems: number;
    items: WorkflowElement[];
};
export type WorkflowGetElementsApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Workflow name */
    workflowName: string;
    /** Workflow state / place name */
    stateName?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type WorkflowGetNamesApiResponse = /** status 200 List of all configured workflow names */ {
    items: string[];
};
export type WorkflowGetNamesApiArg = void;
export type WorkflowGetPlacesApiResponse = /** status 200 List of all configured place names for the workflow */ {
    items: string[];
};
export type WorkflowGetPlacesApiArg = {
    /** Name of the workflow */
    workflowName: string;
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
    /** layoutId */
    layoutId: string | null;
    /** visibleInDetail */
    visibleInDetail: boolean;
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
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** workflowName */
    workflowName: string;
    /** workflowLabel */
    workflowLabel: string;
    /** workflowStatus */
    workflowStatus: WorkflowStatus[];
    /** graph */
    graph: string;
    /** workflowLayoutId */
    workflowLayoutId: string | null;
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
export type WorkflowElement = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Element ID */
    elementId: number;
    /** Element type */
    elementType: string;
    /** Full path */
    path: string;
    /** Element key */
    objectKey: string;
    /** Workflow name */
    workflowName: string;
    /** Current state name */
    stateName: string;
    /** Human-readable state label */
    stateLabel: string;
    /** State color */
    stateColor: string;
    /** Modification timestamp */
    modificationDate: number;
};
export type SubmitAction = {
    /** type of the action */
    actionType: string;
    /** Id of the element */
    elementId: number;
    /** Type of the element */
    elementType: string;
    /** Id of the workflow */
    workflowId: string;
    /** Id of the transition */
    transitionId: string;
    /** workflowOptions */
    workflowOptions: object | null;
};
export const {
    useWorkflowGetDetailsQuery,
    useWorkflowGetElementsQuery,
    useWorkflowGetNamesQuery,
    useWorkflowGetPlacesQuery,
    useWorkflowActionSubmitMutation,
} = injectedRtkApi;
