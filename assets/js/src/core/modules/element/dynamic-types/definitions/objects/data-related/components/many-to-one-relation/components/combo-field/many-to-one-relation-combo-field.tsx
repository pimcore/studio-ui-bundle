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
import { isNil } from 'lodash'
import { Select } from '@Pimcore/components/select/select'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { toCssDimension } from '@Pimcore/utils/css'
import { useComboFieldData } from './hooks/use-combo-field-data'
import { useRelationSourceObjectId } from './hooks/use-relation-source-object-id'
import { type ManyToOneRelationProps } from '@Pimcore/components/many-to-one-relation'

export interface ManyToOneRelationComboFieldProps extends ManyToOneRelationProps {
  /** Object the path formatter is resolved against; set by the grid cell edit modal. */
  objectId?: number
}

/**
 * Inline-search rendering of a many-to-one relation: a searchable single select over
 * the allowed class instead of the path reference input. Option labels come from the
 * field's path formatter and fall back to the object path when none is configured.
 */
export const ManyToOneRelationComboField = (props: ManyToOneRelationComboFieldProps): React.JSX.Element => {
  const { t } = useTranslation()
  const fieldWidth = useFieldWidth()
  const objectId = useRelationSourceObjectId(props.objectId)

  const {
    options,
    isFetching,
    hitById,
    handleSearch,
    handleDropdownVisibleChange,
    handlePopupScroll
  } = useComboFieldData({
    allowedClasses: props.allowedClasses,
    combinedFieldName: props.combinedFieldName,
    objectId,
    pathFormatterClass: props.pathFormatterClass,
    value: props.value
  })

  const isDisabled = props.disabled === true || props.readOnly === true
  const value = props.value

  const selectedId = !isNil(value) && value.textInput !== true ? value.id : undefined

  // Select forces antd's own allowClear off and offers clearing through the dropdown
  // instead, which reports an undefined value via onChange — so selecting and clearing
  // both run through this handler.
  const handleChange = (nextValue: number | undefined): void => {
    if (isNil(nextValue)) {
      props.onChange?.(null)

      return
    }

    const hit = hitById(nextValue)

    if (isNil(hit)) {
      return
    }

    props.onChange?.({
      type: 'object',
      id: hit.id,
      subtype: hit.className,
      fullPath: hit.fullPath
    })
  }

  return (
    <Select
      allowClear={ props.allowToClearRelation === true && !isDisabled }
      className={ props.className }
      disabled={ isDisabled }
      filterOption={ false }
      inherited={ props.inherited }
      loading={ isFetching }
      onChange={ handleChange }
      onDropdownVisibleChange={ handleDropdownVisibleChange }
      onPopupScroll={ handlePopupScroll }
      onSearch={ handleSearch }
      options={ options }
      placeholder={ t('search') }
      showSearch
      style={ { width: '100%', maxWidth: toCssDimension(props.width, fieldWidth.large) } }
      value={ selectedId }
    />
  )
}
