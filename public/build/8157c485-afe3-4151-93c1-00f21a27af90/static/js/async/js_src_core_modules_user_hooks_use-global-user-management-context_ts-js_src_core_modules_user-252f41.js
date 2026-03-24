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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_user_hooks_use-global-user-management-context_ts-js_src_core_modules_user-252f41"], {
"./js/src/core/modules/user/hooks/use-global-user-management-context.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useGlobalUserContext: () => (useGlobalUserContext)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_global_context_global_context_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/global-context/global-context-slice.ts");
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

const useGlobalUserContext = ()=>{
    const disptach = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const context = (0,_sdk_app__rspack_import_0.useAppSelector)((state)=>(0,_Pimcore_modules_app_global_context_global_context_slice__rspack_import_1.selectContextByType)(state, 'user'));
    const setContext = function(config) {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__rspack_import_1.addGlobalContext)({
            type: 'user',
            config
        }));
    };
    const removeContext = function() {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__rspack_import_1.removeGlobalContext)('user'));
    };
    return {
        context,
        setContext,
        removeContext
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/hooks/use-user-management-draft.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserManagementDraft: () => (useUserManagementDraft)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_user_user_management_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/user-management-slice.tsx");
/* import */ var _Pimcore_modules_auth_user_user_api_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice.gen.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const useUserManagementDraft = (id)=>{
    _s();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const user = (0,_sdk_app__rspack_import_0.useAppSelector)((state)=>(0,_Pimcore_modules_user_user_management_slice__rspack_import_1.selectUserById)(state, id));
    const [isLoading, setIsLoading] = (0,react__rspack_import_3.useState)(true);
    const [isError, setIsError] = (0,react__rspack_import_3.useState)(false);
    async function fetchUser() {
        const { data, isError: isUserGetByIdError, error } = await dispatch(_Pimcore_modules_auth_user_user_api_slice_gen__rspack_import_2.api.endpoints.userGetById.initiate({
            id
        }, {
            forceRefetch: true
        }));
        if (isUserGetByIdError) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_4["default"])(new _Pimcore_modules_app_error_handler__rspack_import_4.ApiError(error));
        }
        if (data !== undefined) {
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {};
    }
    function reloadUser() {
        getUser();
    }
    (0,react__rspack_import_3.useEffect)(()=>{
        if (user === undefined && id !== undefined) {
            getUser();
        } else {
            setIsLoading(false);
        }
    }, [
        user
    ]);
    function getUser() {
        setIsLoading(true);
        fetchUser().then((data)=>{
            dispatch((0,_Pimcore_modules_user_user_management_slice__rspack_import_1.userFetched)({
                ...data,
                modified: false,
                changes: {},
                modifiedCells: {}
            }));
        }).catch(()=>{
            setIsError(true);
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    function removeUserFromState() {
        if (user === undefined) return;
        dispatch((0,_Pimcore_modules_user_user_management_slice__rspack_import_1.userRemoved)(user.id));
    }
    function changeUserInState(changes) {
        if (user === undefined) return;
        if (typeof changes.twoFactorAuthenticationRequired === 'boolean') {
            changes.twoFactorAuthentication = {
                ...user.twoFactorAuthentication,
                required: changes.twoFactorAuthenticationRequired
            };
        }
        dispatch((0,_Pimcore_modules_user_user_management_slice__rspack_import_1.changeUser)({
            id: user.id,
            changes
        }));
    }
    function updateUserImageInState(image) {
        dispatch((0,_Pimcore_modules_user_user_management_slice__rspack_import_1.updateUserImage)({
            id: user.id,
            image
        }));
    }
    function updateUserKeyBinding(name, code) {
        const updatedKeyBindings = [
            ...user.keyBindings
        ];
        const existingKeyBindingIndex = updatedKeyBindings.findIndex((keyBinding)=>keyBinding.action === name);
        if (existingKeyBindingIndex !== -1) {
            updatedKeyBindings[existingKeyBindingIndex] = {
                action: name,
                ...code
            };
        } else {
            updatedKeyBindings.push({
                action: name,
                ...code
            });
        }
        dispatch((0,_Pimcore_modules_user_user_management_slice__rspack_import_1.changeUser)({
            id: user.id,
            changes: {
                keyBindings: updatedKeyBindings
            }
        }));
    }
    return {
        isLoading,
        isError,
        user,
        removeUserFromState,
        changeUserInState,
        reloadUser,
        updateUserKeyBinding,
        updateUserImageInState
    };
};
_s(useUserManagementDraft, "fxDG1eJQbvTQoem4ZMmbYPCu9ic=", false, function() {
    return [
        _sdk_app__rspack_import_0.useAppDispatch,
        _sdk_app__rspack_import_0.useAppSelector
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleDraft: () => (useRoleDraft)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_user_roles_roles_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* import */ var _Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice.gen.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const useRoleDraft = (id)=>{
    _s();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const role = (0,_sdk_app__rspack_import_0.useAppSelector)((state)=>(0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.selectRoleById)(state, id));
    const [isLoading, setIsLoading] = (0,react__rspack_import_3.useState)(true);
    const [isError, setIsError] = (0,react__rspack_import_3.useState)(false);
    async function fetchRole() {
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_2.api.endpoints.roleGetById.initiate({
            id
        }, {
            forceRefetch: true
        }));
        if (data !== undefined) {
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {};
    }
    function reloadRole() {
        removeRoleFromState();
        getRole();
    }
    (0,react__rspack_import_3.useEffect)(()=>{
        if (role === undefined && id !== undefined) {
            getRole();
        } else {
            setIsLoading(false);
        }
    }, [
        role
    ]);
    function getRole() {
        setIsLoading(true);
        fetchRole().then((data)=>{
            dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleFetched)(data));
        }).catch(()=>{
            setIsError(true);
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    function removeRoleFromState() {
        if (role === undefined) return;
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleRemoved)(role.id));
    }
    function changeRoleInState(changes) {
        if (role === undefined) return;
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.changeRole)({
            id: role.id,
            changes
        }));
    }
    return {
        isLoading,
        isError,
        role,
        removeRoleFromState,
        changeRoleInState,
        reloadRole
    };
};
_s(useRoleDraft, "KX6IHWORaxXCL7NCch+DfqpUmtw=", false, function() {
    return [
        _sdk_app__rspack_import_0.useAppDispatch,
        _sdk_app__rspack_import_0.useAppSelector
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleHelper: () => (useRoleHelper)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_user_roles_roles_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* import */ var _Pimcore_components_notification_useNotification__rspack_import_2 = __webpack_require__("./js/src/core/components/notification/useNotification/index.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const useRoleHelper = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const [notificationApi] = (0,_Pimcore_components_notification_useNotification__rspack_import_2.useNotification)();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const activeId = (0,_sdk_app__rspack_import_0.useAppSelector)((state)=>state.role.activeId);
    const getAllIds = (0,_sdk_app__rspack_import_0.useAppSelector)((state)=>state.role.ids);
    const handleNotification = (successMessage, error)=>{
        if (error !== undefined) {
            var _error_data;
            notificationApi.open({
                type: 'error',
                message: (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.message) ?? t('error')
            });
        } else {
            notificationApi.open({
                type: 'success',
                message: successMessage
            });
        }
    };
    function openRole(id) {
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleOpened)(id));
    }
    function closeRole(id) {
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleClosed)({
            id,
            allIds: getAllIds
        }));
    }
    async function fetchRoleById(props) {
        const { id } = props;
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleGetById.initiate({
            id
        }));
        return data;
    }
    async function getRoleTree(props) {
        const { parentId } = props;
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleGetTree.initiate({
            parentId
        }));
        return data;
    }
    async function searchRoleByText(query) {
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleSearch.initiate({
            searchQuery: query
        }));
        return data;
    }
    async function addNewRole(props) {
        const { parentId, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleCreate.initiate({
            body: {
                parentId,
                name
            }
        }));
        handleNotification(t('roles.add-item.success'), error);
        return data;
    }
    async function addNewFolder(props) {
        const { parentId, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleFolderCreate.initiate({
            body: {
                parentId,
                name
            }
        }));
        handleNotification(t('roles.add-folder.success'), error);
        return data;
    }
    async function removeRole(props) {
        const { id } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleDeleteById.initiate({
            id
        }));
        handleNotification(t('roles.remove-item.success'), error);
        return data;
    }
    async function removeFolder(props) {
        const { id } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleFolderDeleteById.initiate({
            id
        }));
        handleNotification(t('roles.remove-folder.success'), error);
        return data;
    }
    async function cloneRole(props) {
        const { id, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleCloneById.initiate({
            id,
            body: {
                name
            }
        }));
        handleNotification(t('roles.clone-item.success'), error);
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleOpened)(data.id));
        return data;
    }
    async function updateRoleById(props) {
        const { id, item } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleUpdateById.initiate({
            id,
            updateRole: {
                name: item.name,
                classes: item.classes,
                parentId: item.parentId ?? 0,
                permissions: item.permissions,
                docTypes: item.docTypes,
                websiteTranslationLanguagesEdit: item.websiteTranslationLanguagesEdit,
                websiteTranslationLanguagesView: item.websiteTranslationLanguagesView,
                assetWorkspaces: item.assetWorkspaces,
                dataObjectWorkspaces: item.dataObjectWorkspaces,
                documentWorkspaces: item.documentWorkspaces,
                perspectives: item.perspectives
            }
        }));
        handleNotification(t('roles.save-item.success'), error);
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__rspack_import_1.roleUpdated)(id));
        return data;
    }
    async function moveRoleById(props) {
        const { id, parentId } = props;
        const role = await fetchRoleById({
            id
        });
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleUpdateById.initiate({
            id,
            updateRole: {
                ...role,
                parentId
            }
        }));
        handleNotification(t('roles.save-item.success'), error);
        return data;
    }
    async function getRoleCollection() {
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__rspack_import_4.api.endpoints.roleGetCollection.initiate());
        return data;
    }
    return {
        openRole,
        closeRole,
        getRoleTree,
        addNewRole,
        addNewFolder,
        removeRole,
        cloneRole,
        removeFolder,
        updateRoleById,
        moveRoleById,
        getRoleCollection,
        searchRoleByText,
        activeId,
        getAllIds
    };
};
_s(useRoleHelper, "nM29EGtGB+H1MDX3gpFOaONo55Y=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_components_notification_useNotification__rspack_import_2.useNotification,
        _sdk_app__rspack_import_0.useAppDispatch,
        _sdk_app__rspack_import_0.useAppSelector,
        _sdk_app__rspack_import_0.useAppSelector
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/roles-slice.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  changeRole: () => (changeRole),
  roleAdapter: () => (roleAdapter),
  roleClosed: () => (roleClosed),
  roleFetched: () => (roleFetched),
  roleOpened: () => (roleOpened),
  roleRemoved: () => (roleRemoved),
  roleUpdated: () => (roleUpdated),
  selectRoleById: () => (selectRoleById),
  slice: () => (slice)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
/* import */ var _reduxjs_toolkit__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit");
/* import */ var _reduxjs_toolkit__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__rspack_import_1);
/* import */ var _sdk_app__rspack_import_2 = __webpack_require__("./js/src/sdk/app/index.ts");
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


