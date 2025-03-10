/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { isEmpty } from 'lodash'
import cn from 'classnames'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'
import {
  createElementSelectorAreas,
  dndIsValidData,
  type IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { toCssDimension } from '@Pimcore/utils/css'
import { PathTarget } from './path-target'

export type ManyToOneRelationValueType = ManyToOneRelationValue | PathTextInputValue | null

export interface ManyToOneRelationValue {
  type: ElementType
  id: number
  fullPath?: string
  subtype?: string
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
  width?: number | string | null
  inherited?: boolean
}

export interface ManyToOneRelationProps extends IRelationAllowedTypesDataComponent, ManyToOneRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToOneRelationValueType
  onChange?: (value: ManyToOneRelationValueType) => void
  onOpenElement?: () => void
  className?: string
}

export const ManyToOneRelation = (props: ManyToOneRelationProps): React.JSX.Element => {
  const [value, setValue] = React.useState<ManyToOneRelationValueType>(props.value ?? null)
  const { openElement } = useElementHelper()
  const { t } = useTranslation()
  const { download } = useDownload()
  const fieldWidth = useFieldWidth()

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  useEffect(() => {
    setValue(props.value ?? null)
  }, [props.value])

  const clickOpenElement = (): void => {
    if (value !== null && value.textInput !== true) {
      openElement(value).catch(() => {})
      props.onOpenElement?.()
    }
  }

  return (
    <Flex
      className={ cn(props.className) }
      gap="extra-small"
      style={ {
        maxWidth: toCssDimension(props.width, fieldWidth.large)
      } }
    >
      <div style={ { flex: 1 } }>
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && isValidElementType(info.type) }
          isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, props) }
          onDrop={ (info: DragAndDropInfo) => {
            setValue({
              type: info.type as ElementType,
              id: info.data.id as number,
              fullPath: `${info.data.path}${info.data.filename ?? info.data.key}`,
              subtype: info.data.type
            })
          } }
        >
          <PathTarget
            allowPathTextInput={ props.allowPathTextInput }
            disabled={ props.disabled }
            inherited={ props.inherited }
            onChange={ setValue }
            value={ value }
          />
        </Droppable>
      </div>
      { props.allowPathTextInput !== true && (
        <Tooltip
          key="open"
          title={ t('open') }
        >
          <IconButton
            disabled={ value === null }
            icon={ { value: 'open-folder' } }
            onClick={ clickOpenElement }
            style={ { flex: '0 0 auto' } }
            type="default"
          />
        </Tooltip>
      ) }

      { props.assetInlineDownloadAllowed === true && value?.textInput !== true && (

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
      ) }
      { props.allowToClearRelation === true && (

        <Tooltip
          key="empty"
          title={ t('empty') }
        >
          <IconButton
            disabled={ value === null || props.disabled === true }
            icon={ { value: 'trash' } }
            onClick={ () => {
              setValue(null)
            } }
            type="default"
          />
        </Tooltip>
      ) }

      { props.disabled !== true && (
        <ElementSelectorButton
          elementSelectorConfig={ {
            selectionType: SelectionType.Single,
            areas: createElementSelectorAreas(props),
            config: {
              assets: {
                allowedTypes: props.allowedAssetTypes
              },
              documents: {
                allowedTypes: props.allowedAssetTypes
              },
              objects: {
                allowedTypes: props.allowedClasses
              }
            },
            onFinish: (event) => {
              if (!isEmpty(event.items)) {
                setValue({
                  type: event.items[0].elementType,
                  subtype: event.items[0].data.type,
                  id: event.items[0].data.id,
                  fullPath: event.items[0].data.fullpath
                })
              }
            }
          } }
          type="default"
        />
      ) }
    </Flex>
  )
}
