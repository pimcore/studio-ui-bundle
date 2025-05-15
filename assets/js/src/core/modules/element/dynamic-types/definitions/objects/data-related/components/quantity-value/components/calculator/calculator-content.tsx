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
import { formatNumber } from '@Pimcore/utils/number'
import { useTranslation } from 'react-i18next'
import { Header } from '@Pimcore/components/header/header'
import { Flex } from '@Pimcore/components/flex/flex'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import _ from 'lodash'
import { type ConvertedQuantityValues2 } from '@Pimcore/modules/data-object/unit-slice.gen'

interface QuantityValueCalculatorContentProps {
  value: number
  unitId: string
  convertedValues: ConvertedQuantityValues2[]
}

export const QuantityValueCalculatorContent = (props: QuantityValueCalculatorContentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { getAbbreviation } = useQuantityValueUnits()

  return (
    <>
      <Header title={ t('quantity-value.converted-units') } />

      {props.convertedValues.map((item) => (
        <Flex
          gap="mini"
          key={ _.uniqueId('item_') }
        >
          <strong>{formatNumber({ value: props.value })} {getAbbreviation(props.unitId)}</strong>
          <span>=</span>
          <span>{formatNumber({ value: item.convertedValue ?? 0 })} {!_.isEmpty(item.unitAbbreviation) ? t(item.unitAbbreviation!) : ''}</span>
        </Flex>
      ))}
    </>
  )
}
