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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_user_hooks_use-global-user-context_ts-js_src_core_modules_user_hooks_use--ffd266"], {
"./js/src/core/modules/user/hooks/use-global-user-context.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useGlobalUserContext: () => (useGlobalUserContext)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/global-context/global-context-slice.ts");
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
    const disptach = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const context = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.selectContextByType)(state, 'user'));
    const setContext = function(config) {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.addGlobalContext)({
            type: 'user',
            config
        }));
    };
    const removeContext = function() {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.removeGlobalContext)('user'));
    };
    return {
        context,
        setContext,
        removeContext
    };
};

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
"./js/src/core/modules/user/hooks/use-user-draft.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserDraft: () => (useUserDraft)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/user-slice.tsx");
/* ESM import */var _Pimcore_modules_auth_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice.gen.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();





const useUserDraft = (id)=>{
    _s();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const user = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.selectUserById)(state, id));
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const [isError, setIsError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    async function fetchUser() {
        const { data, isError: isUserGetByIdError, error } = await dispatch(_Pimcore_modules_auth_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.userGetById.initiate({
            id
        }));
        if (isUserGetByIdError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.ApiError(error));
        }
        if (data !== undefined) {
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {};
    }
    function reloadUser() {
        removeUserFromState();
        getUser();
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
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
            dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.userFetched)(data));
        }).catch(()=>{
            setIsError(true);
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    function removeUserFromState() {
        if (user === undefined) return;
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.userRemoved)(user.id));
    }
    function changeUserInState(changes) {
        if (user === undefined) return;
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.changeUser)({
            id: user.id,
            changes
        }));
    }
    function updateUserKeyBinding(name, code) {
        const updatedKeyBindings = user.keyBindings.map((keyBinding)=>{
            if (keyBinding.action === name) {
                keyBinding = code;
                return keyBinding;
            }
            return keyBinding;
        });
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.changeUser)({
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
        updateUserKeyBinding
    };
};
_s(useUserDraft, "fxDG1eJQbvTQoem4ZMmbYPCu9ic=", false, function() {
    return [
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector
    ];
});

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
"./js/src/core/modules/user/hooks/use-user-helper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserHelper: () => (useUserHelper)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/user-slice.tsx");
/* ESM import */var _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/notification/useNotification/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();






