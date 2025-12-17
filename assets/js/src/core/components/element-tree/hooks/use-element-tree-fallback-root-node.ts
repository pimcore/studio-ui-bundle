/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from '@sdk/app'
import { type DataTransformerReturnType } from '../types/node-api-hook'
import { type AssetPermissions } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObjectPermissions } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type DocumentPermissions } from '@Pimcore/modules/document/document-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type ElementPermissions } from '@sdk/modules/element'

export const useElementTreeFallbackRootNode = (): { createFallbackRootNode: (id: number, elementType: ElementType) => DataTransformerReturnType } => {
  const { t } = useTranslation()

  const getPermissionsByElementType = (elementType: ElementType): ElementPermissions => {
    if (elementType === 'document') {
      const documentPermissions: DocumentPermissions = {
        list: false,
        view: false,
        publish: false,
        unpublish: false,
        delete: false,
        rename: false,
        create: false,
        settings: false,
        versions: false,
        properties: false,
        save: false
      }
      return documentPermissions
    }

    if (elementType === 'asset') {
      const assetPermissions: AssetPermissions = {
        list: false,
        view: false,
        publish: false,
        delete: false,
        rename: false,
        create: false,
        settings: false,
        versions: false,
        properties: false
      }
      return assetPermissions
    }

    if (elementType === 'data-object') {
      const dataObjectPermissions: DataObjectPermissions = {
        list: false,
        view: false,
        publish: false,
        unpublish: false,
        delete: false,
        rename: false,
        create: false,
        settings: false,
        versions: false,
        properties: false,
        save: false,
        localizedEdit: null,
        localizedView: null
      }
      return dataObjectPermissions
    }

    throw new Error(`Unsupported element type: ${String(elementType)}`)
  }

  const getMetaDataKeyByElementType = (elementType: ElementType): string => {
    if (elementType === 'document') {
      return 'document'
    }

    if (elementType === 'asset') {
      return 'asset'
    }

    if (elementType === 'data-object') {
      return 'dataObject'
    }

    throw new Error(`Unsupported element type: ${String(elementType)}`)
  }

  const createFallbackRootNode = (id: number, elementType: ElementType): DataTransformerReturnType => {
    const permissions = getPermissionsByElementType(elementType)
    const metaDataKey = getMetaDataKeyByElementType(elementType)

    return {
      nodes: [{
        id: String(id),
        internalKey: String(id),
        label: id === 1 ? 'home' : t('home'),
        icon: { type: 'name', value: 'home-root-folder' },
        type: 'folder',
        hasChildren: false,
        parentId: undefined,
        fullPath: '/',
        elementType,
        permissions,
        locked: null,
        isLocked: false,
        metaData: {
          [metaDataKey]: undefined
        }
      }],
      total: 1
    }
  }

  return { createFallbackRootNode }
}
