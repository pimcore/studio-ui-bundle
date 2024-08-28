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
import { type Thumbnail } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

interface VideoEditorSidebarDetailsViewProps {
  width: number
  height: number
  thumbnails: Thumbnail[]
  imagePreview: string
  onApplyPlayerPosition: () => void
  onDropImage: (id: number) => void
  onChangeThumbnail: (thumbnail: string) => void
  onClickDownloadByFormat: (format: string) => void
}

export const VideoEditorSidebarDetailsTab = ({
  width,
  height,
  thumbnails,
  imagePreview,
  onApplyPlayerPosition,
  onChangeThumbnail,
  onClickDownloadByFormat,
  onDropImage
}: VideoEditorSidebarDetailsViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()
  const [imageSource, setImageSource] = useState('media')
  const [customMode, setCustomMode] = useState('pimcore-system-treepreview')
  const [downloadFormat, setDownloadFormat] = useState('pimcore-system-treepreview')

  const modes = thumbnails.map(thumbnail => {
    return {
      value: thumbnail.id,
      label: thumbnail.text
    }
  })

  const downloadFormats = modes

  let cardContent
  if (imageSource === 'media') {
    cardContent = (
      <>
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => info.type === 'asset' }
          onDrop={ onDropAsset }
        >
          <DroppableContent imgSrc={ imagePreview } />
        </Droppable>
        <Meta
          title={
            <Toolbar theme={ 'secondary' }>
              <div></div>
            </Toolbar>
        }
        />
      </>
    )
  } else {
    cardContent = (
      <>
        <div className={ 'image-preview-container' }>
          <PimcoreImage
            src={ imagePreview }
          />
        </div>
        <Meta
          title={
            <Toolbar
              justify={ 'flex-end' }
              theme={ 'secondary' }
            >
              <Button onClick={ onClickApply }>{t('apply')}</Button>
            </Toolbar>
          }
        />
      </>
    )
  }

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
                defaultValue={ customMode }
                onChange={ onChangeMode }
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
                defaultValue={ downloadFormat }
                onChange={ format => {
                  setDownloadFormat(format)
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
                onClick={ onClickDownload }
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
            {cardContent}
          </Card>
        </div>
      </div>
    </div>
  )

  function onChangeMode (mode: string): void {
    setCustomMode(mode)
    onChangeThumbnail(mode)
  }

  function onClickDownload (): void {
    onClickDownloadByFormat(downloadFormat)
  }

  function onClickCurrentPlayerPosition (): void {
    setImageSource('player')
  }

  function onClickChooseMedia (): void {
    setImageSource('media')
  }

  function onDropAsset (e): void {
    onDropImage(e.data.id as number)
  }

  function onClickApply (): void {
    onApplyPlayerPosition()
  }
}
