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

import i18n from '@Pimcore/app/i18n'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import React from 'react'
import { Button } from 'antd'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type TextTabManager } from './tab-manager/text-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'
import { TabsContainer } from '../../shared-tab-manager/tabs-container'

const TextContainer = (): React.JSX.Element => {
  const textTabManager = useInjection<TextTabManager>(serviceIds['Asset/Editor/TextTabManager'])

  console.log(textTabManager.getTabs())

  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer tabManager={ textTabManager } />
      }

      renderToolbar={
        <Toolbar
          pinnableToolbarElements={
            [
              {
                iconName: 'refresh',
                label: i18n.t('toolbar.reload'),
                pinning: true
              }
            ]
          }
          renderSaveButton={ <Button type="primary">{i18n.t('toolbar.save-and-publish')}</Button> }
        />
      }
    />
  )
}

export { TextContainer }
