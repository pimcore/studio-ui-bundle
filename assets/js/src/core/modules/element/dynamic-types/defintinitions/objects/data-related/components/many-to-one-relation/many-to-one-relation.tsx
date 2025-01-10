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
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { type ElementType } from 'types/element-type.d'
import { PathTarget } from './path-target'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { allElementTypes } from '@Pimcore/modules/element/utils/element-type'
import {
  type IRelationAllowedTypesDataComponent, isAllowedSubType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import { toCssDimension } from '@Pimcore/utils/css'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import _ from 'lodash'

export interface ManyToOneRelationValue {
  type: ElementType
  id: number
  fullPath?: string
  subType?: string
}

export interface ManyToOneRelationClassDefinitionProps {
  assetInlineDownloadAllowed?: boolean
  allowToClearRelation?: boolean
  width?: number | string | null
}

export interface ManyToOneRelationProps extends IRelationAllowedTypesDataComponent, ManyToOneRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToOneRelationValue | null
  onChange?: (value: ManyToOneRelationValue | null) => void
  onOpenElement?: () => void
}

export const ManyToOneRelation = (props: ManyToOneRelationProps): React.JSX.Element => {
  const [value, setValue] = React.useState<ManyToOneRelationValue | null>(props.value ?? null)
  const { openElement } = useElementHelper()
  const { t } = useTranslation()
  const { download } = useDownload()

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const clickOpenElement = (): void => {
    if (value !== null) {
      openElement(value).catch(() => {})
      props.onOpenElement?.()
    }
  }

  return (
    <Flex
      gap="extra-small"
      style={ {
        maxWidth: toCssDimension(props.width)
      } }
    >
      <div style={ { flex: 1 } }>
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && allElementTypes.includes(info.type) }
          isValidData={ (info: DragAndDropInfo) => {
            if (info.data === null) {
              return false
            }
            const subType: string = info.data.className !== undefined && !_.isEmpty(info.data.className) ? info.data.className : info.data.type
            return isAllowedSubType(info.type as ElementType, subType, props)
          }
          }
          onDrop={ (info: DragAndDropInfo) => {
            setValue({
              type: info.type as ElementType,
              id: info.data.id as number,
              fullPath: `${info.data.path}${info.data.filename ?? info.data.key}`,
              subType: info.data.type
            })
          } }
        >
          <PathTarget
            disabled={ props.disabled }
            value={ value }
          />
        </Droppable>
      </div>

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

      { props.assetInlineDownloadAllowed === true && (

        <Tooltip
          key="download"
          title={ t('download') }
        >
          <IconButton
            disabled={ props.value?.type !== 'asset' || props.value?.subType === 'folder' }
            icon={ { value: 'download' } }
            onClick={ () => {
              download(
                String(props.value?.id)
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
    </Flex>
  )
}
