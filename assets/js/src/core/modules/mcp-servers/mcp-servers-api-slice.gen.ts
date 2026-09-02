import { api } from "@sdk/api";
export const addTagTypes = ["MCP"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            mcpGetServers: build.query<McpGetServersApiResponse, McpGetServersApiArg>({
                query: () => ({ url: `/pimcore-studio/api/mcp/servers` }),
                providesTags: ["MCP"],
            }),
            mcpCreateServer: build.mutation<McpCreateServerApiResponse, McpCreateServerApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/mcp/servers`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["MCP"],
            }),
            mcpGetServer: build.query<McpGetServerApiResponse, McpGetServerApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/mcp/servers/${queryArg.id}` }),
                providesTags: ["MCP"],
            }),
            mcpUpdateServer: build.mutation<McpUpdateServerApiResponse, McpUpdateServerApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/mcp/servers/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["MCP"],
            }),
            mcpDeleteServer: build.mutation<McpDeleteServerApiResponse, McpDeleteServerApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/mcp/servers/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["MCP"],
            }),
            mcpGetTools: build.query<McpGetToolsApiResponse, McpGetToolsApiArg>({
                query: () => ({ url: `/pimcore-studio/api/mcp/tools` }),
                providesTags: ["MCP"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type McpGetServersApiResponse = /** status 200 List of MCP server configurations */ {
    totalItems: number;
    items: McpServer[];
};
export type McpGetServersApiArg = void;
export type McpCreateServerApiResponse = /** status 200 The created MCP server configuration */ McpServer;
export type McpCreateServerApiArg = {
    body: {
        name: string;
        urlSlug: string;
        description?: string;
        tools?: string[];
        enabled?: boolean;
        shareGlobal?: boolean;
        sharedUsers?: McpServerAccessGrant[];
        sharedRoles?: McpServerAccessGrant[];
    };
};
export type McpGetServerApiResponse = /** status 200 The requested MCP server configuration */ McpServer;
export type McpGetServerApiArg = {
    /** Id of the MCP server */
    id: string;
};
export type McpUpdateServerApiResponse = /** status 200 The updated MCP server configuration */ McpServer;
export type McpUpdateServerApiArg = {
    /** Id of the MCP server */
    id: string;
    body: {
        name: string;
        urlSlug: string;
        description?: string;
        tools?: string[];
        enabled?: boolean;
        shareGlobal?: boolean;
        sharedUsers?: McpServerAccessGrant[];
        sharedRoles?: McpServerAccessGrant[];
    };
};
export type McpDeleteServerApiResponse = unknown;
export type McpDeleteServerApiArg = {
    /** Id of the MCP server */
    id: string;
};
export type McpGetToolsApiResponse = /** status 200 List of available MCP tools */ {
    totalItems: number;
    items: McpTool[];
};
export type McpGetToolsApiArg = void;
export type McpServerAccessGrant = {
    /** User or role name */
    name: string;
    /** May see the server and its configuration (implied by canEdit) */
    canRead: boolean;
    /** May connect a client to the server at runtime */
    canAccess: boolean;
    /** May edit the server configuration */
    canEdit: boolean;
};
export type McpServerUserPermissions = {
    /** The current user may view the server and its config */
    canView: boolean;
    /** The current user may connect a client to the server */
    canAccess: boolean;
    /** The current user may edit, re-share or delete the server */
    canEdit: boolean;
};
export type McpServer = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Server id (also the url slug) */
    id: string;
    /** Display name */
    name: string;
    /** Description */
    description?: string | null;
    /** URL segment under /pimcore-mcp/studio/ */
    urlSlug: string;
    /** Endpoint an MCP client connects to */
    url: string;
    /** Assigned tool ids */
    tools: string[];
    /** Advertised OAuth scopes (derived from the tools) */
    scopes: string[];
    /** Whether the server is enabled */
    enabled: boolean;
    /** Owner user name. Null when the owner has been deleted. */
    owner?: string | null;
    /** Public: any authenticated user may view and use it (not edit) */
    shareGlobal: boolean;
    /** Users shared with, each at a read/write level */
    sharedUsers: McpServerAccessGrant[];
    /** Roles shared with, each at a read/write level */
    sharedRoles: McpServerAccessGrant[];
    /** Whether the storage target allows editing at all */
    writeable: boolean;
    /** The requesting user's resolved access to this server */
    currentUserPermissions: McpServerUserPermissions;
    /** Number of assigned tools */
    toolCount: number;
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
export type McpTool = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Tool id (used in a server's tool list) */
    name: string;
    /** Human-facing title */
    title: string;
    /** Description */
    description: string;
    /** OAuth scope the tool requires */
    requiredScope: string;
    /** Read-only hint */
    readOnly: boolean;
    /** Destructive hint */
    destructive: boolean;
};
export const {
    useMcpGetServersQuery,
    useMcpCreateServerMutation,
    useMcpGetServerQuery,
    useMcpUpdateServerMutation,
    useMcpDeleteServerMutation,
    useMcpGetToolsQuery,
} = injectedRtkApi;
