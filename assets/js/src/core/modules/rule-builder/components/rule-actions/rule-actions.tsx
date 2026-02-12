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
import { ActionItem } from './components/action-item'
import { AddActionButton } from './components/add-action-button/add-action-button'
import type { RuleActionsProps } from './types/rule-actions.types'
import { RuleActionsProvider } from './provider/rule-actions-provider/rule-actions-provider'
import { RuleItemList } from '../shared/rule-item-list'

export const RuleActions = (props: RuleActionsProps): React.JSX.Element => {
  return (
    <RuleItemList
      Provider={ RuleActionsProvider }
      onChange={ props.onChange }
      providerProps={ props }
      renderAddButton={ (disabled) => <AddActionButton disabled={ disabled } /> }
      renderItem={ (action, disabled) => (
        <ActionItem
          action={ action }
          disabled={ disabled }
        />
      ) }
      value={ props.value ?? [] }
    />
  )
}
