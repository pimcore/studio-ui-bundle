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
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { type SnippetValue, type SnippetEditableConfig } from './snippet-editable'

export interface SnippetContentProps {
  value?: SnippetValue
  config?: SnippetEditableConfig
  onChange: (value: SnippetValue | null) => void
  className?: string
}

export const SnippetContent = ({
  value,
  config,
  onChange,
  className
}: SnippetContentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useSnippetEditableStyles()
  const { getStateClasses } = useDroppable()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const defaultHeight = config?.defaultHeight ?? 100
  const hasContent = !isNil(value?.path) && !isEmpty(value?.path)

  const { openElement } = useElementHelper()

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: false,
      document: true,
      object: false
    },
    config: {
      documents: {
        allowedTypes: config?.documentTypes ?? ['snippet']
      }
    },
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        const selectedDocument = event.items[0]
        const newValue: SnippetValue = {
          id: selectedDocument.data.id,
          path: selectedDocument.data.fullpath
        }
        onChange(newValue)
      }
    }
  })

  useEffect(() => {
    if (hasContent && !isNil(value?.path)) {
      setIsLoading(true)

      const url = new URL(value.path, window.location.origin)
      url.searchParams.set('pimcore_admin', 'true')
      url.searchParams.set('_dc', Date.now().toString())

      fetch(url.toString(), {
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
      void openElement({
        id: value.id,
        type: 'document'
      })
    }
  }

  const handleSearch = (): void => {
    openElementSelector()
  }

  const handleLocateInTree = (): void => {
    if (!isNil(value?.id)) {
      try {
        const studioApi = getPimcoreStudioApi()
        studioApi.element.locateInTree(value.id, 'document')
      } catch (error) {
        console.warn('Could not locate snippet in tree:', error)
      }
    }
  }

  const contextMenuItems: MenuProps['items'] = []

  if (hasContent) {
    contextMenuItems.push(
      {
        key: 'empty',
        label: t('empty'),
        icon: <Icon value="trash" />,
        onClick: handleEmpty
      },
      {
        key: 'open',
        label: t('open'),
        icon: <Icon value="open-folder" />,
        onClick: handleOpen
      },
      {
        key: 'locate-in-tree',
        label: t('element.locate-in-tree'),
        icon: <Icon value="target" />,
        onClick: handleLocateInTree
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
      'snippet-content--empty': !hasContent && !isLoading,
      'snippet-content--loading': isLoading,
      'snippet-content--has-content': hasContent && !isLoading
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
