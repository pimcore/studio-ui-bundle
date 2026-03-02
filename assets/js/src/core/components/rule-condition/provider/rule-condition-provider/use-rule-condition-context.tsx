/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { RuleConditionProviderContext } from './rule-condition-provider'
import type { RuleConditionContextValue } from '../../types/rule-condition.types'

export const useRuleConditionContext = (): RuleConditionContextValue => {
  const context = useContext(RuleConditionProviderContext)

  if (context === undefined) {
    throw new Error('useRuleConditionContext must be used within a RuleConditionProvider')
  }

  return context
}
