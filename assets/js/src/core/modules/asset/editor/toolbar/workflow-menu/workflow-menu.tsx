/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import { TagList } from '@Pimcore/components/tag-list/tag-list'
import type { TagProps } from '@Pimcore/components/tag/tag'
import { Badge } from '@Pimcore/components/badge/badge'
import { Dropdown, type DropdownMenuProps, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { WorkflowTransitionGroup } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

export const EditorToolbarWorkflowMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [items, setItems] = React.useState<DropdownMenuProps['items']>([])
  const { workflowDetailsData, isFetchingWorkflowDetails } = useWorkflow()

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
          key: t(`${workflow.workflowName}`),
          type: 'group',
          label: t(`${workflow.workflowName}`).toUpperCase(),
          children: result
        }
      })
      setItems(workFlowItems)
    }
  }, [workflowDetailsData])

  const getVisibleWorkflowStatus = (): TagProps[][] => {
    if (workflowDetailsData?.items !== undefined && workflowDetailsData.items.length > 0) {
      const formattedStatuses = workflowDetailsData.items.reduce((result: Array<{ children: string }>, workflow) => {
        workflow.workflowStatus.forEach((status) => {
          if (status.visibleInDetail !== undefined && status.visibleInDetail) {
            const style = status.colorInverted
              ? { backgroundColor: `${status.color}33` }
              : {}
            const tag =
                {
                  children: t(`${status.label}`),
                  icon: <Badge
                    color={ status.color }
                        />,
                  style
                }
            result.push(tag)
          }
        })
        return result
      }, [])
      return [formattedStatuses]
    }
    return [[]]
  }

  return (
    <Flex
      align={ 'center' }
      justify={ 'flex-end' }
    >
      <TagList
        itemGap={ 'extra-small' }
        list={ getVisibleWorkflowStatus() }
        wrap={ false }
      />
      {workflowDetailsData !== undefined && (
      <Dropdown
        disabled={ isFetchingWorkflowDetails }
        menu={ { items } }
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
