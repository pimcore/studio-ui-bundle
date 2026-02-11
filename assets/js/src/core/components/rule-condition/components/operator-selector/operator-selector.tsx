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
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'
import { type RuleConditionOperator } from '../../types/rule-condition.types'

interface OperatorSelectorProps {
  value: RuleConditionOperator
  onChange: (operator: RuleConditionOperator) => void
  disabled?: boolean
}

const OPERATORS: Array<{ value: RuleConditionOperator, labelKey: string }> = [
  { value: 'and', labelKey: 'rule-condition.operator.and' },
  { value: 'or', labelKey: 'rule-condition.operator.or' },
  { value: 'and_not', labelKey: 'rule-condition.operator.and-not' }
]

/**
 * Radio button group for selecting and/or/and_not operators
 */
export const OperatorSelector = ({
  value,
  onChange,
  disabled = false
}: OperatorSelectorProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Radio.Group
      disabled={ disabled }
      onChange={ (e) => { onChange(e.target.value as RuleConditionOperator) } }
      value={ value }
    >
      {OPERATORS.map((op) => (
        <Radio.Button
          key={ op.value }
          value={ op.value }
        >
          {t(op.labelKey)}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}