const roleAdapter = (0,_reduxjs_toolkit__rspack_import_1.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__rspack_import_1.createSlice)({
    name: 'role',
    initialState: roleAdapter.getInitialState({
        modified: false,
        activeId: undefined,
        changedIds: []
    }),
    reducers: {
        roleOpened: (state, action)=>{
            state.activeId = action.payload;
        },
        roleClosed: (state, action)=>{
            const { id, allIds } = action.payload;
            roleAdapter.removeOne(state, id);
            if (state.activeId === id) {
                const targetIndex = allIds.findIndex((itemId)=>Number.parseInt(itemId, 10) === id);
                const prevTab = allIds[targetIndex - 1];
                const nextTab = allIds[targetIndex + 1];
                const prevTabId = !(0,lodash__rspack_import_0.isUndefined)(prevTab) ? Number.parseInt(prevTab, 10) : undefined;
                const nextTabId = !(0,lodash__rspack_import_0.isUndefined)(nextTab) ? Number.parseInt(nextTab, 10) : undefined;
                state.activeId = !(0,lodash__rspack_import_0.isUndefined)(prevTab) ? prevTabId : nextTabId;
            }
        },
        roleFetched: (state, action)=>{
            if (action.payload.id !== undefined) {
                roleAdapter.upsertOne(state, {
                    ...action.payload,
                    modified: false
                });
            }
        },
        roleRemoved: (state, action)=>{
            roleAdapter.removeOne(state, action.payload);
        },
        changeRole: (state, action)=>{
            const id = action.payload.id;
            if (!state.changedIds.includes(id)) {
                state.changedIds.push(id);
            }
            const update = {
                id: action.payload.id,
                changes: {
                    ...action.payload.changes,
                    modified: true
                }
            };
            roleAdapter.updateOne(state, update);
        },
        roleUpdated: (state, action)=>{
            state.changedIds = state.changedIds.filter((role)=>role !== action.payload);
            const update = {
                id: action.payload,
                changes: {
                    modified: false
                }
            };
            roleAdapter.updateOne(state, update);
        }
    }
});
(0,_sdk_app__rspack_import_2.injectSliceWithState)(slice);
const { roleRemoved, roleOpened, roleClosed, roleFetched, roleUpdated, changeRole } = slice.actions;
const { selectById: selectRoleById } = roleAdapter.getSelectors((state)=>state.role);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_user_hooks_use-global-user-management-context_ts-js_src_core_modules_user-252f41.js.map