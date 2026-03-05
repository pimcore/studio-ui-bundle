/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { ManyToOneRelation, type ManyToOneRelationProps, type ManyToOneRelationValueType } from '../../many-to-one-relation'

export interface ManyToOneRelationPathProps extends Omit<ManyToOneRelationProps, 'value' | 'onChange'> {
  value?: string | null
  onChange?: (value: string | null) => void
}

function pathToRelationValue (path: string | null | undefined, allowPathTextInput: boolean | undefined): ManyToOneRelationValueType {
  if (!isNonEmptyString(path)) {
    return null
  }

  if (allowPathTextInput === true) {
    return { textInput: true, fullPath: path }
  }

  return { type: '', id: 0, fullPath: path }
}

export const ManyToOneRelationPath = (props: ManyToOneRelationPathProps): React.JSX.Element => {
  const { value, onChange, allowPathTextInput, ...restProps } = props

  const relationValue = useMemo(
    () => pathToRelationValue(value, allowPathTextInput),
    [value, allowPathTextInput]
  )

  const handleChange = useCallback((newValue: ManyToOneRelationValueType): void => {
    onChange?.(newValue === null ? null : (newValue.fullPath ?? null))
  }, [onChange])

  return (
    <ManyToOneRelation
      { ...restProps }
      allowPathTextInput={ allowPathTextInput }
      hideOpenButton
      onChange={ handleChange }
      value={ relationValue }
    />
  )
}
