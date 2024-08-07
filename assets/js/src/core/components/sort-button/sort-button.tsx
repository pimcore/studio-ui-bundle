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

import React, { useEffect, useState } from 'react'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { useStyles } from './sort-button.styles'

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc'
}

export type SortDirection = SortDirections.ASC | SortDirections.DESC | undefined

export interface SortButtonProps {
  value?: SortDirection
  onSortingChange?: (value: SortDirection) => void
}

export const SortButton = ({ onSortingChange, ...props }: SortButtonProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [value, setValue] = useState<SortDirection>(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div
      className={ [styles.button, 'sort-button', `sort-button--sorting-${value}`].join(' ') }
      onClick={ onClick }
      onKeyUp={ onClick }
      role="button"
      tabIndex={ 0 }
    >
      <CaretUpOutlined className="sort-button__arrow sort-button__asc" />
      <CaretDownOutlined className="sort-button__arrow sort-button__desc" />
    </div>
  )

  function onClick (): void {
    if (value === SortDirections.ASC) {
      updateValue(SortDirections.DESC)
    } else if (value === SortDirections.DESC) {
      updateValue(undefined)
    } else {
      updateValue(SortDirections.ASC)
    }
  }

  function updateValue (value: SortDirection): void {
    if (onSortingChange !== undefined) {
      onSortingChange(value)
    } else {
      setValue(value)
    }
  }
}
