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
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { isEmpty, isNull, isUndefined } from 'lodash'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import {
  createElementSelectorAreas,
  createElementSelectorConfig,
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

  const { t } = useTranslation()
  const { styles } = useStyles()

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

        {props.additionalButtons?.(value)}
      </Flex>
    </Flex>
  )
}
