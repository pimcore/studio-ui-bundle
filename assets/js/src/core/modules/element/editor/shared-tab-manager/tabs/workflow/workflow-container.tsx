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
import { useTranslation } from 'react-i18next'
import { WorkflowCard } from '@Pimcore/components/workflow-card/workflow-card'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { Space } from 'antd'
import { WorkFlowProvider } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import { WorkflowLogModal } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

export const WorkflowTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { workflowDetailsData, isFetchingWorkflowDetails } = useWorkflow()

  return (
    <Content
      loading={ isFetchingWorkflowDetails }
      none={ workflowDetailsData?.items === undefined || workflowDetailsData?.items.length === 0 }
      noneOptions={ {
        text: t('workflow.no-workflows-found')
      } }
      padded
    >
      <Header
        className={ 'p-l-mini' }
        title={ t('workflow.headline') }
      />

      <Space direction="vertical">
        <WorkFlowProvider>
          {workflowDetailsData?.items !== undefined && workflowDetailsData?.items.length > 0 && (
            workflowDetailsData.items.map((workflow, index) => (
              <WorkflowCard
                key={ index }
                workflow={ workflow }
              />
            ))
          )}
          <WorkflowLogModal />
        </WorkFlowProvider>
      </Space>
    </Content>
  )
}
