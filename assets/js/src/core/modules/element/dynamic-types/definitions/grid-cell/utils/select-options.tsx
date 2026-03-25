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
import { isUndefined } from 'lodash'
import React from 'react'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { isHtmlContent, stripTags } from '@Pimcore/utils/html'

export type SelectOptionType = DefaultOptionType & {
  displayValue?: string | boolean
}

export interface SelectOptionsConfig {
  options?: string[] | SelectOptionType[]
  useOptionsHook?: (fieldName: string) => { isLoading: boolean, options: SelectOptionType[] } | undefined
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

export const resolveOptions = (
  config: SelectOptionsConfig,
  fieldName: string
): { isLoading: boolean, options: SelectOptionType[] } => {
  const emptyResult = { isLoading: false, options: [] }

  if (!isUndefined(config.useOptionsHook)) {
    const useHookResult = config.useOptionsHook(fieldName)
    if (isUndefined(useHookResult)) {
      return emptyResult
    }
    return useHookResult
  }

  if (isUndefined(config.options)) {
    return emptyResult
  }

  return {
    isLoading: false,
    options: config.options.map((value: string | object) => (
      typeof value === 'object' ? value : { label: value, value }
    ))
  }
}
