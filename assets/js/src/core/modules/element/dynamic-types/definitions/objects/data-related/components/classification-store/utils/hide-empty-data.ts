/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isObject } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface HideEmptyDataKey {
  id: number
  definition?: object | null
}

export interface GetHiddenKeyIdsProps {
  keys: HideEmptyDataKey[]
  /** Values of a single group for one localization, keyed by classification store key id. */
  groupValue: unknown
}

const isMandatory = (key: HideEmptyDataKey): boolean => {
  return (key.definition as { mandatory?: boolean } | undefined | null)?.mandatory === true
}

/**
 * Collects the ids of the keys that carry no data and can therefore be hidden when
 * the field definition has "hide empty data" enabled.
 *
 * Mandatory keys are never hidden: an empty mandatory key would otherwise block
 * saving without the user being able to see which field is missing.
 */
export const getHiddenKeyIds = ({ keys, groupValue }: GetHiddenKeyIdsProps): Set<number> => {
  const values: Record<string, unknown> = isObject(groupValue) ? groupValue as Record<string, unknown> : {}

  return new Set(
    keys
      .filter((key) => !isMandatory(key) && isEmptyValue(values[String(key.id)]))
      .map((key) => key.id)
  )
}
