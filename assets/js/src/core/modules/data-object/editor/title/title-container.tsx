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
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { dataObject } = useDataObjectDraft(node.getConfig().id as number)

  return (
    <TabTitleContainer//
      modified={ dataObject?.modified ?? false }
      node={ node }
    />
  )
}
