import i18n from '@Pimcore/app/i18n'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { EditorTabsContainer } from '@Pimcore/modules/asset/editor-tabs/editor-tabs-container'
import { TabsToolbarView } from '@Pimcore/modules/element-editor/layouts/tabs-toolbar-view'
import React from 'react'
import { Button } from 'antd'

const ImageContainer = (): React.JSX.Element => {
  return (
    <TabsToolbarView
      renderTabbar={
        <EditorTabsContainer />
      }

      renderToolbar={
        <Toolbar
          pinnableToolbarElements={
            [
              {
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
              }
            ]
          }
          renderSaveButton={ <Button type="primary">{i18n.t('toolbar.save-and-publish')}</Button> }
        />
      }
    />
  )
}

export { ImageContainer }
