/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface ClassificationStoreFieldOptionConfig {
  classificationStore?: boolean
  storeId?: number
}

export interface ClassificationStoreFieldOption {
  key: unknown
  config?: ClassificationStoreFieldOptionConfig | null
}

/**
 * Returns the classification store id for the given field key when that field is a classification
 * store field (flagged by the backend with `config.classificationStore`), otherwise `undefined`.
 */
export const resolveClassificationStoreStoreId = (
  fields: readonly ClassificationStoreFieldOption[] | undefined,
  fieldKey: string
): number | undefined => {
  const option = fields?.find((field) => String(field.key) === fieldKey)
  const config = option?.config

  if (config?.classificationStore === true && typeof config.storeId === 'number') {
    return config.storeId
  }

  return undefined
}
