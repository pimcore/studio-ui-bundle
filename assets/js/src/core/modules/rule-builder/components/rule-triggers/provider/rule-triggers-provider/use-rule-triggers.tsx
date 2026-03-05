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
import { RuleTriggersProviderContext, type RuleTriggersProviderData } from './rule-triggers-provider'

export interface UseRuleTriggersReturn extends RuleTriggersProviderData {}

export const useRuleTriggers = (): UseRuleTriggersReturn => {
  const context = useContext(RuleTriggersProviderContext)

  if (context === undefined) {
    throw new Error('useRuleTriggers must be used within a RuleTriggersProvider')
  }

  return context
}
