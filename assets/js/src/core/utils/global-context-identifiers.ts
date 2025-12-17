/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type GlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'
import { type GlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { type GlobalDocumentContext } from '@Pimcore/modules/document/hooks/use-global-document-context'

export const OBJECT_CONTEXT_IDENTIFIER_PREFIX = 'object'
export const ASSET_CONTEXT_IDENTIFIER_PREFIX = 'asset'
export const DOCUMENT_CONTEXT_IDENTIFIER_PREFIX = 'document'

export const getBaseDataObjectContextIdentifiers = (objectData: any, isGrid: boolean): GlobalDataObjectContext['config']['contextIdentifiers'] => {
  const tags = [
    OBJECT_CONTEXT_IDENTIFIER_PREFIX,
    ...(isGrid ? [`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_grid`] : [])
  ]
  const isFolderType = objectData?.type === 'folder'

  if (!isEmptyValue(objectData?.className)) {
    tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_${objectData?.className.toLowerCase()}`)
  } else if (isFolderType) {
    tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_folder`)
  }

  return {
    type: OBJECT_CONTEXT_IDENTIFIER_PREFIX,
    subType: isFolderType ? 'folder' : OBJECT_CONTEXT_IDENTIFIER_PREFIX,
    tags
  }
}

export const getBaseAssetContextIdentifiers = (assetData: any, isGrid: boolean): GlobalAssetContext['config']['contextIdentifiers'] => {
  const tags = [
    ASSET_CONTEXT_IDENTIFIER_PREFIX,
    ...(isGrid ? [`${ASSET_CONTEXT_IDENTIFIER_PREFIX}_grid`] : [])
  ]

  if (!isEmptyValue(assetData?.type)) {
    tags.push(`${ASSET_CONTEXT_IDENTIFIER_PREFIX}_${assetData?.type.toLowerCase()}`)
  }

  return {
    type: ASSET_CONTEXT_IDENTIFIER_PREFIX,
    subType: !isEmptyValue(assetData?.type) ? assetData?.type?.toLowerCase() : ASSET_CONTEXT_IDENTIFIER_PREFIX,
    tags
  }
}

export const getBaseDocumentContextIdentifiers = (documentData: any): GlobalDocumentContext['config']['contextIdentifiers'] => {
  const tags = [DOCUMENT_CONTEXT_IDENTIFIER_PREFIX]

  if (!isEmptyValue(documentData?.type)) {
    tags.push(`${DOCUMENT_CONTEXT_IDENTIFIER_PREFIX}_${documentData?.type.toLowerCase()}`)
  }

  return {
    type: DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
    subType: !isEmptyValue(documentData?.type) ? documentData?.type?.toLowerCase() : DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
    tags
  }
}
