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
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import _ from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { Select } from '@Pimcore/components/select/select'
import { useTranslation } from 'react-i18next'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './input-quantity-value.styles'
import { Input } from '@Pimcore/components/input/input'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'

export interface InputQuantityValueProps {
  value?: InputQuantityValueValue | null
  className?: string
  onChange?: (value: InputQuantityValueValue | null) => void
  validUnits?: string[] | null
  width?: string | null
  disabled?: boolean
  inherited?: boolean
}

export interface InputQuantityValueValue {
  value: string | null
  unitId: string | null
}

export const InputQuantityValue = (props: InputQuantityValueProps): React.JSX.Element => {
  const [value, setValue] = useState<InputQuantityValueValue>(props.value ?? { value: null, unitId: null })
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { styles } = useStyles()
  const fieldWidth = useFieldWidth()

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value

    setValue({
      ...value,
      value: _.isEmpty(newValue) ? null : newValue
    })
  }

  const onChangeSelect = (unitId?: string): void => {
    setValue({
      ...value,
      unitId: _.isEmpty(unitId) ? null : (unitId ?? null)
    })
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value.value === null && value.unitId === null ? null : value)
    }
  }, [value])

  useEffect(() => {
    const localValue = value.value === null && value.unitId === null ? null : value
    if (!_.isEqual(props.value, localValue)) {
      setValue(props.value ?? { value: null, unitId: null })
    }
  }, [props.value])

  return (
    <Flex
      align="center"
      className={ cn(styles.container, props.className) }
      gap="small"
    >
      <Input
        className={ styles.input }
        disabled={ props.disabled }
        inherited={ props.inherited }
        onChange={ onChangeInput }
        style={ { maxWidth: toCssDimension(props.width, fieldWidth.small) } }
        value={ value?.value ?? undefined }
      />
      <Select
        allowClear
        className={ styles.select }
        disabled={ props.disabled }
        inherited={ props.inherited }
        onChange={ onChangeSelect }
        optionFilterProp="label"
        options={ getSelectOptions(props.validUnits ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        showSearch
        style={ { minWidth: toCssDimension(150) } }
        value={ value?.unitId ?? undefined }
      />
    </Flex>
  )
}
