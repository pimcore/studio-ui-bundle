/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { Dropdown, type DropdownMenuProps, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { WorkflowTransitionGroup } from '@Pimcore/modules/element/editor/shared-components/workflow/menu/workflow-transition-group'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useWorkflow } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-workflow'
import { useStyles } from '@Pimcore/modules/element/editor/shared-components/workflow/menu/workflow-menu.styles'
import { getVisibleWorkflowStatuses } from '@Pimcore/modules/element/editor/shared-components/workflow/types/workflow-types'
import { WorkflowStatusList } from '@Pimcore/modules/element/editor/shared-components/workflow/status/workflow-status-list'

export const EditorToolbarWorkflowMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [items, setItems] = React.useState<DropdownMenuProps['items']>([])
  const { workflowDetailsData, isFetchingWorkflowDetails } = useWorkflow()
  const { styles } = useStyles()

  useEffect(() => {
    if (workflowDetailsData?.items !== undefined && workflowDetailsData.items.length > 0) {
      const workFlowItems: ItemType[] = workflowDetailsData.items.flatMap((workflow) => {
        const result: ItemType[] = []
        result.push({
          key: ((workflowDetailsData?.items?.length ?? 0) + 1).toString(),
          type: 'custom',
          component: <WorkflowTransitionGroup workflow={ workflow } />
        })

        return {
          key: workflow.workflowName,
          type: 'group',
          label: (
            <Flex
              align="center"
              gap="small"
              justify="space-between"
            >
              <span>{t(workflow.workflowLabel)}</span>
              <Flex gap="mini">
                <WorkflowStatusList statuses={ workflow.workflowStatus } />
              </Flex>
            </Flex>
          ),
          children: result
        }
      })
      setItems(workFlowItems)
    }
  }, [workflowDetailsData])

  const visibleStatuses = getVisibleWorkflowStatuses(workflowDetailsData?.items)

  return (
    <Flex
      align={ 'center' }
      gap={ 'extra-small' }
      justify={ 'flex-end' }
    >
      <WorkflowStatusList statuses={ visibleStatuses } />
      {workflowDetailsData !== undefined && (
      <Dropdown
        disabled={ isFetchingWorkflowDetails }
        menu={ { items } }
        overlayClassName={ styles.dropdownOverlay }
      >
        <DropdownButton>
          <Icon
            options={ { height: 16, width: 16 } }
            value={ 'workflow' }
          />
        </DropdownButton>
      </Dropdown>
      )}
    </Flex>
  )
}
