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
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { useTranslation } from 'react-i18next'

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { asset } = useAssetDraft(node.getConfig().id as number)
  const { t } = useTranslation()

  const nodeName = node.getName()
  node.getName = () => {
    if (asset?.parentId === 0) {
      return t('home')
    }

    return asset?.filename ?? nodeName
  }

  return (
    <TabTitleContainer
      modified={ asset?.modified ?? false }
      node={ node }
    />
  )
}
