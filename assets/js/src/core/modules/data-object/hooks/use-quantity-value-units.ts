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

import { type DefaultOptionType } from 'rc-select/lib/Select'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import {
  api,
  useUnitQuantityValueListQuery
} from '@Pimcore/modules/data-object/unit-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'

interface UseQuantityValueUnitsReturn {
  getSelectOptions: (validUnits?: string[]) => DefaultOptionType[]
  convertValue: (fromUnitId: string, toUnitId: string, value: number) => Promise<number | null>
  getAbbreviation: (unitId: string) => string
}

export const useQuantityValueUnits = (): UseQuantityValueUnitsReturn => {
  const { data: units } = useUnitQuantityValueListQuery()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const getSelectOptions = (validUnits?: string[]): DefaultOptionType[] => {
    if (units?.items === undefined) {
      return []
    }

    return units
      .items
      .filter(unit => validUnits === undefined || (unit.id !== null && validUnits.includes(String(unit.id))))
      .map(unit => ({
        label: unit.abbreviation === null ? unit.id : t(String(unit.abbreviation)),
        value: unit.id
      }))
  }

  const convertValue = async (fromUnitId: string, toUnitId: string, value: number): Promise<number | null> => {
    if (units?.items === undefined) {
      return null
    }
    const fromUnit = units.items.find(unit => unit.id === fromUnitId)
    const toUnit = units.items.find(unit => unit.id === toUnitId)
    if (fromUnit === undefined || toUnit === undefined) {
      return null
    }
    if (fromUnit.baseUnit === null || fromUnit.baseUnit !== toUnit.baseUnit) {
      return null
    }

    const { data } = await dispatch(api.endpoints.unitQuantityValueConvert.initiate({
      fromUnitId,
      toUnitId,
      value
    }))
    return data?.data ?? null
  }

  const getAbbreviation = (unitId: string): string => {
    if (units?.items === undefined) {
      return ''
    }

    const unit = units.items.find(unit => unit.id === unitId)
    if (typeof unit?.abbreviation === 'string' && !_.isEmpty(unit.abbreviation)) {
      return t(unit.abbreviation)
    }
    return unitId
  }

  return {
    getSelectOptions,
    convertValue,
    getAbbreviation
  }
}
