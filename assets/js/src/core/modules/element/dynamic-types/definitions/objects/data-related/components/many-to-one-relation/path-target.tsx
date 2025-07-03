/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject, useEffect, useState } from 'react'
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
import { useDataObjectHelper, type IFormatPathItem } from '@Pimcore/modules/data-object/hooks/use-data-object-helper'
import { useDataObject } from '@Pimcore/modules/data-object/hooks/use-data-object'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { LoadingOutlined } from '@ant-design/icons'

export interface PathTargetProps {
  value: ManyToOneRelationValueType
  disabled?: boolean
  allowPathTextInput?: boolean
  onChange?: (value: ManyToOneRelationValueType) => void
  inherited?: boolean
  virtualFieldName?: string
  pathFormatterClass?: string
}

export const PathTarget = forwardRef(function PathTarget (
  props: PathTargetProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { t } = useTranslation()
  const [value, setValue] = React.useState<ManyToOneRelationValueType>(props.value ?? null)
  const { getStateClasses } = useDroppable()
  const { mapToElementType } = useElementHelper()
  const { formatPath } = useDataObjectHelper()
  const { id: dataObjectId } = useDataObject()
  const [displayPath, setDisplayPath] = useState(String(value?.fullPath ?? ''))
  const [isLoading, setIsLoading] = useState(false)

  function mapNewValue (value: IFormatPathItem[], data: { items: Array<{ objectReference: string, formatedPath: string }> }): IFormatPathItem[] {
    return value.map((item) => ({
      ...item,
      fullPath: data.items.find(i => i.objectReference === `object_${item.id}`)?.formatedPath ?? item.fullPath
    }))
  }

  useEffect(() => {
    setValue(props.value ?? null)

    if (props.pathFormatterClass != null && props.pathFormatterClass !== '' && props.value !== null && props.virtualFieldName !== undefined && dataObjectId != null) {
      setIsLoading(true)

      formatPath([props.value as IFormatPathItem], props.virtualFieldName, dataObjectId).then((data) => {
        if (data === undefined) {
          return
        }

        const newValue = mapNewValue([props.value as IFormatPathItem], data)
        setDisplayPath(String(newValue[0]?.fullPath))
        setIsLoading(false)
      }).catch(error => { console.error(error) })
    }
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

  let inputPrefix: React.ReactNode
  if (props.pathFormatterClass != null && props.pathFormatterClass !== '') {
    inputPrefix = isLoading ? <LoadingOutlined /> : <SanitizeHtml html={ displayPath ?? '' } />
  } else if (showElementTagPrefix) {
    inputPrefix = (
      <ElementTag
        disabled={ props.disabled === true || props.inherited === true }
        elementType={ props.allowPathTextInput === true ? undefined : mapToElementType(value.type) }
        id={ props.allowPathTextInput === true ? undefined : value.id }
        path={ displayPath }
        published={ value.isPublished ?? undefined }
      />
    )
  }

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
              prefix={ props.pathFormatterClass != null && props.pathFormatterClass !== ''
                ? (
                  <SanitizeHtml html={ displayPath ?? '' } />
                  )
                : (
                  <ElementTag
                    disabled={ props.disabled === true || props.inherited === true }
                    elementType={ mapToElementType(value.type) }
                    id={ value.id }
                    onClose={ () => {
                      setValue(null)
                      props.onChange?.(null)
                    } }
                    path={ displayPath }
                    published={ value.isPublished ?? undefined }
                  />
                  )
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
            prefix={ inputPrefix }
            readOnly={ props.allowPathTextInput !== true }
            value={ showElementTagPrefix ? undefined : displayText }
          />
          )}
    </div>
  )
})
