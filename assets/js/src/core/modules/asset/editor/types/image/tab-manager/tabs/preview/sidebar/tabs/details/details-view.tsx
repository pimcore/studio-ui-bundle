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
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { Select } from '@Pimcore/components/select/select'
import { Button } from '@Pimcore/components/button/button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { useDetailsViewData } from './hooks/use-details-view-data'
import { useStyle } from './details.styles'
import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'

export interface CustomDownloadProps {
  width: number
  height: number
  quality: number
  dpi: number
  mode: string
  format: string
}

interface AssetEditorSidebarDetailsViewProps {
  width: number
  height: number
  onClickDownloadByFormat: (format: string) => void
  onClickCustomDownload: ({
    width,
    height,
    quality,
    dpi,
    mode,
    format
  }: CustomDownloadProps) => void
}

export const AssetEditorSidebarDetailsView = ({
  width,
  height,
  onClickDownloadByFormat,
  onClickCustomDownload
}: AssetEditorSidebarDetailsViewProps): React.JSX.Element => {
  const [downloadFormat, setDownloadFormat] = useState<string>('original')
  const [customWidth, setCustomWidth] = useState(width)
  const [customHeight, setCustomHeight] = useState(height)
  const [customQuality, setCustomQuality] = useState(-1)
  const [customDPI, setCustomDPI] = useState(-1)
  const [customMode, setCustomMode] = useState<string>('scaleByWidth')
  const [customFormat, setCustomFormat] = useState('JPEG')

  const { styles } = useStyle()
  const { t } = useTranslation()

  const { getModes, getFormats, getDownloadFormats } = useDetailsViewData()

  const MODES = getModes()
  const FORMATS = getFormats()
  const DOWNLOAD_FORMATS = getDownloadFormats()

  const CUSTOM_DOWNLOAD_OPTIONS = {
    label: <span>{t('image-sidebar.tab.details.custom-download')}</span>,
    children: (
      <Form
        initialValues={ {
          width,
          height,
          mode: customMode,
          format: customFormat
        } }
        layout="vertical"
      >
        <div className={ 'entry-content__download-content-custom__dimensions' }>
          <Form.Item
            label={ t('width') }
            name={ 'width' }
          >
            <Input
              onChange={ (e) => { setCustomWidth(e.target.value as unknown as number) } }
              type="number"
            />
          </Form.Item>

          <Form.Item
            label={ t('height') }
            name={ 'height' }
          >
            <Input
              onChange={ (e) => { setCustomHeight(e.target.value as unknown as number) } }
              type="number"
            />
          </Form.Item>
        </div>

        <div className={ 'entry-content__download-content-custom__others' }>
          <div>
            <Form.Item
              label={ t('quality') }
              name={ 'quality' }
            >
              <Input
                onChange={ (e) => { setCustomQuality(e.target.value as unknown as number) } }
                type="number"
              />
            </Form.Item>

            <Form.Item
              label={ 'DPI' }
              name={ 'dpi' }
            >
              <Input
                onChange={ (e) => { setCustomDPI(e.target.value as unknown as number) } }
                type="number"
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              label={ t('mode') }
              name={ 'mode' }
            >
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
                onChange={ (mode: string) => { setCustomMode(mode) } }
                options={ MODES }
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={ t('format') }
              name={ 'format' }
            >
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-format') }
                onChange={ (format: string) => { setCustomFormat(format) } }
                options={ FORMATS }
              />
            </Form.Item>
          </div>
        </div>

        <div className={ 'entry-content__download-content-custom__button' }>
          <Button
            aria-label={ t('aria.asset.image-sidebar.tab.details.download-custom-thumbnail') }
            onClick={ () => {
              onClickCustomDownload({
                width: customWidth,
                height: customHeight,
                quality: customQuality,
                dpi: customDPI,
                mode: customMode,
                format: customFormat
              })
            } }
          >
            {t('download')}
          </Button>
        </div>
      </Form>
    )
  }

  return (
    <Content
      className={ styles.sidebarContentEntry }
      padded
      padding={ { top: 'none', x: 'small', bottom: 'mini' } }
    >
      <Header title={ t('asset.sidebar.details') } />

      <div className={ 'sidebar__content-entry-content' }>
        <div className={ styles.sidebarContentDimensions }>
          <div className={ 'entry-content__dimensions-label' }>
            <p>{t('width')}</p>
            <p>{t('height')}</p>
          </div>
          <div className={ 'm-t-mini entry-content__dimensions-content' }>
            <p>{width} px</p>
            <p>{height} px</p>
          </div>
        </div>

        <div className={ ['m-t-small', styles.sidebarContentDownload].join(' ') }>
          <p className={ 'sidebar__content-label' }>{t('download')}</p>

          <div className={ 'entry-content__download-content' }>
            <div className={ 'entry-content__download-content-thumbnail' }>
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.precreated-thumbnail') }
                onChange={ (format: string) => { setDownloadFormat(format) } }
                options={ DOWNLOAD_FORMATS }
                value={ downloadFormat }
              />

              <IconButton
                aria-label={ t('aria.asset.image-sidebar.tab.details.download-thumbnail') }
                icon={ { value: 'download' } }
                onClick={ () => { onClickDownloadByFormat(downloadFormat) } }
              />
            </div>

            <div className={ 'entry-content__download-content-custom' }>
              <CollapseItem
                { ...CUSTOM_DOWNLOAD_OPTIONS }
                defaultActive
                size={ 'small' }
                theme='simple'
              />
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
}
