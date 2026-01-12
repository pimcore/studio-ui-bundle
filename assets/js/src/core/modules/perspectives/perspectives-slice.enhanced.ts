/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './perspectives-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [
    tagNames.PERSPECTIVES,
    tagNames.PERSPECTIVE_DETAIL,
    tagNames.WIDGETS,
    tagNames.WIDGET_DETAIL
  ],
  endpoints: {
    perspectiveGetConfigCollection: {
      providesTags: (result): Tag[] => {
        return providingTags.PERSPECTIVES()
      }
    },
    perspectiveGetConfigById: {
      providesTags: (result, error, args): Tag[] => {
        return providingTags.PERSPECTIVE_DETAIL(args.perspectiveId)
      }
    },
    perspectiveUpdateConfigById: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveDelete: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveCreate: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveWidgetGetConfigCollection: {
      providesTags: (result, error, args): Tag[] => providingTags.WIDGETS()
    },
    perspectiveWidgetGetConfigById: {
      providesTags: (result, error, args): Tag[] => {
        return providingTags.WIDGET_DETAIL(args.widgetId, args.widgetType)
      }
    },
    perspectiveWidgetUpdateConfigById: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
    },
    perspectiveWidgetCreate: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
    },
    perspectiveWidgetDelete: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
    }
  }
})

export type * from './perspectives-slice.gen'

export type SaveDocumentContextPermissions = {
    /** Add */
    add: boolean;
    /** Add E-Mail */
    addEmail: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Add Hardlink */
    addHardlink: boolean;
    /** Add Headless Document */
    addHeadlessDocument: boolean;
    /** Add Link */
    addLink: boolean;
    /** Add Newsletter */
    addNewsletter: boolean;
    /** Add Print Page */
    addPrintPage: boolean;
    /** Add Snippet */
    addSnippet: boolean;
    /** Convert */
    convert: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Edit Site */
    editSite: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Open */
    open: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Remove Site */
    removeSite: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
    /** Use As Site */
    useAsSite: boolean;
};
export type DocumentContextPermissions = SaveDocumentContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};

export type SaveDataObjectContextPermissions = {
    /** Add */
    add: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Change Children SortBy */
    changeChildrenSortBy: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
};
export type DataObjectContextPermissions = SaveDataObjectContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};

export type SaveAssetContextPermissions = {
    /** Hide Add Menu */
    hideAdd: boolean;
    /** Add Upload */
    addUpload: boolean;
    /** Upload New Version */
    uploadNewVersion: boolean;
    /** Add Upload Zip */
    addUploadZip: boolean;
    /** Download */
    download: boolean;
    /** Download Zip */
    downloadZip: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock And Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** SearchAndMove */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock And Propagate */
    unlockAndPropagate: boolean;
};
export type AssetContextPermissions = SaveAssetContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};

export const {
  usePerspectiveCreateMutation,
  usePerspectiveGetConfigCollectionQuery,
  usePerspectiveGetConfigByIdQuery,
  usePerspectiveUpdateConfigByIdMutation,
  usePerspectiveDeleteMutation,
  usePerspectiveWidgetCreateMutation,
  usePerspectiveWidgetGetConfigCollectionQuery,
  usePerspectiveWidgetGetConfigByIdQuery,
  usePerspectiveWidgetUpdateConfigByIdMutation,
  usePerspectiveWidgetDeleteMutation,
  usePerspectiveWidgetGetTypeCollectionQuery
} = api

export { api }
