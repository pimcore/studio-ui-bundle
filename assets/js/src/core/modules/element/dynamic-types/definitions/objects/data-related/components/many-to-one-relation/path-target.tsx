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

import React, { forwardRef, type MutableRefObject, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@Pimcore/components/input/input'
import {
  type ManyToOneRelationValueType
} from './many-to-one-relation'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { isNil } from 'lodash'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { Flex } from 'antd'

export interface PathTargetProps {
  value: ManyToOneRelationValueType
  disabled?: boolean
  allowPathTextInput?: boolean
  onChange?: (value: ManyToOneRelationValueType) => void
  inherited?: boolean
}

export const PathTarget = forwardRef(function PathTarget (
  props: PathTargetProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { t } = useTranslation()
  const [value, setValue] = React.useState<ManyToOneRelationValueType>(props.value ?? null)
  const { getStateClasses } = useDroppable()
  const { mapToElementType } = useElementHelper()

  useEffect(() => {
    setValue(props.value ?? null)
  }, [props.value])

  const getDisplayText: () => string | undefined = () => {
    if (value === null) {
      return undefined
    }

    if (value.textInput === true) {
      return value.fullPath ?? ''
    }

    return value.fullPath ?? String(value.id)
  }

  const displayText = getDisplayText()

  const hasElementTag = value?.textInput !== true && !isNil(value?.fullPath)
  const showElementTagPrefix = props.allowPathTextInput !== true && hasElementTag
  const showElementTag = props.allowPathTextInput === true && hasElementTag

  return (
    <div
      ref={ ref }

      style={ { flexGrow: 1 } }
    >
      { showElementTag
        ? (
          <Flex
            align="center"
            className={ cn(...getStateClasses()) }
          >

            <Input
              disabled={ props.disabled }
              inherited={ props.inherited }
              prefix={

                <ElementTag
                  disabled={ props.disabled === true || props.inherited === true }
                  elementType={ mapToElementType(value.type) }
                  id={ value.id }
                  onClose={ () => {
                    setValue(null)
                    props.onChange?.(null)
                  } }
                  path={ String(value?.fullPath) }
                  published={ value.isPublished ?? undefined }
                />
              }
              readOnly
            />

          </Flex>
          )
        : (
          <Input
            className={ cn(...getStateClasses()) }
            disabled={ props.disabled }
            inherited={ props.inherited }
            onChange={ (e) => {
              const newValue: { textInput: true, fullPath: string } = {
                textInput: true,
                fullPath: e.currentTarget.value
              }

              setValue(newValue)
              props.onChange?.(newValue)
            } }
            placeholder={ showElementTagPrefix ? undefined : t(props.allowPathTextInput === true ? 'many-to-one-relation.drop-placeholder-text-input' : 'many-to-one-relation.drop-placeholder') }
            prefix={ showElementTagPrefix
              ? (
                <ElementTag
                  disabled={ props.disabled === true || props.inherited === true }
                  elementType={ props.allowPathTextInput === true ? undefined : mapToElementType(value.type) }
                  id={ props.allowPathTextInput === true ? undefined : value.id }
                  path={ String(value?.fullPath) }
                  published={ value.isPublished ?? undefined }
                />
                )
              : undefined }
            readOnly={ props.allowPathTextInput !== true }
            value={ showElementTagPrefix ? undefined : displayText }
          />
          )}
    </div>
  )
})
