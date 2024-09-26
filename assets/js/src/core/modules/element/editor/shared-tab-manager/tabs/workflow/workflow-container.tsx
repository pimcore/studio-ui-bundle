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
import { useWorkflowGetDetailsQuery } from './workflow-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { WorkflowCard } from '@Pimcore/components/workflow-card/workflow-card'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { Space } from 'antd'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const WorkflowTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()

  const { data, isLoading } = useWorkflowGetDetailsQuery({ elementType, elementId: id })

  return (
    <Content
      loading={ isLoading }
      none={ data?.items === undefined || data?.items.length === 0 }
      noneOptions={ {
        text: t('workflow.no-workflows-found')
      } }
      padded
    >
      <Header
        title={ t('workflow.headline') }
      />

      <Space direction="vertical">
        {data?.items !== undefined && data?.items.length > 0 && (
          data.items.map((workflow, index) => (
            <WorkflowCard
              key={ index }
              workflow={ workflow }
            />
          ))
        )}
      </Space>
    </Content>
  )
}
