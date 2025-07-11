/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useRef } from 'react'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil, isEmpty } from 'lodash'
import { toCssDimension } from '@sdk/utils'
import { Icon } from '@Pimcore/components/icon/icon'
import cn from 'classnames'
import { useSnippetEditableStyles } from './snippet-editable.styles'

export interface SnippetValue {
  id?: number
  path?: string
}

export interface SnippetEditableConfig {
  reload?: boolean
  width?: number
  height?: number
  defaultHeight?: number
  class?: string
  documentTypes?: string[]
}

export interface SnippetEditableProps {
  value?: SnippetValue
  config?: SnippetEditableConfig
  onChange: (value: SnippetValue | null) => void
  className?: string
}

export const SnippetEditable = ({
  value,
  config,
  onChange,
  className
}: SnippetEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useSnippetEditableStyles()
  const { getStateClasses } = useDroppable()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const defaultHeight = config?.defaultHeight ?? 100
  const hasContent = !isNil(value?.path) && !isEmpty(value?.path)

  // Fetch snippet content when value changes
  useEffect(() => {
    if (hasContent && !isNil(value?.path)) {
      setIsLoading(true)

      // Fetch snippet HTML content
      fetch(value.path, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(async response => await response.text())
        .then(html => {
          setHtmlContent(html)
          setIsLoading(false)
        })
        .catch(() => {
          setHtmlContent('')
          setIsLoading(false)
        })
    } else {
      setHtmlContent('')
      setIsLoading(false)
    }
  }, [value?.path, hasContent])

  const handleEmpty = (): void => {
    onChange(null)
    setHtmlContent('')
  }

  const handleOpen = (): void => {
    if (!isNil(value?.id)) {
      // TODO: Use proper document opening mechanism when available
      window.open(`/admin/document/snippet/get?id=${value.id}`, '_blank')
    }
  }

  const handleSearch = (): void => {
    // TODO: Implement search functionality when element selector is available
    console.log('Search for snippet')
  }

  const contextMenuItems: MenuProps['items'] = []

  if (hasContent) {
    contextMenuItems.push(
      {
        key: 'empty',
        label: t('empty'),
        icon: <Icon value="delete" />,
        onClick: handleEmpty
      },
      {
        key: 'open',
        label: t('open'),
        icon: <Icon value="open" />,
        onClick: handleOpen
      }
    )
  }

  contextMenuItems.push({
    key: 'search',
    label: t('search'),
    icon: <Icon value="search" />,
    onClick: handleSearch
  })

  const containerStyle: React.CSSProperties = {
    width: toCssDimension(config?.width),
    height: hasContent ? 'auto' : toCssDimension(config?.height ?? defaultHeight),
    minHeight: hasContent ? 'auto' : toCssDimension(40)
  }

  const contentClasses = cn(
    styles.snippetContent,
    {
      'snippet-editable-empty': !hasContent,
      'snippet-editable-loading': isLoading
    },
    ...getStateClasses(),
    className
  )

  return (
    <Dropdown
      disabled={ contextMenuItems.length === 0 }
      menu={ { items: contextMenuItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ contentClasses }
        ref={ contentRef }
        style={ containerStyle }
      >
        {isLoading && (
          <div className={ styles.loading }>
            <Icon value="loading" />
            <span>{t('loading')}</span>
          </div>
        )}

        {!hasContent && !isLoading && (
          <div className={ styles.dropZone }>
            <Icon value="snippet" />
            <span>{t('drag-snippet-here')}</span>
          </div>
        )}

        {hasContent && !isLoading && (
          <div
            className={ styles.renderedContent }
            dangerouslySetInnerHTML={ { __html: htmlContent } }
          />
        )}
      </div>
    </Dropdown>
  )
}