const useUserHelper = ()=>{
    _s();
    var _s1 = $RefreshSig$();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const [notificationApi] = (0,_Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__.useNotification)();
    const handleNotification = (successMessage, error)=>{
        if (error !== undefined) {
            notificationApi.open({
                type: 'error',
                message: error.data.message
            });
        } else {
            notificationApi.open({
                type: 'success',
                message: successMessage
            });
        }
    };
    function openUser(id) {
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userOpened)(id));
    }
    function closeUser(id) {
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userClosed)(id));
    }
    async function fetchUserById(props) {
        const { id } = props;
        const { data } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userGetById.initiate({
            id
        }));
        return data;
    }
    async function fetchUserList() {
        const { data } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userGetCollection.initiate());
        return data;
    }
    async function searchUserByText(query) {
        const { data } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.pimcoreStudioApiUserSearch.initiate({
            searchQuery: query
        }));
        return data;
    }
    async function getDefaultKeyBindings() {
        const { data } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userDefaultKeyBindings.initiate());
        return data;
    }
    async function resetUserKeyBindings(id) {
        const data = await getDefaultKeyBindings();
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.changeUser)({
            id,
            changes: {
                keyBindings: data.items
            }
        }));
        return data;
    }
    async function getUserTree(props) {
        const { parentId } = props;
        const { data } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userGetTree.initiate({
            parentId
        }, {
            forceRefetch: true
        }));
        return data;
    }
    async function addNewUser(props) {
        const { parentId, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userCreate.initiate({
            body: {
                parentId,
                name
            }
        }));
        handleNotification(t('user-management.add-user.success'), error);
        return data;
    }
    async function addNewFolder(props) {
        const { parentId, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userFolderCreate.initiate({
            body: {
                parentId,
                name
            }
        }));
        handleNotification(t('user-management.add-folder.success'), error);
        return data;
    }
    async function removeUser(props) {
        const { id } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userDeleteById.initiate({
            id
        }));
        handleNotification(t('user-management.remove-user.success'), error);
        return data;
    }
    async function removeFolder(props) {
        const { id } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userFolderDeleteById.initiate({
            id
        }));
        handleNotification(t('user-management.remove-folder.success'), error);
        return data;
    }
    async function cloneUser(props) {
        const { id, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userCloneById.initiate({
            id,
            body: {
                name
            }
        }));
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userOpened)(data.id));
        handleNotification(t('user-management.clone-user.success'), error);
        return data;
    }
    async function updateUserById(props) {
        const { id, user } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userUpdateById.initiate({
            id,
            updateUser: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                active: user.active,
                admin: user.admin,
                classes: user.classes,
                twoFactorAuthenticationEnabled: user.twoFactorAuthenticationEnabled,
                language: user.language,
                welcomeScreen: user.welcomeScreen,
                memorizeTabs: user.memorizeTabs,
                allowDirtyClose: user.allowDirtyClose,
                closeWarning: user.closeWarning,
                permissions: user.permissions,
                parentId: user.parentId ?? 0,
                roles: user.roles,
                contentLanguages: user.contentLanguages,
                websiteTranslationLanguagesEdit: user.websiteTranslationLanguagesEdit,
                websiteTranslationLanguagesView: user.websiteTranslationLanguagesView,
                keyBindings: user.keyBindings,
                assetWorkspaces: user.assetWorkspaces,
                dataObjectWorkspaces: user.dataObjectWorkspaces,
                documentWorkspaces: user.documentWorkspaces,
                perspectives: user.perspectives
            }
        }));
        handleNotification(t('user-management.save-user.success'), error);
        dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userUpdated)(data));
        return data;
    }
    async function moveUserById(props) {
        const { id, parentId } = props;
        const user = await fetchUserById({
            id
        });
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userUpdateById.initiate({
            id,
            updateUser: {
                ...user,
                parentId
            }
        }));
        handleNotification(t('user-management.save-user.success'), error);
        return data;
    }
    async function uploadUserAvatar(props) {
        const { data, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userUploadImage.initiate({
            id: props.id,
            body: {
                userImage: props.file
            }
        }));
        handleNotification(t('user-management.upload-image.success'), error);
        return data;
    }
    async function fetchUserImageById(props) {
        const { id } = props;
        let data;
        await fetch(`/pimcore-studio/api/user/image/${id}`).then(async (response)=>await response.blob()).then((imageBlob)=>{
            data = URL.createObjectURL(imageBlob);
            dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userImageLoaded)({
                id,
                image: data
            }));
        }).catch((error)=>{
            const apiError = error instanceof Error ? new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(error) : new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.GeneralError('An error occurred while loading the image');
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(apiError);
        });
        return {
            data
        };
    }
    async function fetchUserAvailablePermissions() {
        const { data, isError: isFetchUserAvailablePermissionsError, error } = await dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.userGetAvailablePermissions.initiate());
        if (data !== undefined) {
            dispatch((0,_Pimcore_modules_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.userAvailablePermissionsFetched)(data));
            return data;
        }
        if (isFetchUserAvailablePermissionsError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(error));
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {};
    }
    const getAvailablePermissions = ()=>{
        _s1();
        let availablePermissions = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>state.user.availablePermissions);
        if (availablePermissions.length === 0) {
            fetchUserAvailablePermissions().then((data)=>{
                availablePermissions = data.items;
            }).catch((error)=>{
                console.error(error);
            });
        }
        return availablePermissions;
    };
    _s1(getAvailablePermissions, "bL2G9r/bvMpZLVL7shZTYEb9VRU=", false, function() {
        return [
            _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector
        ];
    });
    const activeId = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>state.user.activeId);
    const getAllIds = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>state.user.ids);
    return {
        removeTrackedChanges () {},
        setModifiedCells (type, modifiedCells) {},
        openUser,
        closeUser,
        getUserTree,
        addNewUser,
        addNewFolder,
        removeUser,
        cloneUser,
        removeFolder,
        updateUserById,
        moveUserById,
        fetchUserList,
        searchUserByText,
        resetUserKeyBindings,
        getDefaultKeyBindings,
        uploadUserAvatar,
        fetchUserImageById,
        getAvailablePermissions,
        activeId,
        getAllIds
    };
};
_s(useUserHelper, "rlVeEi0SceaF1UJw5fopN5og/kQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__.useNotification,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector
    ];
});

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
"./js/src/core/modules/user/hooks/use-user-trackable-changes.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTrackableChangesDraft: () => (useTrackableChangesDraft),
  useTrackableChangesReducers: () => (useTrackableChangesReducers)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const useTrackableChangesReducers = (entityAdapter)=>{
    const resetChanges = (state, action)=>{
        modifyDraft(state, action.payload, (draft)=>{
            draft.changes = {};
            draft.modifiedCells = {};
            draft.modified = false;
            return draft;
        });
    };
    const setModifiedCells = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.modifiedCells = {
                ...draft.modifiedCells,
                [action.payload.type]: action.payload.modifiedCells
            };
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    return {
        resetChanges,
        setModifiedCells
    };
};
const useTrackableChangesDraft = (id, resetChangesAction, setModifiedCellsAction)=>{
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        removeTrackedChanges: ()=>{
            dispatch(resetChangesAction(id));
        },
        setModifiedCells: (type, modifiedCells)=>{
            dispatch(setModifiedCellsAction({
                id,
                type,
                modifiedCells
            }));
        }
    };
};

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
"./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleDraft: () => (useRoleDraft)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice.gen.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();




