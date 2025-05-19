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
import { isUndefined } from 'lodash'
import { Button, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { Icon } from '@Pimcore/components/icon/icon'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Box } from '@Pimcore/components/box/box'
import { useStyles } from '@Pimcore/components/geo-point-picker/geo-point-picker.styles'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoMapCardFooter } from '@Pimcore/components/geo-map/components/geo-map-card-footer/geo-map-card-footer'

export interface GeoPointPickerFooterProps {
  onChange?: (value?: GeoPoint) => void
  value?: GeoPoint
  disabled?: boolean
}

interface GeoPointFormValues {
  latitude: number | undefined
  longitude: number | undefined
}

export const GeoPointPickerFooter = (props: GeoPointPickerFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [form] = Form.useForm()

  const valueToGeoPoint = (val: GeoPointFormValues | undefined): GeoPoint | undefined => {
    if (val?.latitude === undefined || val.longitude === undefined) {
      return undefined
    }

    return {
      latitude: val.latitude,
      longitude: val.longitude
    }
  }

  const handleChange = (): void => {
    const fieldValues = form.getFieldsValue() as GeoPointFormValues
    const newValue = valueToGeoPoint(fieldValues)

    props.onChange?.(newValue)
  }

  const clearValue = (): void => {
    form.resetFields()
    props.onChange?.(undefined)
  }

  const handleSearch = (geoPoint?: GeoPoint): void => {
    const newValue = { latitude: geoPoint?.latitude, longitude: geoPoint?.longitude }

    form.setFieldsValue(newValue)
    props.onChange?.(geoPoint)
  }

  return (
    <GeoMapCardFooter
      disabled={ props.disabled }
      dropdown={
        <Dropdown
          menu={ {
            items: [
              {
                key: 'form',
                type: 'custom',
                component: (
                  <Box margin={ { x: 'extra-small' } }>
                    <Form
                      className={ styles.geoForm }
                      form={ form }
                      layout="vertical"
                    >
                      <Form.Item
                        label={ t('latitude') }
                        name="latitude"
                      >
                        <InputNumber
                          disabled={ props.disabled }
                          onChange={ handleChange }
                        />
                      </Form.Item>
                      <Form.Item
                        label={ t('longitude') }
                        name="longitude"
                      >
                        <InputNumber
                          disabled={ props.disabled }
                          onChange={ handleChange }
                        />
                      </Form.Item>
                    </Form>
                  </Box>
                )
              }
            ]
          } }
          placement="bottomLeft"
          trigger={ ['click'] }
        >
          <Button
            icon={ <Icon
              className='dropdown-menu__icon'
              value="more"
                   /> }
            onClick={ (e) => { e.stopPropagation() } }
          />
        </Dropdown>
          }
      emptyValue={ clearValue }
      onSearch={ handleSearch }
      removeButtonDisabled={ (isUndefined(props?.value?.latitude) && isUndefined(props?.value?.longitude)) || props.disabled }
    />
  )
}
