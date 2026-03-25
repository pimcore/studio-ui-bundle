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
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { t } from 'i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useQuantityValueUnits } from '@sdk/modules/data-object'

export enum QuantityValueFilterSettingValue {
  IS = 'is',
  BETWEEN = 'between',
  LESS = 'less',
  MORE = 'more'
}

export interface QuantityValueValue {
  setting: QuantityValueFilterSettingValue
  from: number | null
  to: number | null
  is: number | null
  unitId: string | null
}

export interface DynamicTypeFieldFilterQuantityValueProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterQuantityValueComponent = (props: DynamicTypeFieldFilterQuantityValueProps): React.JSX.Element => {
  const { data: rawData, setData, config } = useDynamicFilter()
  const { getSelectOptions } = useQuantityValueUnits()

  const data: QuantityValueValue = rawData ?? {
    setting: QuantityValueFilterSettingValue.IS,
    from: null,
    to: null,
    is: null,
    unitId: rawData?.unitId ?? null
  }

  const SETTING_OPTIONS = [
    { label: t('grid.filter.is'), value: QuantityValueFilterSettingValue.IS },
    { label: t('grid.filter.between'), value: QuantityValueFilterSettingValue.BETWEEN },
    { label: t('grid.filter.less'), value: QuantityValueFilterSettingValue.LESS },
    { label: t('grid.filter.more'), value: QuantityValueFilterSettingValue.MORE }
  ]

  const currentSetting = data?.setting ?? QuantityValueFilterSettingValue.IS

  const handleSettingChange = (
    newSetting: QuantityValueFilterSettingValue
  ): void => {
    const prevData = data ?? { from: null, to: null, is: null, setting: QuantityValueFilterSettingValue.IS }

    if (newSetting === QuantityValueFilterSettingValue.LESS) {
      setData({
        setting: newSetting,
        from: null,
        to: prevData.to ?? prevData.is ?? prevData.from ?? null,
        is: null,
        unitId: prevData.unitId ?? null
      })
    } else if (newSetting === QuantityValueFilterSettingValue.MORE) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.is ?? prevData.to ?? null,
        to: null,
        is: null,
        unitId: prevData.unitId ?? null
      })
    } else if (newSetting === QuantityValueFilterSettingValue.IS) {
      setData({
        setting: newSetting,
        from: null,
        to: null,
        is: prevData.from ?? prevData.to ?? null,
        unitId: prevData.unitId ?? null
      })
    } else if (newSetting === QuantityValueFilterSettingValue.BETWEEN) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.is ?? null,
        to: prevData.to ?? null,
        is: null,
        unitId: prevData.unitId ?? null
      })
    }
  }

  const handleChange = (field: 'is' | 'from' | 'to', value: number | null): void => {
    setData({
      ...data,
      setting: currentSetting,
      [field]: value
    })
  }

  const handleRangeChange = (field: 'from' | 'to', value: number | null): void => {
    setData({
      ...data,
      setting: data.setting,
      [field]: value
    })
  }

  const getValue = (): number | null => {
    if (currentSetting === QuantityValueFilterSettingValue.IS) {
      return data?.is ?? null
    } else if (currentSetting === QuantityValueFilterSettingValue.LESS) {
      return data?.to ?? null
    } else if (currentSetting === QuantityValueFilterSettingValue.MORE) {
      return data?.from ?? null
    } else return null
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        defaultValue={ QuantityValueFilterSettingValue.IS }
        onChange={ (value: QuantityValueFilterSettingValue) => { handleSettingChange(value) } }
        options={ SETTING_OPTIONS }
        width={ currentSetting === QuantityValueFilterSettingValue.MORE ? 100 : 90 }
      />

      {currentSetting === QuantityValueFilterSettingValue.BETWEEN && (
        <>
          <InputNumber
            onChange={ (value: number | null) => {
              handleChange('from', value)
            } }
            placeholder={ t('grid.filter.from') }
            value={ data?.from ?? null }
          />
          <InputNumber
            onChange={ (value: number | null) => {
              handleRangeChange('to', value)
            } }
            placeholder={ t('grid.filter.to') }
            value={ data?.to ?? null }
          />
        </>
      )}
      {currentSetting !== QuantityValueFilterSettingValue.BETWEEN && (
        <InputNumber
          onChange={ (value: number | null) => {
            if (currentSetting === QuantityValueFilterSettingValue.IS) {
              handleChange('is', value)
            } else if (currentSetting === QuantityValueFilterSettingValue.LESS) {
              handleChange('to', value)
            } else if (currentSetting === QuantityValueFilterSettingValue.MORE) {
              handleChange('from', value)
            }
          } }
          value={ getValue() }
        />
      )}

      <Select
        minWidth={ 80 }
        onChange={ (unitId) => {
          setData({
            ...data,
            unitId
          })
        } }
        options={ getSelectOptions(config?.validUnits as string[]) }
        placeholder={ '(' + t('empty') + ')' }
        value={ data?.unitId ?? undefined }
      />
    </Flex>
  )
}
