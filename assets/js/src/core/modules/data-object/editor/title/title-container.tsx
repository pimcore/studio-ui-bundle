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
import { TabTitleContainer, type TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { dataObject } = useDataObjectDraft(node.getConfig().id as number)
  const { t } = useTranslation()

  const nodeName = node.getName()
  node.getName = () => {
    if (dataObject?.parentId === 0) {
      node.getName = () => t('home')
    }

    const key = !isUndefined(dataObject) ? getElementKey(dataObject as Element, elementTypes.dataObject) : ''

    return key !== '' ? key : nodeName
  }

  return (
    <TabTitleContainer
      modified={ dataObject?.modified ?? false }
      node={ node }
    />
  )
}
