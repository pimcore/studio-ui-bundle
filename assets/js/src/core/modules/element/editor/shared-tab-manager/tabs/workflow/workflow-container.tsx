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
import { WorkflowCard } from '@Pimcore/modules/element/editor/shared-components/workflow/card/workflow-card'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { Space } from 'antd'
import { WorkFlowProvider } from '@Pimcore/modules/element/editor/shared-components/workflow/provider/workflow-provider'
import { useWorkflow } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-workflow'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/use-component-registry'

export const WorkflowTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { workflowDetailsData, isFetchingWorkflowDetails } = useWorkflow()
  const componentRegistry = useComponentRegistry()
  const WorkflowModal = componentRegistry.get(componentConfig.element.editor.workflow.modal.component.name)

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
          <WorkflowModal />
        </WorkFlowProvider>
      </Space>
    </Content>
  )
}
