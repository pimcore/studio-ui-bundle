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

export const OBJECT_CONTEXT_PREFIX = 'object'
export const ASSET_CONTEXT_PREFIX = 'asset'
export const DOCUMENT_CONTEXT_PREFIX = 'document'

export const getBaseDataObjectContext = (objectData: any): string[] => {
  const context = [OBJECT_CONTEXT_PREFIX]

  if (!isEmptyValue(objectData?.className)) {
    context.push(`${OBJECT_CONTEXT_PREFIX}_${objectData?.className.toLowerCase()}`)
  } else if (objectData?.type === 'folder') {
    context.push(`${OBJECT_CONTEXT_PREFIX}_folder`)
  }

  return context
}

export const getBaseAssetContext = (assetData: any): string[] => {
  const context = [ASSET_CONTEXT_PREFIX]

  if (!isEmptyValue(assetData?.type)) {
    context.push(`${ASSET_CONTEXT_PREFIX}_${assetData?.type.toLowerCase()}`)
  }

  return context
}

export const getBaseDocumentContext = (documentData: any): string[] => {
  const context = [DOCUMENT_CONTEXT_PREFIX]

  if (!isEmptyValue(documentData?.type)) {
    context.push(`${DOCUMENT_CONTEXT_PREFIX}_${documentData?.type.toLowerCase()}`)
  }

  return context
}
