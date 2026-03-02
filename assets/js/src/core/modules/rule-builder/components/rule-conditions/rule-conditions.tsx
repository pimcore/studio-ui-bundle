/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { RuleCondition } from '@Pimcore/components/rule-condition/rule-condition'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import type { RuleConditionsProps } from './types/rule-conditions.types'

export const RuleConditions = (props: RuleConditionsProps): React.JSX.Element => {
  const { registry, value, onChange, disabled } = props

  const conditionTypes = useMemo(() => {
    return registry.getDynamicTypes()
  }, [registry])

  return (
    <ErrorBoundary>
      <RuleCondition
        conditionTypes={ conditionTypes }
        disabled={ disabled }
        onChange={ onChange }
        value={ value }
      />
    </ErrorBoundary>
  )
}
