/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject, useRef, useEffect } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './element-cell.styles'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { type ElementInfo } from './element-cell'
import { isPlainObject, isUndefined } from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ElementReference } from '@Pimcore/modules/element/element-helper'
import { useEditMode, Input } from '@sdk/components'
import { type InputRef } from 'antd'

export interface ElementCellContentProps extends DefaultCellProps {
  dropDisabled?: boolean
  clearDisabled?: boolean
  getElementInfo?: (props: DefaultCellProps) => ElementInfo
}

export const ElementCellContent = forwardRef(function ElementCellContent (props: ElementCellContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyle()
  const propertyData = props.row.original
  const { getStateClasses } = useDroppable()
  const { fireOnUpdateCellDataEvent, isInEditMode, disableEditMode } = useEditMode(props)
  const inputRef = useRef<InputRef>(null)

  const expectsStringValue = Boolean(props.column.columnDef.meta?.config?.expectsStringValue)
  const allowTextInput = Boolean(props.column.columnDef.meta?.config?.allowTextInput)

  useEffect(() => {
    if (isInEditMode && allowTextInput) {
      inputRef.current?.focus()
    }
  }, [isInEditMode, allowTextInput])

  const saveTextValue = (): void => {
    const inputValue = inputRef.current?.input?.value ?? ''
    fireOnUpdateCellDataEvent(inputValue)
    disableEditMode()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      saveTextValue()
    }
  }

  const onBlur = (): void => {
    saveTextValue()
  }

  const getElementInfo = props.getElementInfo ?? ((): ElementInfo => {
    // @todo check hardcoded type
    let defaultType: ElementType = 'data-object'
    const allowedTypes = props.column.columnDef.meta?.config?.allowedTypes
    if (allowedTypes !== undefined) {
      defaultType = allowedTypes[0] as ElementType
    }

    const includesTypeInformation = propertyData.data !== null && (propertyData.data?.type !== undefined)
    const includesPathInformation = propertyData.data !== null && (propertyData.data?.fullPath !== undefined || propertyData.data?.path !== undefined)
    const hasFullPath = includesPathInformation && propertyData.data?.fullPath !== undefined

    const value = props.getValue()

    if (isPlainObject(value) && includesTypeInformation) {
      const element: ElementReference = value as ElementReference
      const elementType = mapToElementType(String(element.type))
      return {
        elementType: elementType ?? undefined,
        id: element.id,
        fullPath: element.fullPath,
        published: element.isPublished ?? undefined
      }
    }

    let fullPath = value

    if (includesPathInformation && hasFullPath) {
      fullPath = propertyData.data.fullPath
    } else if (includesPathInformation) {
      fullPath = `${propertyData.data.path}${propertyData.data.filename ?? propertyData.data.key}`
    }

    return {
      fullPath: String(fullPath ?? ''),
      elementType: defaultType,
      id: propertyData.data?.id ?? propertyData.id
    }
  })

  const elementInfo = getElementInfo(props)
  const showClearIcon = props.clearDisabled !== true && (!isUndefined(elementInfo.fullPath) && elementInfo.fullPath !== '')

  return (
    <div
      className={ [styles.link, ...getStateClasses()].join(' ') }
      ref={ ref }
    >
      {isInEditMode && allowTextInput
        ? (
          <Input
            defaultValue={
            expectsStringValue
              ? (props.getValue() as string || '')
              : (elementInfo.fullPath || '')
          }
            onBlur={ onBlur }
            onKeyDown={ onKeyDown }
            ref={ inputRef }
          />
          )
        : (
          <>
            {elementInfo.fullPath !== false && (
            <ElementTag
              closeIcon={ showClearIcon }
              disabled={ elementInfo.disabled }
              elementType={ elementInfo.elementType }
              id={ allowTextInput ? undefined : elementInfo.id }
              onClose={ () => { fireOnUpdateCellDataEvent(expectsStringValue ? '' : null) } }
              path={ elementInfo.fullPath }
              published={ elementInfo.published }
            />
            )}

            <div>
              { props.dropDisabled !== true && (
              <Icon
                className={ styles.elementOptionsIcon }
                value={ 'drop-target' }
              />
              )}
            </div>
          </>
          )}
    </div>
  )
})
