/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useCallback } from 'react'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { ManyToOneRelation, type ManyToOneRelationProps, type ManyToOneRelationValueType } from '../../many-to-one-relation'

export interface ManyToOneRelationPathProps extends Omit<ManyToOneRelationProps, 'value' | 'onChange'> {
  value?: string | null
  onChange?: (value: string | null) => void
}

export const ManyToOneRelationPath = (props: ManyToOneRelationPathProps): React.JSX.Element => {
  const { value, onChange, allowPathTextInput, ...restProps } = props

  const memoizedValue = useMemo((): ManyToOneRelationValueType => {
    if (!isNonEmptyString(value)) {
      return null
    }

    if (allowPathTextInput === true) {
      return { textInput: true, fullPath: value }
    }

    return { type: '', id: 0, fullPath: value }
  }, [value, allowPathTextInput])

  const handleChange = useCallback((newValue: ManyToOneRelationValueType): void => {
    const newPath = newValue === null ? null : (newValue.fullPath ?? null)
    onChange?.(newPath)
  }, [onChange])

  return (
    <ManyToOneRelation
      { ...restProps }
      allowPathTextInput={ allowPathTextInput }
      onChange={ handleChange }
      value={ memoizedValue }
      hideOpenButton
    />
  )
}
