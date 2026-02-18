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
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import type { RuleConditionProps } from './types/rule-condition.types'
import { ConditionList } from './components/condition-list/condition-list'
import { useStyles } from './rule-condition.styles'
import { RuleConditionProvider } from './provider/rule-condition-provider/rule-condition-provider'
import { useRuleItemDragDrop } from '@Pimcore/modules/rule-builder/components/shared/hooks/use-rule-item-drag-drop'

export const RuleCondition = (props: RuleConditionProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { strategy, ...dndConfig } = useRuleItemDragDrop()

  return (
    <RuleConditionProvider { ...props }>
      {({ conditions, handleDragEnd }) => {
        const allDraggableIds = conditions.map(c => c.id)

        return (
          <div className={ styles.ruleConditionContainer }>
            <DndContext
              onDragEnd={ handleDragEnd }
              { ...dndConfig }
            >
              <SortableContext
                items={ allDraggableIds }
                strategy={ strategy }
              >
                <ConditionList conditions={ conditions } />
              </SortableContext>
            </DndContext>
          </div>
        )
      }}
    </RuleConditionProvider>
  )
}
