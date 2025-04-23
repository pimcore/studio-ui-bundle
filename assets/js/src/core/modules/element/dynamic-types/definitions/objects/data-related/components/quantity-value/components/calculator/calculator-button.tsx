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

import React from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Popover } from 'antd'
import { QuantityValueCalculatorContent } from './calculator-content'
import {
  useUnitQuantityValueConvertAllQuery
} from '@Pimcore/modules/data-object/unit-slice.gen'

interface QuantityValueCalculatorButtonProps {
  value: number
  unitId: string
}

export const QuantityValueCalculatorButton = (props: QuantityValueCalculatorButtonProps): React.JSX.Element => {
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
        icon={ { value: 'calculator' } }
        type="default"
      />
    </Popover>
  )
}
