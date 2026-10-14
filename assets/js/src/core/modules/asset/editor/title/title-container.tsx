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
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type Element, getElementKey } from '@Pimcore/modules/element/element-helper'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { asset } = useAssetDraft(node.getConfig().id as number)
  const { t } = useTranslation()

  const nodeName = node.getName()
  node.getName = () => {
    if (asset?.parentId === 0) {
      return t('home')
    }

    const key = !isUndefined(asset) ? getElementKey(asset as Element, elementTypes.asset) : ''

    return key !== '' ? key : nodeName
  }

  return (
    <TabTitleContainer
      modified={ asset?.modified ?? false }
      node={ node }
    />
  )
}
