/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { toCssDimension } from '@Pimcore/utils/css'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { type SelectProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import { convertSelectOptions, normalizeSelectValue } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'
import { useDynamicSelectOptions } from '../../hooks/use-dynamic-select-options'

/**
 * Renderer for select/multiselect fields with a dynamic options provider. Seeds the label from the
 * enriched layout options and refreshes from the backend on dropdown open (sending unsaved changes).
 * Contexts are read optionally so it also works read-only / outside the edit form.
 */
export const DynamicSelectField = (props: SelectProps): React.JSX.Element => {
  const { id: objectId } = useElementContext()
  const editForm = useEditFormContext()
  const fieldName = props.combinedFieldName

  const { options: fetchedOptions, isLoading, fetchOptions } = useDynamicSelectOptions(objectId, fieldName)

  const seededOptions = useMemo(() => convertSelectOptions(props.options), [props.options])
  const options = fetchedOptions ?? seededOptions
  const hasHtmlLabels = options?.some(option => option.title !== undefined) ?? false

  const handleDropdownVisibleChange = (open: boolean): void => {
    if (!open || props.noteditable === true) {
      return
    }

    fetchOptions(editForm.getModifiedDataObjectAttributes(), { containerType: 'object', fieldname: fieldName })
  }

  return (
    <Select
      allowClear={ props.allowClear !== false }
      className={ props.className }
      disabled={ props.noteditable === true }
      id={ props.id }
      inherited={ props.inherited }
      loading={ isLoading }
      maxCount={ props.maxItems ?? undefined }
      mode={ props.multiSelect === true ? 'multiple' : undefined }
      onChange={ props.onChange }
      onDropdownVisibleChange={ handleDropdownVisibleChange }
      optionFilterProp={ hasHtmlLabels ? 'title' : 'label' }
      options={ options }
      showSearch
      style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.medium) } }
      value={ normalizeSelectValue(props.value) }
    />
  )
}
