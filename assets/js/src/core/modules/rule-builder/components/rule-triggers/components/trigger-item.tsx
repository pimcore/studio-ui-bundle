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
import { useTranslation } from 'react-i18next'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { Alert } from '@Pimcore/components/alert/alert'
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
  const { t } = useTranslation()
  const {
    registry,
    handleRemoveTrigger,
    handleMoveTrigger,
    handleUpdateTrigger,
    canMoveUp,
    canMoveDown
  } = useRuleTriggers()

  const dynamicType = registry.getDynamicType(trigger.type, false)
  const { attributes, listeners, setNodeRef, style } = useSortableItem(trigger.id)

  const isAvailable = dynamicType?.isAvailable?.() ?? true

  if (dynamicType === undefined) {
    return (
      <Alert
        banner
        message={ `Unknown trigger type: ${trigger.type}` }
        type="warning"
      />
    )
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
        {!isAvailable && dynamicType?.notAvailableHint !== undefined && (
          <Alert
            banner
            message={ t(dynamicType.notAvailableHint) }
            showIcon
            type="warning"
          />
        )}
        {triggerFormElement}
      </ToolStripBox>
    </div>
  )
}
