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
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { Space } from '@Pimcore/components/space/space'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '../../../../../../../../components/input/input'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import {
  type HotspotValueMap,
  type ExpandedHotspotMarkerData
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  Checkbox
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox'
import useHotspotData from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hooks/use-hotspot-data'
import { type FormInstance } from 'antd'
import { HotspotManyToOneRelation } from './components/hotspot-many-to-one-relation/hotspot-many-to-one-relation'

interface FieldOperationsProps {
  hotspot: IHotspot | undefined
  form: FormInstance
}

const FieldOperations = ({
  hotspot,
  form
}: FieldOperationsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { fields, handleRemoveField, dataTypes } = useHotspotData(hotspot, form)

  const getTypeLabel = (type: string): string => {
    const typeObj = dataTypes.find(dataType => dataType.key === type)
    return !isUndefined(typeObj) ? typeObj.label : 'Unknown Type'
  }

  const renderFormItem = (field: ExpandedHotspotMarkerData, index: number): JSX.Element => {
    const renderInput = (): JSX.Element => {
      switch (field.type) {
        case 'checkbox':
          return (
            <Checkbox
              disableClearButton
            />
          )

        case 'textarea':
          return (
            <TextArea />
          )

        case 'textfield':
          return (
            <Input />
          )

        case 'document':
          return (
            <HotspotManyToOneRelation
              allowPathTextInput
              assetsAllowed={ false }
              dataObjectsAllowed
              documentsAllowed={ false }
              type={ 'document' }
            />
          )
        case 'asset':
          return (
            <HotspotManyToOneRelation
              allowPathTextInput
              assetsAllowed
              dataObjectsAllowed={ false }
              documentsAllowed={ false }
              type={ 'asset' }
            />
          )
        case 'object':
          return (
            <HotspotManyToOneRelation
              allowPathTextInput
              assetsAllowed={ false }
              dataObjectsAllowed
              documentsAllowed={ false }
              type={ 'object' }
            />
          )
      }
    }

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
          <Input />
        </Form.Item>
        <Form.Item
          label={ t('hotspots-markers-data-modal.data-type.value') }
          name={ `value-${index}` }
        >
          {renderInput()}
        </Form.Item>
      </Space>
    )
  }

  return (
    <>{fields.length > 0 && fields.map((field, index) => (
      <Card
        extra={
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => {
              handleRemoveField(index)
            } }
          >
            Edit
          </IconButton>
                }
        key={ index + field.type }
        title={ getTypeLabel(field.type as keyof HotspotValueMap) }
      >
        {renderFormItem(field, index)}
      </Card>
    ))}</>
  )
}

export default FieldOperations
