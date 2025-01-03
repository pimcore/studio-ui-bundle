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
import { Flex } from '@Pimcore/components/flex/flex'
import { Input } from 'antd'
import _ from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { Select } from '@Pimcore/components/select/select'
import { useTranslation } from 'react-i18next'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './input-quantity-value.styles'

export interface InputQuantityValueProps {
  value?: InputQuantityValueValue | null
  className?: string
  onChange?: (value: InputQuantityValueValue | null) => void
  validUnits?: string[] | null
  width?: string | null
  disabled?: boolean
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

  return (
    <Flex
      align="center"
      className={ props.className }
      gap="small"
    >
      <Input
        className={ styles.input }
        disabled={ props.disabled }
        onChange={ onChangeInput }
        style={ { maxWidth: toCssDimension(props.width, 150) } }
        value={ value?.value ?? undefined }
      />
      <Select
        allowClear
        className={ styles.select }
        disabled={ props.disabled }
        onChange={ onChangeSelect }
        optionFilterProp="label"
        options={ getSelectOptions(props.validUnits ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        showSearch
        value={ value?.unitId ?? undefined }
      />
    </Flex>
  )
}
