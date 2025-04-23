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

import React, { useEffect } from 'react'
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
  const [value, setValue] = React.useState<GeoPointFormValues>({ latitude: props.value?.latitude, longitude: props.value?.longitude })
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

  const onChange = (): void => {
    const fieldValues = form.getFieldsValue() as GeoPointFormValues
    setValue(fieldValues)
    const newValue = valueToGeoPoint(fieldValues)

    props.onChange?.(newValue)
  }

  const emptyValue = (): void => {
    setValue({ latitude: undefined, longitude: undefined })
    form.resetFields()
    props.onChange?.(undefined)
  }

  const onSearch = (geoPoint?: GeoPoint): void => {
    const newValue = { latitude: geoPoint?.latitude, longitude: geoPoint?.longitude }
    setValue(newValue)
    form.setFieldsValue(newValue)
    props.onChange?.(geoPoint)
  }

  useEffect(() => {
    const newValue = { latitude: props.value?.latitude, longitude: props.value?.longitude }
    setValue(newValue)
    form.setFieldsValue(newValue)
  }, [props.value])

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
                          onChange={ onChange }
                        />
                      </Form.Item>
                      <Form.Item
                        label={ t('longitude') }
                        name="longitude"
                      >
                        <InputNumber
                          disabled={ props.disabled }
                          onChange={ onChange }
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
      emptyValue={ emptyValue }
      onSearch={ onSearch }
      removeButtonDisabled={ (value.latitude === undefined && value.longitude === undefined) || props.disabled }
    />
  )
}
