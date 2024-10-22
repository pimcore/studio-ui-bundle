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
import {
  useWorkflowGetDetailsQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import type { TagProps } from '@Pimcore/components/tag/tag'
import { Badge } from '@Pimcore/components/badge/badge'
import { Flex } from '@Pimcore/components/flex/flex'
import { Dropdown, type DropdownMenuProps, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { HorizontalScroll } from '@Pimcore/components/horizontal-scroll/horizontal-scroll'

export const EditorToolbarWorkflowMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const { data, isLoading } = useWorkflowGetDetailsQuery({ elementType, elementId: id })
  const [items, setItems] = React.useState<DropdownMenuProps['items']>([])

  useEffect(() => {
    if (data?.items !== undefined && data.items.length > 0) {
      const workFlowItems = data.items.map((workflow) => {
        const result: ItemType[] = []
        const mergedActions = [
          ...(workflow.allowedTransitions ?? []),
          ...(workflow.globalActions ?? [])
        ]

        mergedActions?.forEach((action) => {
          result.push({
            key: (result.length + 1).toString(),
            label: t(`${action.label}`)
          })
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
  }, [data])

  const getVisibleWorkflowStatus = (): TagProps[][] => {
    if (data?.items !== undefined && data.items.length > 0) {
      const formattedStatuses = data.items.reduce((result: Array<{ children: string }>, workflow) => {
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
      justify={ 'space-between' }
      style={ { width: '100%' } }
    >
      {!isLoading && (
      <HorizontalScroll>
        <TagList
          itemGap={ 'extra-small' }
          list={ getVisibleWorkflowStatus() }
          wrap={ false }
        />
      </HorizontalScroll>
      )}
      <Dropdown
        menu={ { items } }
      >
        <DropdownButton
          disabled={ isLoading }
          loading={ isLoading }
        >
          <Icon
            name={ 'workflow' }
            options={ { height: 16, width: 16 } }
          />
        </DropdownButton>
      </Dropdown>
    </Flex>
  )
}
