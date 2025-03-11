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

import React, { useEffect, useState } from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Input } from '@Pimcore/components/input/input'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Tag } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { isNull, isUndefined } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

type HotspotMarkerDataHotspotMarkerDataType = 'textfield' | 'textarea' | 'checkbox' | 'object' | 'document' | 'asset'
export interface HotspotMarkerData {
  hotSpotId: number
  type: HotspotMarkerDataHotspotMarkerDataType
  name: string
  value: string
}

export interface HotspotMarkersDataModalProps {
  editModeHotspotId: number | undefined
  hotspot: IHotspot | undefined
  onClose: () => void
  onUpdate: (item: IHotspot) => void
}

export const HotspotMarkersDataModal = ({
  editModeHotspotId,
  hotspot,
  onClose,
  onUpdate
}: HotspotMarkersDataModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [fields, setFields] = useState<HotspotMarkerData[]>([])
  const [hotspotName, setHotspotName] = useState<string>('')
  useEffect(() => {
    if (!isUndefined(hotspot) && !isUndefined(hotspot.data)) {
      setFields(hotspot.data)
      form.setFieldsValue(
        hotspot.data.reduce<Record<string, string>>((acc, field, index) => {
          acc[`name-${index}`] = field.name
          acc[`value-${index}`] = field.value
          return acc
        }, {})
      )
      !isUndefined(hotspot.name) && !isNull(hotspot.name) && setHotspotName(hotspot.name)
      form.setFieldsValue({ hotspotName: hotspot.name })
    }
  }, [hotspot])

  const handleSave = (): void => {
    if (isUndefined(hotspot)) return
    form.validateFields().then(() => {
      const updatedHotspot = { ...hotspot, data: fields, name: hotspotName }
      onUpdate(updatedHotspot)
      onClose()
    }).catch((error) => {
      console.error('Validation failed:', error)
    })
  }

  const handleCancel = (): void => {
    onClose()
  }

  const handleTypeSelect = (hotSpotId: number, type: HotspotMarkerData['type']): void => {
    setFields((prevFields) => [
      ...prevFields,
      {
        hotSpotId,
        type,
        name: '',
        value: type === 'checkbox' ? 'false' : ''
      }
    ])
  }

  const handleRemoveField = (index: number): void => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index))
  }
  const handleFieldChange = (index: number, key: keyof HotspotMarkerData, value: string): void => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field
      )
    )
  }
  const renderFormItem = (field: HotspotMarkerData, index: number): JSX.Element => {
    return (
      <Space
        className="w-full"
        direction="vertical"
        size="small"
      >
        <Form.Item
          label={ t('hotspots-markers-data-modal.data-type.name') }
          name={ `name-${index}` }
        >
          <Input
            onChange={ (e) => {
              handleFieldChange(index, 'name', e.target.value)
            } }
            value={ field.name }
          />
        </Form.Item>
        {field.type === 'checkbox'
          ? (
            <Form.Item
              label={ t('hotspots-markers-data-modal.data-type.value') }
              name={ `value-${index}` }
              valuePropName="checked"
            >
              <Input
                checked={ field.value === 'true' }
                onChange={ (e) => {
                  handleFieldChange(index, 'value', e.target.checked ? 'true' : 'false')
                } }
                type="checkbox"
              />
            </Form.Item>
            )
          : (
            <Form.Item
              label={ t('hotspots-markers-data-modal.data-type.value') }
              name={ `value-${index}` }
            >
              {field.type === 'textarea'
                ? (
                  <Input
                    onChange={ (e) => {
                      handleFieldChange(index, 'value', e.target.value)
                    } }
                    value={ field.value }
                  />
                  )
                : (
                  <Input
                    onChange={ (e) => {
                      handleFieldChange(index, 'value', e.target.value)
                    } }
                    value={ field.value }
                  />
                  )}
            </Form.Item>
            )}
      </Space>
    )
  }
  const dataTypes = [
    {
      key: 'textfield',
      label: t('hotspots-markers-data-modal.data-type.text-field'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'textfield')
      }
    },
    {
      key: 'textarea',
      label: t('hotspots-markers-data-modal.data-type.text-area'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'textarea')
      }
    },
    {
      key: 'checkbox',
      label: t('hotspots-markers-data-modal.data-type.checkbox'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'checkbox')
      }
    },
    {
      key: 'object',
      label: t('hotspots-markers-data-modal.data-type.object'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'object')
      }
    },
    {
      key: 'document',
      label: t('hotspots-markers-data-modal.data-type.document'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'document')
      }
    },
    {
      key: 'asset',
      label: t('hotspots-markers-data-modal.data-type.asset'),
      onClick: () => {
        !isUndefined(editModeHotspotId) && handleTypeSelect(editModeHotspotId, 'asset')
      }
    }
  ]
  const getTypeLabel = (type: string): string => {
    const typeObj = dataTypes.find(dataType => dataType.key === type)
    return !isUndefined(typeObj) ? typeObj.label : 'Unknown Type'
  }
  const items: StackListProps['items'] = fields.map((field, index) => {
    return ({
      id: index,
      children: <Tag>{getTypeLabel(field.type)}</Tag>,
      renderRightToolbar: <IconButton
        icon={ { value: 'close' } }
        key={ 'remove' }
        onClick={ () => {
          handleRemoveField(index)
        } }
                          />,
      body: renderFormItem(field, index)
    })
  })
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
              handleSave()
            } }
            type={ 'primary' }
          >
            {t('hotspots-markers-data-modal.save')}
          </Button>
        </Flex>
      ) }
      okText={ t('save') }
      onCancel={ handleCancel }
      open={ !isUndefined(editModeHotspotId) }
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
            name="hotspotName"
          >
            <Input
              onChange={ (e) => {
                setHotspotName(e.target.value)
              } }
            />
          </Form.Item>
          {fields.length > 0 && <StackList items={ items } />}
        </Space>
      </Form>
    </WindowModal>
  )
}