const useRoleDraft = (id)=>{
    _s();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const role = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.selectRoleById)(state, id));
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const [isError, setIsError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    async function fetchRole() {
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.roleGetById.initiate({
            id
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
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
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
            dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleFetched)(data));
        }).catch(()=>{
            setIsError(true);
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    function removeRoleFromState() {
        if (role === undefined) return;
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleRemoved)(role.id));
    }
    function changeRoleInState(changes) {
        if (role === undefined) return;
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.changeRole)({
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
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector
    ];
});

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
"./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleHelper: () => (useRoleHelper)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* ESM import */var _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/notification/useNotification/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();





const useRoleHelper = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const [notificationApi] = (0,_Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_2__.useNotification)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
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
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleOpened)(id));
    }
    function closeRole(id) {
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleClosed)(id));
    }
    async function fetchRoleById(props) {
        const { id } = props;
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleGetById.initiate({
            id
        }));
        return data;
    }
    async function getRoleTree(props) {
        const { parentId } = props;
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleGetTree.initiate({
            parentId
        }));
        return data;
    }
    async function addNewRole(props) {
        const { parentId, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleCreate.initiate({
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
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleFolderCreate.initiate({
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
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleDeleteById.initiate({
            id
        }));
        handleNotification(t('roles.remove-item.success'), error);
        return data;
    }
    async function removeFolder(props) {
        const { id } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleFolderDeleteById.initiate({
            id
        }));
        handleNotification(t('roles.remove-folder.success'), error);
        return data;
    }
    async function cloneRole(props) {
        const { id, name } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleCloneById.initiate({
            id,
            body: {
                name
            }
        }));
        handleNotification(t('roles.clone-item.success'), error);
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleOpened)(data.id));
        return data;
    }
    async function updateRoleById(props) {
        const { id, item } = props;
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleUpdateById.initiate({
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
        dispatch((0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_1__.roleUpdated)(id));
        return data;
    }
    async function moveRoleById(props) {
        const { id, parentId } = props;
        const role = await fetchRoleById({
            id
        });
        const { data, error } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleUpdateById.initiate({
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
        const { data } = await dispatch(_Pimcore_modules_user_roles_roles_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.roleGetCollection.initiate());
        return data;
    }
    const activeId = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>state.role.activeId);
    const getAllIds = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>state.role.ids);
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
        activeId,
        getAllIds
    };
};
_s(useRoleHelper, "cJ6l3rWtOFyFA/pHh+ZoYrWVTCo=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_2__.useNotification,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppSelector
    ];
});

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
"./js/src/core/modules/user/roles/roles-slice.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
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

