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

import React from 'react'
import { useStyle } from './details.styles'
import { Button, Collapse, type CollapseProps, Form, Input, Select } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'

interface AssetEditorSidebarDetailsViewProps {
  width?: number
  height?: number
  onClickDownloadByFormat: (format: string) => void
  onClickCustomDownload: () => void
}

export const AssetEditorSidebarDetailsView = ({
  width,
  height,
  onClickDownloadByFormat,
  onClickCustomDownload
}: AssetEditorSidebarDetailsViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()

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
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label={ t('height') }
              name={ 'height' }
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <div className={ 'entry-content__download-content-custom__others' }>
            <div>
              <Form.Item
                label={ t('quality') }
                name={ 'quality' }
              >
                <Input
                  type="number"
                />
              </Form.Item>

              <Form.Item
                label={ 'DPI' }
                name={ 'dpi' }
              >
                <Input
                  type="number"
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item name={ 'mode' }>
                <Select
                  aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
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
              onClick={ () => { onClickCustomDownload() } }
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
                defaultValue="original"
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
                onClick={ () => { onClickDownloadByFormat('web') } }
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
