/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Alert, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil, isEmpty, omit, isString, isArray } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { EditableHtmlDropContainer } from '@Pimcore/components/editable-html-drop-container'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { useDocumentRenderletRenderQuery } from '@Pimcore/modules/document/document-api-slice.gen'
import { type RenderletValue, type RenderletEditableConfig } from './renderlet-editable'
import { useParams } from 'react-router-dom'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface RenderletContentProps {
  value?: RenderletValue
  config?: RenderletEditableConfig
  onChange: (value: RenderletValue | null) => void
  className?: string
}

export const RenderletContent = ({
  value,
  config,
  onChange,
  className
}: RenderletContentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const { id } = useParams<{ id: string }>()
  const documentId = !isNil(id) ? parseInt(id) : undefined

  const defaultHeight = 100

  const shouldFetchRenderlet = !isNil(value?.id) &&
    (!isNil(config?.controller) && config.controller.length > 0)
  const apiParams = shouldFetchRenderlet
    ? {
        id: value.id!,
        type: value.type!,
        controller: config.controller,
        parentDocumentId: documentId ?? undefined,
        template: config?.template,
        ...omit(config, ['controller', 'template', 'className', 'height', 'width', 'reload', 'title', 'type', 'class'])
      }
    : undefined

  const { data: renderletBlob, isLoading, error } = useDocumentRenderletRenderQuery(
    apiParams!,
    {
      skip: !shouldFetchRenderlet
    }
  )

  const hasContent = !isLoading && shouldFetchRenderlet

  const { openElement } = useElementHelper()

  const isFetchError = !isNil(error) && 'status' in error
  const actualError = isFetchError && error.status !== 'PARSING_ERROR' ? error : undefined
  const htmlFromError = isFetchError && error.status === 'PARSING_ERROR' && 'data' in error && !isNil(error.data)
    ? String(error.data)
    : null

  const getErrorMessage = (): string | undefined => {
    if (isNil(actualError)) return undefined

    try {
      if (typeof actualError === 'object' && 'data' in actualError && !isNil(actualError.data)) {
        const errorData = isString(actualError.data) ? JSON.parse(actualError.data) : actualError.data
        if (!isNil(errorData) && typeof errorData === 'object' && 'message' in errorData) {
          return errorData.message
        }
      }
    } catch (e) {
      // Fallback to no description
    }

    return undefined
  }

  React.useEffect(() => {
    if (!isNil(renderletBlob)) {
      renderletBlob.text().then(html => {
        setHtmlContent(html)
      }).catch(() => {
        setHtmlContent('')
      })
    } else if (!isNil(htmlFromError) && htmlFromError.length > 0) {
      setHtmlContent(htmlFromError)
    } else {
      setHtmlContent('')
    }
  }, [renderletBlob, htmlFromError])

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: isNil(config?.type) || config.type === 'asset',
      document: isNil(config?.type) || config.type === 'document',
      object: isNil(config?.type) || config.type === 'object'
    },
    config: {
      objects: !isNil(config?.className)
        ? {
            allowedTypes: isArray(config.className) ? config.className : [config.className]
          }
        : undefined
    },
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        const selectedElement = event.items[0]
        const newValue: RenderletValue = {
          id: selectedElement.data.id,
          type: selectedElement.elementType,
          subtype: selectedElement.data.type ?? selectedElement.data.subtype
        }
        onChange(newValue)
      }
    }
  })

  const handleEmpty = (): void => {
    onChange(null)
    setHtmlContent('')
  }

  const handleOpen = (): void => {
    if (!isNil(value?.id) && !isNil(value?.type)) {
      const elementType: ElementType = value.type === 'object' ? 'data-object' : value.type as ElementType
      void openElement({
        id: value.id,
        type: elementType
      })
    }
  }

  const handleSearch = (): void => {
    openElementSelector()
  }

  const handleLocateInTree = (): void => {
    if (!isNil(value?.id) && !isNil(value?.type)) {
      try {
        const studioApi = getPimcoreStudioApi()
        const elementType: ElementType = value.type === 'object' ? 'data-object' : value.type as ElementType
        studioApi.element.locateInTree(value.id, elementType)
      } catch (error) {
        // Silently fail if element cannot be located
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

  const getDropZoneText = (): string => {
    if (!isNil(config?.type)) {
      switch (config.type) {
        case 'document':
          return t('drag-document-here')
        case 'asset':
          return t('drag-asset-here')
        case 'object':
          return t('drag-object-here')
        default:
          return t('drag-element-here')
      }
    }
    return t('drag-element-here')
  }

  const errorContent = !isNil(actualError)
    ? (
      <Alert
        description={ getErrorMessage() }
        message={ t('error-loading-renderlet') }
        showIcon
        style={ { width: '100%' } }
        type="error"
      />
      )
    : undefined

  const renderedContent = htmlContent.length > 0
    ? <SanitizeHtml html={ htmlContent } />
    : undefined

  return (
    <EditableHtmlDropContainer
      className={ className }
      contextMenuItems={ contextMenuItems }
      defaultHeight={ defaultHeight }
      dropZoneText={ getDropZoneText() }
      error={ errorContent }
      hasContent={ hasContent }
      height={ config?.height }
      isLoading={ isLoading }
      renderedContent={ renderedContent }
      width={ config?.width }
    />
  )
}
