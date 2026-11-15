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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Popover } from 'antd'
import { QuantityValueCalculatorContent } from './calculator-content'
import {
  useUnitQuantityValueConvertAllQuery
} from '@Pimcore/modules/data-object/unit-slice.gen'
import { useTranslation } from 'react-i18next'

interface QuantityValueCalculatorButtonProps {
  value: number
  unitId: string
}

export const QuantityValueCalculatorButton = (props: QuantityValueCalculatorButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data } = useUnitQuantityValueConvertAllQuery({ value: props.value, fromUnitId: props.unitId })

  if (data === undefined || data.convertedValues.length === 0) {
    return <></>
  }

  return (
    <Popover
      content={
        <QuantityValueCalculatorContent
          convertedValues={ data.convertedValues }
          unitId={ props.unitId }
          value={ props.value }
        />
      }
      trigger="click"
    >
      <IconButton
        aria-label={ t('quantity-value.converted-units') }
        icon={ { value: 'calculator' } }
        tooltip={ { title: t('quantity-value.converted-units') } }
        type="default"
      />
    </Popover>
  )
}
