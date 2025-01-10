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

export interface HrefValue {
  type: ElementType
  id: number
  fullPath?: string
}

export interface HrefProps {
  disabled?: boolean
  value?: HrefValue | null
  onChange?: (value: HrefValue | null) => void
  onOpenElement?: () => void
  allowedElementTypes?: ElementType[]
  allowedElementSubTypes?: string[]
}

export const Href = (props: HrefProps): React.JSX.Element => {
  const [value, setValue] = React.useState<HrefValue | null>(props.value ?? null)
  const { openElement } = useElementHelper()

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const clickOpenElement = (): void => {
    if (value !== null) {
      openElement(value).catch(() => {})
      props.onOpenElement?.()
    }
  }

  const allowedElementTypes = props.allowedElementTypes ?? allElementTypes
  const allowedElementSubTypes = props.allowedElementSubTypes ?? []

  return (
    <Flex
      gap="extra-small"
    >
      <div style={ { flex: 1 } }>
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && allElementTypes.includes(info.type) }
          isValidData={ (info: DragAndDropInfo) => allowedElementTypes.includes(info.type) && (allowedElementSubTypes.length === 0 || allowedElementSubTypes.includes(info.data.type as string)) }
          onDrop={ (info: DragAndDropInfo) => {
            setValue({
              type: info.type as ElementType,
              id: info.data.id as number,
              fullPath: `${info.data.path}${info.data.filename ?? info.data.key}`
            })
          } }
        >
          <PathTarget
            disabled={ props.disabled }
            value={ value }
          />
        </Droppable>
      </div>

      <IconButton
        disabled={ value === null }
        icon={ { value: 'open-folder' } }
        onClick={ clickOpenElement }
        style={ { flex: '0 0 auto' } }
        type="default"
      />
    </Flex>
  )
}
