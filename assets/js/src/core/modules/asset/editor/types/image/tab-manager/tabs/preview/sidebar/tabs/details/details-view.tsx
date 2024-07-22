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
import { Button, Collapse, type CollapseProps, Form, Input, Select } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'

export interface CustomDownloadProps {
  width: number
  height: number
  quality: number
  dpi: number
  mode: string
  format: string
}

interface AssetEditorSidebarDetailsViewProps {
  width?: number
  height?: number
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
  const { styles } = useStyle()
  const { t } = useTranslation()
  const [downloadFormat, setDownloadFormat] = useState('original')
  const [customWidth, setCustomWidth] = useState(-1)
  const [customHeight, setCustomHeight] = useState(-1)
  const [customQuality, setCustomQuality] = useState(-1)
  const [customDPI, setCustomDPI] = useState(-1)
  const [customMode, setCustomMode] = useState('')
  const [customFormat, setCustomFormat] = useState('')

  const modes = [
    {
      value: 'resize',
      label: t('resize')
    }, {
      value: 'scaleByWidth',
      label: t('scaleByWidth')
    }, {
      value: 'scaleByHeight',
      label: t('scaleByHeight')
    }
  ]

  const formats = [
    {
      value: 'JPEG',
      label: 'JPEG'
    }, {
      value: 'PNG',
      label: 'PNG'
    }
  ]

  const downloadFormats = [
    {
      value: 'original',
      label: t('asset.sidebar.original-file')
    }, {
      value: 'web',
      label: t('asset.sidebar.web-format')
    }, {
      value: 'print',
      label: t('asset.sidebar.print-format')
    }, {
      value: 'office',
      label: t('asset.sidebar.office-format')
    }
  ]

  const customDownloadOptions: CollapseProps['items'] = [
    {
      key: 1,
      label: 'Custom Download',
      children: (
        <Form layout="vertical">
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
              <Form.Item name={ 'mode' }>
                <Select
                  aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
                  onChange={ mode => { setCustomMode(mode as string) } }
                  placeholder={ t('mode') }
                >
                  {modes.map((mode) => (
                    <Select.Option
                      key={ mode.value }
                      value={ mode.value }
                    >{mode.label}</Select.Option>
                  ))
                  }
                </Select>
              </Form.Item>

              <Form.Item name={ 'format' }>
                <Select
                  aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-format') }
                  onChange={ format => { setCustomFormat(format as string) } }
                  placeholder={ t('format') }
                >
                  {formats.map((format) => (
                    <Select.Option
                      key={ format.value }
                      value={ format.value }
                    >{format.label}</Select.Option>
                  ))
                  }
                </Select>
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
  ]

  return (
    <div className={ styles.sidebarContentEntry }>
      <p className={ 'sidebar__content-label' }>Details</p>

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
          <p className={ 'sidebar__content-label' }>{t('download')}</p>

          <div className={ 'entry-content__download-content' }>
            <div className={ 'entry-content__download-content-thumbnail' }>
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.precreated-thumbnail') }
                onChange={ format => { setDownloadFormat(format) } }
                value={ downloadFormat }
              >
                {downloadFormats.map((format) => (
                  <Select.Option
                    key={ format.value }
                    value={ format.value }
                  >{format.label}</Select.Option>
                ))
                }
              </Select>

              <Button
                aria-label={ t('aria.asset.image-sidebar.tab.details.download-thumbnail') }
                icon={ <Icon name={ 'download-02' } /> }
                onClick={ () => { onClickDownloadByFormat(downloadFormat) } }
              />
            </div>

            <div className={ 'entry-content__download-content-custom' }>
              <Collapse
                defaultActiveKey={ ['1'] }
                items={ customDownloadOptions }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
