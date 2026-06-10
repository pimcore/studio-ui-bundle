/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultOptionType } from 'antd/es/select'
import { isNil, isUndefined } from 'lodash'
import React from 'react'
import i18n from '@Pimcore/app/i18n'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { isHtmlContent, stripTags } from '@Pimcore/utils/html'

export type SelectOptionType = DefaultOptionType & {
  displayValue?: string | boolean
}

export interface SelectOptionData {
  key: string
  value: string | number
}

export interface ConvertedSelectOption {
  label: React.ReactNode
  title?: string
  value: string | number | null
}

// Coerce a value to string for option matching: provider values may be numbers while stored values
// are strings, and strict comparison would otherwise miss the label.
export const stringifyOptionValue = (value: unknown): string | undefined =>
  isNil(value) ? undefined : String(value)

export interface SelectOptionsHookContext {
  objectId?: number
  enabled?: boolean
}

export interface SelectOptionsConfig {
  options?: string[] | SelectOptionType[]
  useOptionsHook?: (
    fieldName: string,
    context?: SelectOptionsHookContext
  ) => { isLoading: boolean, options: SelectOptionType[] } | undefined
}

/**
 * Converts a raw option key (which may contain HTML markup) into a React label
 * and — only when the key contains HTML — a plain-text title for search filtering.
 * When the label is a plain string, title is omitted so optionFilterProp="label"
 * works without needing a redundant duplicate field.
 */
export const renderSelectOptionLabel = (key: string): { label: React.ReactNode, title?: string } => {
  if (isHtmlContent(key)) {
    return {
      label: (
        <SanitizeHtml
          html={ key }
          tag="span"
        />
      ),
      title: stripTags(key)
    }
  }

  return { label: key }
}

// Maps backend { key, value } options to antd options: translates the key and coerces the value to
// string so it matches the string-stored value. Used by the editor select renderers.
export const convertSelectOptions = (
  options: SelectOptionData[] | null | undefined
): ConvertedSelectOption[] | undefined => {
  if (isNil(options)) {
    return undefined
  }

  return options.map(option => ({
    ...renderSelectOptionLabel(i18n.t(option.key)),
    value: String(option.value)
  }))
}

// Normalizes the selected value(s) to string to match the string-coerced options — a scalar for a
// single select, an array for a multiselect. Built on stringifyOptionValue.
export const normalizeSelectValue = (value: unknown): string | string[] | undefined =>
  Array.isArray(value) ? value.map(String) : stringifyOptionValue(value)

export const resolveOptions = (
  config: SelectOptionsConfig,
  fieldName: string,
  context?: SelectOptionsHookContext
): { isLoading: boolean, options: SelectOptionType[] } => {
  // Use the hook result while loading or once it has options; otherwise fall back to the static
  // options (e.g. the seeded snapshot for a dynamic provider in display mode).
  if (!isUndefined(config.useOptionsHook)) {
    const result = config.useOptionsHook(fieldName, context)
    if (result !== undefined && (result.isLoading || result.options.length > 0)) {
      return result
    }
  }

  const options = isUndefined(config.options)
    ? []
    : config.options.map((value: string | object) => (typeof value === 'object' ? value : { label: value, value }))

  return { isLoading: false, options }
}
