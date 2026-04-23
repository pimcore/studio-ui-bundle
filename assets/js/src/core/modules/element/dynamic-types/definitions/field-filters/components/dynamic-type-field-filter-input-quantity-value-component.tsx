/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { useDebounce } from '@sdk/utils'
import { useQuantityValueUnits } from '@sdk/modules/data-object'
import { Flex, Input, Select } from '@sdk/components'
import { useTranslation } from 'react-i18next'

export interface DynamicTypeFieldFilterInputQuantityValueProps extends AbstractFieldFilterDefinition { }

export const DynamicTypeFieldFilterInputQuantityValueComponent = (): React.JSX.Element => {
  const { data, setData, config } = useDynamicFilter()
  const [value, setValue] = React.useState<any>(data)
  const debouncedValue = useDebounce(value, 300)
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()

  useEffect(() => {
    setValue(data)
  }, [data])

  useEffect(() => {
    setData(debouncedValue)
  }, [debouncedValue])

  return (
    <Flex gap={ 'extra-small' }>
      <Input
        onChange={ (e) => {
          const newValue = e.target.value
          setValue({
            ...value,
            value: newValue === '' ? null : newValue
          })
        } }
        value={ value?.value ?? '' }
      />

      <Select
        onChange={ (unitId) => {
          setValue({
            ...value,
            unitId
          })
        } }
        options={ getSelectOptions(config?.fieldDefinition?.validUnits as string[] ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        style={ { minWidth: 120 } }
        value={ value?.unitId ?? undefined }
      />
    </Flex>
  )
}
