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
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'

interface HotspotMarkerData {
  type: 'text' | 'checkbox'
}

export interface HotspotMarkersDataModalProps {
  open: boolean
  data: HotspotMarkerData[]
  onClose: () => void
  onSave: (value: HotspotMarkerData) => void
}

export const HotspotMarkersDataModal = ({
  open,
  data,
  onClose,
  onSave
}: HotspotMarkersDataModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  console.log('----> open', open)

  // useEffect(() => {
  //   transform data into fields here
  // }, [data])

  const handleSave = (): void => {
    onClose()
  }

  const handleCancel = (): void => {
    onClose()
  }

  const dataTypes = [{
    key: 1,
    label: t('hotspots-markers-data-modal.data-type.text-field'),
    onClick: () => {
      console.log('----> clicked text field')
    }
  },
  {
    key: 2,
    label: t('hotspots-markers-data-modal.data-type.text-area'),
    onClick: () => {
      console.log('----> clicked text area')
    }
  },
  {
    key: 3,
    label: t('hotspots-markers-data-modal.data-type.checkbox'),
    onClick: () => {
      console.log('----> clicked text area')
    }
  },
  {
    key: 4,
    label: t('hotspots-markers-data-modal.data-type.object'),
    onClick: () => {
      console.log('----> clicked text area')
    }
  },
  {
    key: 5,
    label: t('hotspots-markers-data-modal.data-type.document'),
    onClick: () => {
      console.log('----> clicked text area')
    }
  },
  {
    key: 6,
    label: t('hotspots-markers-data-modal.data-type.asset'),
    onClick: () => {
      console.log('----> clicked text area')
    }
  }]

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
