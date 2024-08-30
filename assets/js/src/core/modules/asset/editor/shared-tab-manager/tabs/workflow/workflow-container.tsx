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
import { useWorkflowGetDetailsQuery } from '@Pimcore/modules/element/editor/workflow-api-slice.gen'
import { useStyle } from './workflow-container.styles'
import { useTranslation } from 'react-i18next'
import { WorkflowCard } from '@Pimcore/components/workflow-card/workflow-card'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

export const WorkflowTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { id } = useAsset()

  const { data, isLoading } = useWorkflowGetDetailsQuery({ elementType: 'asset', elementId: id! })

  return (
    <Content
      className={ styles.tab }
      loading={ isLoading }
      padded
    >
      <Header
        title={ t('asset.asset-editor-tabs.workflow.text') }
      />

      <div className={ 'pimcore-workflow-workflows' }>
        {data?.items !== undefined && data?.items.length > 0 && (
          data.items.map((workflow, index) => (
            <WorkflowCard
              key={ index }
              workflow={ workflow }
            />
          ))
        )}
      </div>
    </Content>
  )
}
