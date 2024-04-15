import React from 'react'
import { useStyle } from './details.styles'
import { Button, Collapse, type CollapseProps, Form, Input, Select } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'

export const AssetEditorSidebarDetailsTab = (): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()
  const customDownloadOptions: CollapseProps['items'] = [
    {
      key: 1,
      label: 'Custom Download',
      children: (
        <Form layout="vertical">
          <div className={ 'entry-content__download-content-custom__dimensions' }>
            <Form.Item
              label={ 'Width' }
              name={ 'width' }
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label={ 'Height' }
              name={ 'height' }
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <div className={ 'entry-content__download-content-custom__others' }>
            <div>
              <Form.Item
                label={ 'Quality' }
                name={ 'quality' }
              >
                <Input
                  defaultValue={ 3 }
                  type="number"
                />
              </Form.Item>

              <Form.Item
                label={ 'DPI' }
                name={ 'dpi' }
              >
                <Input
                  defaultValue={ 3 }
                  type="number"
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item name={ 'mode' }>
                <Select
                  aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode') }
                  defaultValue="mode"
                >
                  <Select.Option value="mode">Mode</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name={ 'format' }>
                <Select
                  aria-label={ t('aria.asset.image-sidebar.tab.details.custom-thumbnail-format') }
                  defaultValue="format"
                >
                  <Select.Option value="format">Format</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className={ 'entry-content__download-content-custom__button' }>
            <Button aria-label={ t('aria.asset.image-sidebar.tab.details.download-custom-thumbnail') }>
              Download
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
            <p>Width</p>
            <p>Height</p>
          </div>
          <div className={ 'entry-content__dimensions-content' }>
            <p>256 px</p>
            <p>792 px</p>
          </div>
        </div>

        <div className={ styles.sidebarContentDownload }>
          <p className={ 'sidebar__content-label' }>Download</p>

          <div className={ 'entry-content__download-content' }>
            <div className={ 'entry-content__download-content-thumbnail' }>
              <Select
                aria-label={ t('aria.asset.image-sidebar.tab.details.precreated-thumbnail') }
                defaultValue="original"
              >
                <Select.Option value="original">Original File</Select.Option>
                <Select.Option value="sample">Sample</Select.Option>
              </Select>

              <Button
                aria-label={ t('aria.asset.image-sidebar.tab.details.download-thumbnail') }
                icon={ <Icon name={ 'download-02' } /> }
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
