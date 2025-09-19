/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isArray } from 'lodash'
import { type SelectOptionType } from '@sdk/modules/element'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

export type DocumentEditableStoreEntry = [string | number | null, string] | string | number

/**
 * Transforms document editable store entries into SelectOptionType array with sanitized HTML labels
 */
export const transformDocumentEditableStoreToOptions = (
  store?: DocumentEditableStoreEntry[]
): SelectOptionType[] => {
  return store?.map((item: DocumentEditableStoreEntry) => {
    if (isArray(item)) {
      const [value, label] = item

      return {
        value: String(value),
        label: <SanitizeHtml html={ label } />
      }
    } else {
      const stringValue = String(item)

      return {
        value: stringValue,
        label: <SanitizeHtml html={ stringValue } />
      }
    }
  }) ?? []
}