const roleAdapter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
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
            state.activeId = undefined;
            roleAdapter.removeOne(state, action.payload);
        },
        roleFetched: (state, action)=>{
            if (action.payload.id !== undefined) {
                roleAdapter.upsertOne(state, action);
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
(0,_sdk_app__WEBPACK_IMPORTED_MODULE_1__.injectSliceWithState)(slice);
const { roleRemoved, roleOpened, roleClosed, roleFetched, roleUpdated, changeRole } = slice.actions;
const { selectById: selectRoleById } = roleAdapter.getSelectors((state)=>state.role);

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
"./js/src/core/modules/user/user-slice.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  changeUser: () => (changeUser),
  selectUserById: () => (selectUserById),
  slice: () => (slice),
  userAdapter: () => (userAdapter),
  userAvailablePermissionsFetched: () => (userAvailablePermissionsFetched),
  userClosed: () => (userClosed),
  userFetched: () => (userFetched),
  userImageLoaded: () => (userImageLoaded),
  userOpened: () => (userOpened),
  userRemoved: () => (userRemoved),
  userUpdated: () => (userUpdated)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_trackable_changes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-trackable-changes.ts");
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


const userAdapter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'user',
    initialState: userAdapter.getInitialState({
        modified: false,
        activeId: undefined,
        changedIds: [],
        availablePermissions: [],
        changes: {},
        modifiedCells: {}
    }),
    reducers: {
        userOpened: (state, action)=>{
            state.activeId = action.payload;
        },
        userClosed: (state, action)=>{
            state.activeId = undefined;
            userAdapter.removeOne(state, action.payload);
        },
        userFetched: (state, action)=>{
            if (action.payload.id !== undefined) {
                userAdapter.upsertOne(state, action);
            }
        },
        userRemoved: (state, action)=>{
            userAdapter.removeOne(state, action.payload);
        },
        changeUser: (state, action)=>{
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
            userAdapter.updateOne(state, update);
        },
        userImageLoaded: (state, action)=>{
            const update = {
                id: action.payload.id,
                changes: {
                    image: action.payload.image
                }
            };
            userAdapter.updateOne(state, update);
        },
        userUpdated: (state, action)=>{
            userAdapter.upsertOne(state, {
                ...action
            });
        },
        userAvailablePermissionsFetched: (state, action)=>{
            state.availablePermissions = action.payload.items;
        },
        ...(0,_Pimcore_modules_user_hooks_use_user_trackable_changes__WEBPACK_IMPORTED_MODULE_2__.useTrackableChangesReducers)(userAdapter)
    }
});
(0,_sdk_app__WEBPACK_IMPORTED_MODULE_1__.injectSliceWithState)(slice);
const { userRemoved, userOpened, userClosed, userFetched, userAvailablePermissionsFetched, changeUser, userImageLoaded, userUpdated } = slice.actions;
const { selectById: selectUserById } = userAdapter.getSelectors((state)=>state.user);

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
//# sourceMappingURL=js_src_core_modules_user_hooks_use-global-user-context_ts-js_src_core_modules_user_hooks_use--ffd266.js.map