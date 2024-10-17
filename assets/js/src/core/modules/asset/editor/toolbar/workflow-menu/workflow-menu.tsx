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

import React from 'react'
import { TagList } from '@Pimcore/components/tag-list/tag-list'
import {
  useWorkflowGetDetailsQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import type { TagProps } from '@Pimcore/components/tag/tag'
import { Badge } from '@Pimcore/components/badge/badge'

export const EditorToolbarWorkflowMenu = (): React.JSX.Element => {
  // const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const { data, isLoading } = useWorkflowGetDetailsQuery({ elementType, elementId: id })

  console.log('----> datax', data)

  const getVisibleWorkflowStatus = (): TagProps[][] => {
    if (data?.items !== undefined && data.items.length > 0) {
      const formattedStatuses = data.items.reduce((result: Array<{ children: string }>, workflow) => {
        workflow.workflowStatus.forEach((status) => {
          console.log('----> color', status.color)

          if (status.visibleInDetail !== undefined && status.visibleInDetail) {
            const style = status.colorInverted
              ? { backgroundColor: `${status.color}33` }
              : {}
            const tag =
                            {
                              children: status.label,
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

  console.log('----> getVisibleWorkflowStatus', getVisibleWorkflowStatus())

  return (
    <div>
      <TagList
        itemGap={ 'extra-small' }
        list={ getVisibleWorkflowStatus() }
      />
      {isLoading && <div> I am loading </div>}
    </div>
  )
}
