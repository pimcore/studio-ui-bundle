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
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { RuleItemToolStrip } from '@Pimcore/modules/rule-builder/components/shared/rule-item-tool-strip'
import type { RuleAction } from '../types/rule-actions.types'
import { useRuleActions } from '../provider/rule-actions-provider/use-rule-actions'
import { useSortableItem } from '@Pimcore/modules/rule-builder/components/shared/hooks/use-sortable-item'

export interface ActionItemProps {
  action: RuleAction
  disabled?: boolean
}

export const ActionItem = ({
  action,
  disabled = false
}: ActionItemProps): React.JSX.Element => {
  const {
    registry,
    handleRemoveAction,
    handleMoveAction,
    handleUpdateAction,
    canMoveUp,
    canMoveDown
  } = useRuleActions()

  const dynamicType = registry.getDynamicType(action.type)
  const { attributes, listeners, setNodeRef, style } = useSortableItem(action.id)

  if (dynamicType === undefined) {
    return <div>Unknown action type: {action.type}</div>
  }

  return (
    <div
      ref={ setNodeRef }
      style={ style }
    >
      <ToolStripBox
        docked={ false }
        renderToolStripStart={
          <RuleItemToolStrip
            canMoveDown={ canMoveDown(action.id) }
            canMoveUp={ canMoveUp(action.id) }
            disabled={ disabled }
            dragHandleProps={ { listeners: { ...attributes, ...listeners } } }
            icon={ dynamicType.icon }
            label={ dynamicType.label }
            onMoveDown={ () => { handleMoveAction(action.id, 'down') } }
            onMoveUp={ () => { handleMoveAction(action.id, 'up') } }
            onRemove={ () => { handleRemoveAction(action.id) } }
          />
        }
      >
        {registry.getActionFormComponent(action.type, {
          value: action.config,
          onChange: (config) => { handleUpdateAction(action.id, config) },
          disabled
        })}
      </ToolStripBox>
    </div>
  )
}
