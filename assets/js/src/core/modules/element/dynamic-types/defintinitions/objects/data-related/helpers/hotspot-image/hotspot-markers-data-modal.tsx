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
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Input } from '@Pimcore/components/input/input'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'

interface HotspotMarkerData {
  type: 'text' | 'checkbox'
}

export interface HotspotMarkersDataModalProps {
  open: boolean
  data: HotspotMarkerData[]
  onClose: () => void
  onSave: (value: HotspotMarkerData) => void
  allowedTypes?: string[]
}

export const HotspotMarkersDataModal = ({
  open,
  data,
  onClose,
  onSave,
  allowedTypes = []
}: HotspotMarkersDataModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  // const emptyLinkValue: LinkValue = { linktype: 'direct', text: '', direct: '', fullPath: '', target: '', parameters: '', anchor: '', title: '', accesskey: '', rel: '', tabindex: '', class: '' }

  console.log('----> open', open)

  // useEffect(() => {
  //   form.setFieldsValue(convertToInternalLinkValue(value ?? emptyLinkValue))
  // }, [value])

  const handleOk = (): void => {
    // const values: InternalLinkValue = form.getFieldsValue()
    // const newValue = convertFromInternalLinkValue(values)
    // onSave(newValue)
    onClose()
  }

  const handleCancel = (): void => {
    onClose()
    // const newValue = value ?? { ...emptyLinkValue }
    // form.setFieldsValue(convertToInternalLinkValue(newValue))
  }

  return (
    <WindowModal
      footer={ (_, { OkBtn }) => (
        <Flex
          className="w-100"
          justify="space-between"
        >
          <IconTextButton
            icon={ { value: 'new' } }
            key="empty"
            onClick={ () => {
              console.log('new data')
            }
                        }
          >
            {t('hotspots-markers-data-modal.new-data')}
          </IconTextButton>,
          <Button
            key="ok"
            onClick={ () => {
              console.log('')
            } }
            type={ 'primary' }
          >
            {t('hotspots-markers-data-modal.save')}
          </Button>
        </Flex>
      ) }
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ open }
      size="M"
      title={ t('link.edit-title') }
    >
      <Form
        form={ form }
        layout="vertical"
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          <Form.Item
            label={ t('hotspots-markers-data-modal.name') }
            name={ t('hotspots-markers-data-modal.name') }
          >
            <Input />
          </Form.Item>
          <Card
            theme="card-with-highlight"
            title={ t('hotspots-markers-data-modal.data') }
          >
            <Space
              className='w-full'
              direction='vertical'
              size='small'
            >
              {
                <>
                  <Form.Item
                    label={ t('hotspots-markers-data-modal.data-type.name') }
                    name={ t('hotspots-markers-data-modal.data-type.name') }
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={ t('hotspots-markers-data-modal.data-type.value') }
                    name={ t('hotspots-markers-data-modal.data-type.value') }
                  >
                    <Input />
                  </Form.Item>
                </>
                            }
            </Space>
          </Card>
        </Space>
      </Form>
    </WindowModal>
  )
}
