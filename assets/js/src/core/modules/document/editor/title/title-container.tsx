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
import { useDocumentDraft } from '../../hooks/use-document-draft'
import { useTranslation } from 'react-i18next'

export const TitleContainer = (props: TabTitleContainerProps): React.JSX.Element => {
  const { node } = props
  const { document } = useDocumentDraft(node.getConfig().id as number)
  const { t } = useTranslation()

  const nodeName = node.getName()
  node.getName = () => {
    if (document?.parentId === 0) {
      return t('home')
    }

    return document?.key ?? nodeName
  }

  return (
    <TabTitleContainer
      modified={ document?.modified ?? false }
      node={ node }
    />
  )
}
