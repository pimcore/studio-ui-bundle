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
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'
import { useStyle } from './workflow-container.styles'
import { useTranslation } from 'react-i18next'
import { WorkflowCard } from '@Pimcore/components/workflow-card/workflow-card'
import {
  ContentHeaderContainer
} from '@Pimcore/components/content-containers/content-header-container'
import { ContentPaddingContainer } from '@Pimcore/components/content-containers/content-padding-container'

export const WorkflowTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const { data, isLoading } = useWorkflowGetDetailsQuery({ elementType: 'asset', elementId: context?.config.id })

  return (
    <div className={ styles.tab }>
      <ContentHeaderContainer
        text={ t('asset.asset-editor-tabs.workflow.text') }
      />

      <div className={ 'pimcore-workflow-workflows' }>
        {isLoading && (
          'Loading...'
        )}

        <ContentPaddingContainer>
          {!isLoading && data?.items !== undefined && data?.items.length > 0 && (
            data.items.map((workflow, index) => (
              <WorkflowCard
                key={ index }
                workflow={ workflow }
              />
            ))
          )}
        </ContentPaddingContainer>
      </div>
    </div>
  )
}
