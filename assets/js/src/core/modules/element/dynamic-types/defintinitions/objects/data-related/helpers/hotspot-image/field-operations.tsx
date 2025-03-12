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
import { isUndefined } from 'lodash'
import { Space } from '@Pimcore/components/space/space'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '../../../../../../../../components/input/input'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import useHotspotData
  from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hooks/use-hotspot-data'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

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
