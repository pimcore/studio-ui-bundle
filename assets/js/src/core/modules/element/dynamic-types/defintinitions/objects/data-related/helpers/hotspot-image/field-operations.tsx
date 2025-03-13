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
import {
  type HotspotMarkerData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { isNull, isUndefined } from 'lodash'
import { Text as TextField } from '@Pimcore/components/text/text'
import { Space } from '@Pimcore/components/space/space'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '../../../../../../../../components/input/input'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import useHotspotData
  from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hooks/use-hotspot-data'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import {
  Checkbox
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/checkbox/checkbox'
import {
  ManyToOneRelation
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { Flex } from '@Pimcore/components/flex/flex'

interface FieldOperationsProps {
  hotspot: IHotspot | undefined
  form: any
}

const FieldOperations = ({
  hotspot,
  form
}: FieldOperationsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { fields, handleFieldChange, handleRemoveField, dataTypes } = useHotspotData(hotspot, form)

  const getTypeLabel = (type: string): string => {
    const typeObj = dataTypes.find(dataType => dataType.key === type)
    return !isUndefined(typeObj) ? typeObj.label : 'Unknown Type'
  }

  const renderFormItem = (field: HotspotMarkerData, index: number): JSX.Element => {
    const renderInput = (): JSX.Element => {
      switch (field.type) {
        case 'checkbox':
          return (
            <Flex gap={ 'small' }>
              <Checkbox
                checked={ field.value === 'true' }
                onChange={ (checked) => {
                  !isNull(checked) && !isUndefined(checked) && handleFieldChange(index, 'value', checked ? 'true' : 'false')
                } }
              />
              <TextField>{t('hotspots-markers-data-modal.data-type.checkbox')}</TextField>
            </Flex>
          )

        case 'textarea':
          return (
            <TextArea
              onChange={ (e) => {
                handleFieldChange(index, 'value', e.target.value)
              } }
              value={ field.value }
            />
          )

        case 'textfield':
          return (
            <Input
              onChange={ (e) => {
                handleFieldChange(index, 'value', e.target.value)
              } }
              value={ field.value }
            />
          )

        case 'document':
          return (
            <ManyToOneRelation
              allowPathTextInput
              assetsAllowed={ false }
              dataObjectsAllowed
              documentsAllowed={ false }
            />
          )
        case 'asset':
          return (
            <ManyToOneRelation
              allowPathTextInput
              assetsAllowed
              dataObjectsAllowed={ false }
              documentsAllowed={ false }
            />
          )
        case 'object':
          return (
            <ManyToOneRelation
              allowPathTextInput
              assetsAllowed={ false }
              dataObjectsAllowed
              documentsAllowed={ false }
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
          <Input
            onChange={ (e) => { handleFieldChange(index, 'name', e.target.value) } }
            value={ field.name }
          />
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
        key={ index }
        title={ getTypeLabel(field.type) }
      >
        {renderFormItem(field, index)}
      </Card>
    ))}</>
  )
}

export default FieldOperations
