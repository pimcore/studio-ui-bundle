/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContentLayout, IconButton, Tabs, Toolbar } from '@sdk/components'
import React from 'react'
import { usePerspectiveEditorContext } from '../../context/hooks/use-perspective-editor-context'
import { PerspectiveDetailTab } from './tabs/perspective-detail-tab/perspective-detail-tab'
import { useTranslation } from 'react-i18next'

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { perspectives, activeTabId, setActiveTabId, closePerspective } = usePerspectiveEditorContext()

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <IconButton
            icon={ { value: 'refresh' } }
            title={ t('refresh') }
          />
        </Toolbar>
      ) }
    >
      <Tabs
        activeKey={ activeTabId }
        items={ perspectives.map((perspective) => ({
          key: perspective.id,
          label: perspective.name,
          children: <PerspectiveDetailTab id={ perspective.id } />
        })) }
        onChange={ (key) => {
          setActiveTabId(key)
        } }
        onClose={ (key) => {
          closePerspective(key)
        } }
      />
    </ContentLayout>
  )
}
