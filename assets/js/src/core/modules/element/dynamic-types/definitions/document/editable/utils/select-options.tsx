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
 * Transforms document editable store entries into SelectOptionType array.
 *
 * The `label` is returned as a plain string so that antd's built-in search
 * (driven by `optionFilterProp="label"`) can match against it. HTML sanitization
 * happens at render time via `renderSanitizedLabel`, used by the consuming
 * components in their `optionRender` / `labelRender` props.
 */
export const transformDocumentEditableStoreToOptions = (
  store?: DocumentEditableStoreEntry[]
): SelectOptionType[] => {
  return store?.map((item: DocumentEditableStoreEntry) => {
    if (isArray(item)) {
      const [value, label] = item

      return {
        value: String(value),
        label: String(label)
      }
    } else {
      const stringValue = String(item)

      return {
        value: stringValue,
        label: stringValue
      }
    }
  }) ?? []
}

/**
 * Renders a label with HTML sanitization. Intended for use in antd's
 * `labelRender` / `optionRender` props, so that sanitization happens at the
 * moment the label becomes DOM — while `label` itself stays a plain string
 * so antd's built-in filter keeps working.
 */
export const renderSanitizedLabel = (label: React.ReactNode): React.JSX.Element => (
  <SanitizeHtml html={ typeof label === 'string' ? label : String(label ?? '') } />
)
