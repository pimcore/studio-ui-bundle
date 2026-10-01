/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PredefinedProperty } from '../properties-api-slice.gen'

export interface PredefinedPropertyOption {
  label: string
  value: string
}

/**
 * Builds the options of the predefined properties select. The name of a predefined property
 * may be a translation key, so it is translated before it is used as label and sort criterion.
 */
export const buildPredefinedPropertyOptions = (
  items: PredefinedProperty[] | undefined,
  translate: (key: string) => string
): PredefinedPropertyOption[] | undefined => items
  ?.map((item) => ({
    label: translate(item.name),
    value: item.id
  }))
  .sort((a, b) => a.label.localeCompare(b.label))
