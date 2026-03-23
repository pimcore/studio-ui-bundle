/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LoadingOutlined } from '@ant-design/icons'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { Input } from '@Pimcore/components/input/input'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { useDataObject } from '@Pimcore/modules/data-object/hooks/use-data-object'
import { useFormatPath, type IFormatPathItem } from '@Pimcore/modules/data-object/hooks/use-format-path'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { useControlledState } from '@Pimcore/utils/hooks/use-controlled-state'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { Flex } from 'antd'
import { isNil, isUndefined } from 'lodash'
import React, { forwardRef, useEffect, useState, type MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import {
  type ManyToOneRelationValueType
} from './many-to-one-relation'
import { useStyles } from './path-target.styles'

export interface PathTargetProps {
  value?: ManyToOneRelationValueType
  disabled?: boolean
  allowPathTextInput?: boolean
  onChange?: (value: ManyToOneRelationValueType) => void
  inherited?: boolean
  combinedFieldName?: string
  pathFormatterClass?: string
  onSearch?: () => void
  allowElementTagClose?: boolean
}

export const PathTarget = forwardRef(function PathTarget (
  props: PathTargetProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { t } = useTranslation()
  const { value, handleChange: handleValueChange } = useControlledState<ManyToOneRelationValueType>(
    props.value ?? null,
    props.onChange
  )

  const { isDragActive, isOver, isValid } = useDroppable()
  const { styles } = useStyles({ isDragActive, isOver, isValid, hasSearch: props.onSearch !== undefined })
  const { mapToElementType } = useElementHelper()
  const { formatPath } = useFormatPath()
  const { id: dataObjectId } = useDataObject()
  const [displayPath, setDisplayPath] = useState<string>(String(props.value?.fullPath ?? ''))
  const [isLoading, setIsLoading] = useState(false)

  const hasPathFormatterClass = isNonEmptyString(props.pathFormatterClass)

  function mapNewValue (value: IFormatPathItem[], data: { items: Array<{ objectReference: string | number, formatedPath: string | number }> }): IFormatPathItem[] {
    return value.map((item) => ({
      ...item,
      fullPath: String(data.items.find(i => String(i.objectReference) === `${item.type}_${item.id}`)?.formatedPath ?? item.fullPath)
    }))
  }

  // Sync display path from props (separate from value sync handled by useControlledState)
  useEffect(() => {
    const actualPath = props.value?.fullPath ?? ''
    setDisplayPath(actualPath)

    if (hasPathFormatterClass && props.value !== null && props.combinedFieldName !== undefined && dataObjectId != null) {
      setIsLoading(true)

      formatPath([props.value as IFormatPathItem], props.combinedFieldName, dataObjectId).then((data) => {
        if (data === undefined) {
          setIsLoading(false)
          return
        }

        const mappedValue = mapNewValue([props.value as IFormatPathItem], data)
        setDisplayPath(String(mappedValue[0]?.fullPath ?? actualPath))
        setIsLoading(false)
      }).catch(error => {
        console.error(error)
        setIsLoading(false)
      })
    }
  }, [props.value])

  const getDisplayText: () => string | undefined = () => {
    if (isNil(value)) {
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

  const elementTagPath = (hasPathFormatterClass)
    ? displayPath
    : String(value?.fullPath ?? '')

  let inputPrefix: React.ReactNode
  if (showElementTagPrefix) {
    if (hasPathFormatterClass) {
      inputPrefix = isLoading ? <LoadingOutlined /> : <SanitizeHtml html={ displayPath } />
    } else {
      inputPrefix = (
        <ElementTag
          disabled={ props.disabled === true || props.inherited === true }
          elementType={ mapToElementType(value.type, true) }
          id={ value.id }
          onClose={ props.allowElementTagClose === true
            ? () => {
                handleValueChange(null)
              }
            : undefined }
          path={ elementTagPath }
          published={ value.isPublished ?? undefined }
        />
      )
    }
  }

  const InputComponent = isUndefined(props.onSearch) ? Input : SearchInput
  const searchProps = isUndefined(props.onSearch)
    ? {}
    : {
        onSearch: props.onSearch,
        searchButtonIcon: 'folder-search',
        maxWidth: '100%'
      }

  return (
    <div
      ref={ ref }
      style={ { flexGrow: 1 } }
    >
      {showElementTag
        ? (
          <Flex
            align="center"
          >
            <InputComponent
              className={ styles.input }
              disabled={ props.disabled }
              inherited={ props.inherited }
              prefix={
                <ElementTag
                  disabled={ props.disabled === true || props.inherited === true }
                  elementType={ mapToElementType(value.type, true) }
                  id={ value.id }
                  inline
                  onClose={ () => {
                    handleValueChange(null)
                  } }
                  path={ elementTagPath }
                  published={ value.isPublished ?? undefined }
                />
              }
              readOnly
              { ...searchProps }
            />
          </Flex>
          )
        : (
          <InputComponent
            className={ styles.input }
            disabled={ props.disabled }
            inherited={ props.inherited }
            onChange={ (e) => {
              const newValue: { textInput: true, fullPath: string } = {
                textInput: true,
                fullPath: e.currentTarget.value
              }

              handleValueChange(newValue)
            } }
            placeholder={ showElementTagPrefix ? undefined : t(props.allowPathTextInput === true ? 'many-to-one-relation.drop-placeholder-text-input' : 'many-to-one-relation.drop-placeholder') }
            prefix={ inputPrefix }
            readOnly={ props.allowPathTextInput !== true }
            value={ showElementTagPrefix ? undefined : displayText }
            { ...searchProps }
          />
          )}
    </div>
  )
})
