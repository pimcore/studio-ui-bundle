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
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Input } from '@Pimcore/components/input/input'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'

type HotspotMarkerDataHotspotMarkerDataType = 'textfield' | 'textarea' | 'checkbox' | 'object' | 'document' | 'asset'

interface HotspotMarkerData {
  id: number
  type: HotspotMarkerDataHotspotMarkerDataType
}
export interface HotspotMarkersDataModalProps {
  open: boolean
  data: HotspotMarkerData[]
  onClose: () => void
  onSave: (fields: HotspotMarkerData[]) => void
}

export const HotspotMarkersDataModal = ({
  open,
  data,
  onClose,
  onSave
}: HotspotMarkersDataModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [fields, setFields] = useState<HotspotMarkerData[]>([])
  console.log('----> open', open)

  // useEffect(() => {
  //   transform data into fields here
  // }, [data])

  const handleSave = (): void => {
    onSave(fields)
    onClose()
  }

  const handleCancel = (): void => {
    onClose()
  }

  const handleTypeSelect = (type: HotspotMarkerData['type']): void => {
    setFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type }
    ])
  }

  const renderFormItem = (field: HotspotMarkerData): JSX.Element => {
    return (
      <Card
        key={ field.id }
        theme="card-with-highlight"
        title={ t(`hotspots-markers-data-modal.data.${field.type}`) }
      >
        <Space
          className="w-full"
          direction="vertical"
          size="small"
        >
          <Form.Item
            label={ t('hotspots-markers-data-modal.data-type.name') }
            name={ `name-${field.id}` }
          >
            <Input />
          </Form.Item>
          {field.type === 'checkbox'
            ? (
              <Form.Item
                label={ t('hotspots-markers-data-modal.data-type.value') }
                name={ `value-${field.id}` }
                valuePropName="checked"
              >
                <Input type="checkbox" />
              </Form.Item>
              )
            : (
              <Form.Item
                label={ t('hotspots-markers-data-modal.data-type.value') }
                name={ `value-${field.id}` }
              >
                {field.type === 'textarea' ? <Input /> : <Input />}
              </Form.Item>
              )}
          {/* <Button type="danger" onClick={() => handleRemoveField(field.id)}> */}
          {/*    {t('hotspots-markers-data-modal.remove')} */}
          {/* </Button> */}
        </Space>
      </Card>
    )
  }

  const dataTypes = [
    { key: 'text', label: t('hotspots-markers-data-modal.data-type.text-field'), onClick: () => { handleTypeSelect('textfield') } },
    { key: 'textarea', label: t('hotspots-markers-data-modal.data-type.text-area'), onClick: () => { handleTypeSelect('textarea') } },
    { key: 'checkbox', label: t('hotspots-markers-data-modal.data-type.checkbox'), onClick: () => { handleTypeSelect('checkbox') } },
    { key: 'object', label: t('hotspots-markers-data-modal.data-type.object'), onClick: () => { handleTypeSelect('object') } },
    { key: 'document', label: t('hotspots-markers-data-modal.data-type.document'), onClick: () => { handleTypeSelect('document') } },
    { key: 'asset', label: t('hotspots-markers-data-modal.data-type.asset'), onClick: () => { handleTypeSelect('asset') } }
  ]

  return (
    <WindowModal
      footer={ () => (
        <Flex
          className="w-100"
          justify="space-between"
        >
          <Dropdown menu={ {
            items: dataTypes
          } }
          >
            <IconTextButton
              icon={ { value: 'new' } }
              key="empty"
              onClick={ () => {
                console.log('new data')
              } }
            >
              {t('hotspots-markers-data-modal.new-data')}
            </IconTextButton>
          </Dropdown>
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
      onOk={ handleSave }
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
              {fields.length > 0 ? fields.map((field) => renderFormItem(field)) : <p>{t('hotspots-markers-data-modal.no-data')}</p>}
            </Space>
          </Card>
        </Space>
      </Form>
    </WindowModal>
  )
}
