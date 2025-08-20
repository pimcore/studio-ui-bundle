/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { isNil } from 'lodash'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { PdfEditablePreview } from './pdf-editable-preview'
import { Icon } from '@Pimcore/components/icon/icon'
import { DEFAULT_HEIGHT, MIN_WIDTH } from '../../helpers/responsive-asset-preview/image-dimensions'
import { locateElementInTree } from '@Pimcore/modules/element/utils/tree-utils'
import { useAssetDimensions } from '../../helpers/responsive-asset-preview/hooks/use-asset-dimensions'

export interface PdfEditableValue {
  id?: number
}

export interface PdfEditableConfig {
  width?: number
  height?: number
  uploadPath?: string
}

interface DocumentPdfEditableProps {
  value?: PdfEditableValue
  config?: PdfEditableConfig
  onChange?: (value: PdfEditableValue) => void
  disabled?: boolean
  containerRef?: React.RefObject<HTMLDivElement>
}

export const DocumentPdfEditable = (props: DocumentPdfEditableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const pdfValue = props.value
  const width = props.config?.width
  const height = props.config?.height

  const { lastDimensions, handleResize: handlePdfResize } = useAssetDimensions()

  const needsContainerWidth = isNil(width) && isNil(height)
  const { width: containerWidth } = useElementResize(needsContainerWidth ? props.containerRef ?? { current: null } : { current: null })

  const { triggerUpload } = useUploadModal({})
  const { openElement } = useElementHelper()

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: true,
      object: false,
      document: false
    },
    config: {
      assets: {
        allowedTypes: ['document']
      }
    },
    onFinish: (event) => {
      if (event.items.length > 0) {
        handleReplacePdf(event.items[0].data.id)
      }
    }
  })

  const handleReplacePdf = (assetId: number): void => {
    const newValue: PdfEditableValue = { id: assetId }
    props.onChange?.(newValue)
  }

  const handleEmptyValue = (): void => {
    props.onChange?.({})
  }

  const handleLocateInTree = (): void => {
    locateElementInTree('asset', pdfValue?.id)
  }

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: props.config?.uploadPath,
      accept: 'application/pdf',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          handleReplacePdf(Number(assets[0].id))
        }
      }
    })
  }, [props.config?.uploadPath, triggerUpload, handleReplacePdf])

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    handleReplacePdf(Number(asset.id))
  }

  const dropdownItems: DropdownProps['menu']['items'] = []

  if (!isNil(pdfValue?.id)) {
    dropdownItems.push(
      {
        key: 'open',
        icon: <Icon value="open-folder" />,
        label: t('open'),
        disabled: props.disabled,
        onClick: () => {
          if (!isNil(pdfValue?.id)) {
            void openElement({
              id: pdfValue.id,
              type: 'asset'
            })
          }
        }
      },
      {
        key: 'empty',
        icon: <Icon value="trash" />,
        label: t('empty'),
        disabled: props.disabled,
        onClick: handleEmptyValue
      }
    )
  }

  dropdownItems.push(
    {
      key: 'locate-in-tree',
      icon: <Icon value="target" />,
      label: t('element.locate-in-tree'),
      disabled: props.disabled === true || isNil(pdfValue?.id),
      onClick: handleLocateInTree
    },
    {
      key: 'search',
      icon: <Icon value="search" />,
      label: t('search'),
      disabled: props.disabled,
      onClick: openElementSelector
    },
    {
      key: 'upload',
      icon: <Icon value="upload-cloud" />,
      label: t('upload'),
      disabled: props.disabled === true,
      onClick: handleUpload
    }
  )

  const renderDroppableContent = useCallback((children: React.ReactNode) => {
    // Determine the shape based on whether a PDF is selected
    const droppableShape = !isNil(pdfValue?.id) ? 'angular' : 'round'

    // Don't enable file system drag and drop if disabled
    if (props.disabled === true) {
      return <>{children}</>
    }

    return (
      <InlineUpload
        assetType="document"
        disabled={ props.disabled }
        fullWidth={ isNil(lastDimensions?.width ?? width) }
        onSuccess={ handleFileSystemUpload }
        targetFolderPath={ props.config?.uploadPath }
      >
        <Droppable
          isValidContext={ () => props.disabled !== true }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'document' }
          onDrop={ (info: DragAndDropInfo) => {
            handleReplacePdf(info.data.id as number)
          } }
          shape={ droppableShape }
          variant="outline"
        >
          {children}
        </Droppable>
      </InlineUpload>
    )
  }, [props.config?.uploadPath, props.disabled, handleFileSystemUpload, handleReplacePdf, pdfValue?.id])

  return renderDroppableContent(
    !isNil(pdfValue?.id)
      ? (
        <PdfEditablePreview
          assetId={ pdfValue.id }
          containerWidth={ Math.max(containerWidth, MIN_WIDTH) }
          dropdownItems={ dropdownItems }
          height={ height }
          key={ pdfValue.id }
          lastImageDimensions={ lastDimensions }
          onResize={ handlePdfResize }
          width={ width }
        />
        )
      : (
        <AssetTarget
          dndIcon
          height={ lastDimensions?.height ?? height ?? DEFAULT_HEIGHT }
          onResize={ handlePdfResize }
          onSearch={ openElementSelector }
          onUpload={ handleUpload }
          title={ t('pdf-editable.dnd-target') }
          width={ lastDimensions?.width ?? width ?? '100%' }
        />
        )
  )
}
