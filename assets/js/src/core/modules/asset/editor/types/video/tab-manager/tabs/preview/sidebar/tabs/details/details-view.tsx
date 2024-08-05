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

import React, { useState } from 'react'
import { useStyle } from './details.styles'
import { Button, Card, Divider, Select } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import ButtonGroup from 'antd/es/button/button-group'
import Meta from 'antd/es/card/Meta'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import {
  DroppableContent
} from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
// import { type Thumbnail } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'

interface VideoEditorSidebarDetailsViewProps {
  width: number
  height: number
  thumbnails: any
  // onClickDownloadByFormat: (format: string) => void
}

export const VideoEditorSidebarDetailsTab = ({
  width,
  height,
  thumbnails
  // onClickDownloadByFormat
}: VideoEditorSidebarDetailsViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()
  const [imageSource, setImageSource] = useState('media')

  console.log(thumbnails)
  const mappedThumbnails = thumbnails.map(thumbnail => {
    return {
      value: thumbnail.id,
      label: thumbnail.text
    }
  })

  const modes = [
    ...mappedThumbnails
  ]

  const downloadFormats = [
    {
      value: 'original',
      label: t('asset.sidebar.original-file')
    }, {
      value: 'content',
      label: t('content')
    }
  ]

  const toolbar = (
    <Toolbar
      className={ 'image-preview__toolbar' }
      pinnableToolbarElements={ [] }
      renderSaveButton={ <Button>{t('apply')}</Button> }
      showWorkflow={ false }
    />
  )

  return (
    <div className={ styles.sidebarContentEntry }>
      <p className={ 'sidebar__content-label' }>{t('details')}</p>

      <div className={ 'sidebar__content-entry-content' }>
        <div className={ styles.sidebarContentDimensions }>
          <div className={ 'entry-content__dimensions-label' }>
            <p>{t('width')}</p>
            <p>{t('height')}</p>
          </div>
          <div className={ 'entry-content__dimensions-content' }>
            <p>{width} px</p>
            <p>{height} px</p>
          </div>
        </div>

        <div className={ styles.sidebarContentDownload }>
          <p className={ 'sidebar__content-label' }>{t('thumbnail')}</p>

          <div className={ 'entry-content__download-content' }>
            <div className={ 'entry-content__download-content-thumbnail' }>
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
                onChange={ mode => { /* setCustomMode(mode as string) */
                } }
              >
                {modes.map((mode) => (
                  <Select.Option
                    key={ mode.value }
                    value={ mode.value }
                  >{mode.label}</Select.Option>
                ))
                }
              </Select>
            </div>

            <p className={ 'sidebar__content-label' }>{t('download')}</p>

            <div className={ 'entry-content__download-content-thumbnail' }>
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
                onChange={ mode => { /* setCustomMode(mode as string) */
                } }
              >
                {downloadFormats.map((mode) => (
                  <Select.Option
                    key={ mode.value }
                    value={ mode.value }
                  >{mode.label}</Select.Option>
                ))
                }
              </Select>

              <Button
                aria-label={ t('aria.asset.image-sidebar.tab.details.download-thumbnail') }
                icon={ <Icon name={ 'download-02' } /> }
              />
            </div>
          </div>
        </div>
        <Divider className={ 'sidebar__content-hr' } />
        <div className={ styles.sidebarContentImagePreview }>
          <p className={ 'sidebar__content-label' }>{t('select-image-preview')}</p>
          <ButtonGroup>
            <Button
              onClick={ onClickChooseMedia }
              type={ imageSource === 'media' ? 'primary' : 'default' }
            >
              {t('choose-media')}
            </Button>
            <Button
              onClick={ onClickCurrentPlayerPosition }
              type={ imageSource === 'player' ? 'primary' : 'default' }
            >
              {t('current-player-position')}
            </Button>
          </ButtonGroup>
          <Card size={ 'small' }>
            <Droppable
              isValidContext={ (info: DragAndDropInfo) => true }
              onDrop={ (e) => { console.log(e) } }
            >
              <DroppableContent />
            </Droppable>
            <Meta
              title={ toolbar }
            />
          </Card>
        </div>
      </div>
    </div>
  )

  function onClickCurrentPlayerPosition (): void {
    setImageSource('player')
  }

  function onClickChooseMedia (): void {
    setImageSource('media')
  }
}
