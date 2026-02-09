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
import type { RuleTrigger } from '../types/rule-triggers.types'
import { useRuleTriggers } from '../provider/rule-triggers-provider/use-rule-triggers'
import { useSortableItem } from '@Pimcore/modules/rule-builder/components/shared/hooks/use-sortable-item'

export interface TriggerItemProps {
  trigger: RuleTrigger
  disabled?: boolean
}

export const TriggerItem = ({
  trigger,
  disabled = false
}: TriggerItemProps): React.JSX.Element => {
  const {
    registry,
    handleRemoveTrigger,
    handleMoveTrigger,
    handleUpdateTrigger,
    canMoveUp,
    canMoveDown
  } = useRuleTriggers()

  const dynamicType = registry.getDynamicType(trigger.type)
  const { attributes, listeners, setNodeRef, style } = useSortableItem(trigger.id)

  if (dynamicType === undefined) {
    return <div>Unknown trigger type: {trigger.type}</div>
  }

  const triggerFormElement = registry.getTriggerFormComponent(trigger.type, {
    value: trigger.config,
    onChange: (config) => { handleUpdateTrigger(trigger.id, config) },
    disabled
  })

  return (
    <div
      ref={ setNodeRef }
      style={ style }
    >
      <ToolStripBox
        docked={ false }
        renderToolStripStart={
          <RuleItemToolStrip
            canMoveDown={ canMoveDown(trigger.id) }
            canMoveUp={ canMoveUp(trigger.id) }
            disabled={ disabled }
            dragHandleProps={ { listeners: { ...attributes, ...listeners } } }
            icon={ dynamicType.icon }
            label={ dynamicType.label }
            onMoveDown={ () => { handleMoveTrigger(trigger.id, 'down') } }
            onMoveUp={ () => { handleMoveTrigger(trigger.id, 'up') } }
            onRemove={ () => { handleRemoveTrigger(trigger.id) } }
          />
        }
      >
        {triggerFormElement}
      </ToolStripBox>
    </div>
  )
}
