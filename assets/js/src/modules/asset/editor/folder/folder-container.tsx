import React from 'react'
import { TabsContainer } from './tab-manager/tabs-container'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import i18n from '@Pimcore/app/i18n'
import { Button } from 'antd'

const FolderContainer = (): React.JSX.Element => {
  return (
    <TabsToolbarView
      renderTabbar={
        <TabsContainer />
      }

      renderToolbar={
        <Toolbar
          pinnableToolbarElements={
              [{
                iconName: 'refresh',
                label: i18n.t('toolbar.reload'),
                pinning: true
              },
              {
                iconName: 'target',
                label: i18n.t('toolbar.locate-in-tree'),
                pinning: true
              },
              {
                iconName: 'info-circle-outlined',
                label: i18n.t('toolbar.copy-id'),
                pinning: true
              }]
            }
          renderSaveButton={ <Button type="primary">{i18n.t('toolbar.save-and-publish')}</Button> }
        />
      }
    />
  )
}

export { FolderContainer }
