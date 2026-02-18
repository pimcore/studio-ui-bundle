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
import { TriggerItem } from './components/trigger-item'
import { AddTriggerButton } from './components/add-trigger-button/add-trigger-button'
import type { RuleTriggersProps } from './types/rule-triggers.types'
import { RuleTriggersProvider } from './provider/rule-triggers-provider/rule-triggers-provider'
import { RuleItemList } from '../shared/rule-item-list'

export const RuleTriggers = (props: RuleTriggersProps): React.JSX.Element => {
  return (
    <RuleItemList
      Provider={ RuleTriggersProvider }
      providerProps={ props }
      renderAddButton={ (disabled) => <AddTriggerButton disabled={ disabled } /> }
      renderItem={ (trigger, disabled) => (
        <TriggerItem
          disabled={ disabled }
          trigger={ trigger }
        />
      ) }
      value={ props.value ?? [] }
    />
  )
}
