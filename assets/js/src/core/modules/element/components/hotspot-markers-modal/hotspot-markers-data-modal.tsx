/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Input } from '@Pimcore/components/input/input'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isUndefined } from 'lodash'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import useHotspotData
  from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hooks/use-hotspot-data'
import FieldOperations
  from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/field-operations'

export interface HotspotMarkersDataModalProps {
  hotspot: IHotspot | undefined
  onClose: () => void
  onUpdate: (item: IHotspot) => void
}

export const HotspotMarkersDataModal = ({
  hotspot,
  onClose,
  onUpdate
}: HotspotMarkersDataModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const { getFieldsData, dataTypes } = useHotspotData(hotspot, form)

  const handleSave = (): void => {
    if (isUndefined(hotspot)) return
    form.validateFields().then(() => {
      const values = form.getFieldsValue()
      const updatedHotspot = { ...hotspot, data: getFieldsData(), name: values.hotspotName }

      onUpdate(updatedHotspot)
      onClose()
    }).catch((error) => {
      console.error('Validation failed:', error)
    })
  }

  const handleCancel = (): void => {
    onClose()
  }

  const dataModalFooter = (
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
        {t('hotspots-markers-data-modal.apply')}
      </Button>
    </Flex>
  )

  return (
    <WindowModal
      footer={ dataModalFooter }
      okText={ t('save') }
      onCancel={ handleCancel }
      open={ !isUndefined(hotspot) }
      size="M"
      title={ t('hotspots-markers-data-modal.title') }
      zIndex={ 1000 }
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
            <Input />
          </Form.Item>
          <FieldOperations
            form={ form }
            hotspot={ hotspot }
          />
        </Space>
      </Form>
    </WindowModal>
  )
}