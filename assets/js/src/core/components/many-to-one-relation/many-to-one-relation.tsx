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
import { Tooltip } from 'antd'
import { isEmpty, isNil, isNull, isUndefined } from 'lodash'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ModalUploadButton } from '@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import {
  createElementSelectorAreas,
  createElementSelectorConfig,
  isAllowedSubType,
  type IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { toCssDimension } from '@Pimcore/utils/css'
import { useControlledState } from '@Pimcore/utils/hooks/use-controlled-state'
import { ManyToOneRelationInput } from './many-to-one-relation-input'
import { useStyles } from './many-to-one-relation.styles'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

export type ManyToOneRelationValueType = ManyToOneRelationValue | PathTextInputValue | null

export interface ManyToOneRelationValue {
  type: string
  id: number
  fullPath?: string
  subtype?: string
  isPublished?: boolean | null
  textInput?: false
}

export interface PathTextInputValue {
  textInput: true
  fullPath: string
}

export interface ManyToOneRelationClassDefinitionProps {
  assetInlineDownloadAllowed?: boolean
  /**
   * Renders an upload button that creates a new asset and assigns it as the
   * relation. Opt-in, because most hosts of this component are pickers for
   * existing elements rather than asset fields.
   */
  assetInlineUploadAllowed?: boolean
  /** Folder the inline upload puts the new asset into. Defaults to the asset root. */
  assetUploadPath?: string | null
  allowToClearRelation?: boolean
  allowPathTextInput?: boolean
  showOpenForTextInput?: boolean
  width?: number | string | null
  inherited?: boolean
  readOnly?: boolean
  vertical?: boolean
  hideOpenButton?: boolean
}

export interface ManyToOneRelationProps extends IRelationAllowedTypesDataComponent, ManyToOneRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToOneRelationValueType
  onChange?: (value: ManyToOneRelationValueType) => void
  onOpenElement?: () => void
  className?: string
  combinedFieldName?: string
  pathFormatterClass?: string
  additionalButtons?: (value: ManyToOneRelationValueType) => React.ReactNode
}

export const ManyToOneRelation = (props: ManyToOneRelationProps): React.JSX.Element => {
  const { value, handleChange: handleValueChange } = useControlledState<ManyToOneRelationValueType>(
    props.value ?? null,
    props.onChange
  )

  const { openElement, mapToElementType } = useElementHelper()
  const { download } = useDownload()
  const fieldWidth = useFieldWidth()
  const alertModal = useAlertModal()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleAssetUpload = useCallback(async (assets: Asset[]): Promise<void> => {
    if (isEmpty(assets)) {
      return
    }

    const [asset] = assets

    if (!isAllowedSubType('asset', asset.type, props)) {
      alertModal.warn({ content: t('asset-upload-type-not-allowed') })
      return
    }

    handleValueChange({
      type: 'asset',
      subtype: asset.type ?? undefined,
      id: asset.id,
      fullPath: asset.fullPath ?? undefined
    })
  }, [props, handleValueChange, alertModal, t])

  const clickOpenElement = (): void => {
    if (value !== null) {
      if (value.textInput === true) {
        window.open(value.fullPath, '_blank', 'noopener,noreferrer')
      } else {
        const elementType = mapToElementType(value.type, true)
        if (!isUndefined(elementType)) {
          openElement({ type: elementType, id: value.id }).catch(() => { })
        }
      }

      props.onOpenElement?.()
    }
  }

  const isEnabled = props.disabled !== true && props.readOnly !== true

  const inlineUploadEnabled = props.assetInlineUploadAllowed === true && props.assetsAllowed === true && isEnabled

  const handleUploadSuccess = async (assets: Asset[]): Promise<void> => {
    const asset = assets[0]

    if (isNil(asset)) {
      return
    }

    // The asset already exists at this point - the server created it and decided its
    // type. Assigning it anyway would put a value into the relation that neither the
    // element selector nor drag and drop would have accepted.
    if (!isAllowedSubType('asset', asset.type ?? '', props)) {
      alertModal.warn({ content: t('many-to-one-relation.upload.subtype-not-allowed') })
      return
    }

    handleValueChange({
      type: 'asset',
      id: asset.id,
      subtype: asset.type ?? undefined,
      fullPath: asset.fullPath ?? ''
    })
  }

  const { hideOpenButton, ...inputProps } = props

  return (
    <Flex
      className={ cn(styles.container, props.className) }
      gap="extra-small"
      style={ {
        maxWidth: toCssDimension(props.width, fieldWidth.large)
      } }
      vertical={ props.vertical }
    >
      <ManyToOneRelationInput
        { ...inputProps }
        onChange={ handleValueChange }
        value={ value }
      />
      <Flex
        gap="extra-small"
        justify={ props.vertical === true ? 'start' : undefined }
      >
        {props.hideOpenButton !== true && (props.allowPathTextInput !== true || props.showOpenForTextInput === true) && !isNull(value) && (
          <Tooltip
            key="open"
            title={ t('open') }
          >
            <IconButton
              icon={ { value: 'open-folder' } }
              onClick={ clickOpenElement }
              style={ { flex: '0 0 auto' } }
              type="default"
            />
          </Tooltip>
        )}

        {props.assetInlineDownloadAllowed === true && value?.textInput !== true && (
          <Tooltip
            key="download"
            title={ t('download') }
          >
            <IconButton
              disabled={ value?.type !== 'asset' || value?.subtype === 'folder' }
              icon={ { value: 'download' } }
              onClick={ () => {
                download(
                  String(value?.id)
                )
              } }
              type="default"
            />
          </Tooltip>
        )}

        {props.allowToClearRelation === true && !(isNull(value) || props.disabled === true) && (
          <Tooltip
            key="empty"
            title={ t('empty') }
          >
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ () => {
                handleValueChange(null)
              } }
              type="default"
            />
          </Tooltip>
        )}

        {isEnabled && (
          <ElementSelectorButton
            elementSelectorConfig={ {
              selectionType: SelectionType.Single,
              areas: createElementSelectorAreas(props),
              config: createElementSelectorConfig(props),
              onFinish: (event) => {
                if (!isEmpty(event.items)) {
                  handleValueChange({
                    type: mapToLegacyElementType(event.items[0].elementType),
                    subtype: event.items[0].data.type,
                    id: event.items[0].data.id,
                    fullPath: event.items[0].data.fullpath
                  })
                }
              }
            } }
            type="default"
          />
        )}

        {inlineUploadEnabled && (
          <ModalUploadButton
            key="upload"
            maxItems={ 1 }
            multiple={ false }
            onSuccess={ handleUploadSuccess }
            targetFolderPath={ props.assetUploadPath ?? undefined }
          />
        )}

        {props.additionalButtons?.(value)}
      </Flex>
    </Flex>
  )
}
