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
import { RuleActionsProviderContext, type RuleActionsProviderData } from './rule-actions-provider'

export interface UseRuleActionsReturn extends RuleActionsProviderData {}

export const useRuleActions = (): UseRuleActionsReturn => {
  const context = useContext(RuleActionsProviderContext)

  if (context === undefined) {
    throw new Error('useRuleActions must be used within a RuleActionsProvider')
  }

  return context
}
