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
import { type GeoPoint } from '@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button, InputNumber, Tooltip } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { Icon } from '@Pimcore/components/icon/icon'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Box } from '@Pimcore/components/box/box'
import Search from 'antd/es/input/Search'
import { useStyles } from '@Pimcore/components/geo-point-picker/geo-point-picker.styles'
import { ERROR_ADDRESS_NOT_FOUND, geoCode } from '@Pimcore/components/geo-map/utils/geocode'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

export interface GeoPointPickerFooterProps {
  onChange?: (value?: GeoPoint) => void
  value?: GeoPoint
}

interface GeoPointFormValues {
  lat: number | undefined
  lng: number | undefined
}

export const GeoPointPickerFooter = (props: GeoPointPickerFooterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [value, setValue] = React.useState<GeoPointFormValues>({ lat: props.value?.lat, lng: props.value?.lng })
  const [form] = Form.useForm()
  const alertModal = useAlertModal()

  const valueToGeoPoint = (val: GeoPointFormValues | undefined): GeoPoint | undefined => {
    if (val?.lat === undefined || val.lng === undefined) {
      return undefined
    }

    return {
      lat: val.lat,
      lng: val.lng
    }
  }

  const onChange = (): void => {
    const fieldValues = form.getFieldsValue() as GeoPointFormValues
    setValue(fieldValues)
    const newValue = valueToGeoPoint(fieldValues)

    if (props.onChange !== undefined) {
      props.onChange(newValue)
    }
  }

  const emptyValue = (): void => {
    setValue({ lat: undefined, lng: undefined })
    form.resetFields()
    if (props.onChange !== undefined) {
      props.onChange(undefined)
    }
  }

  const onSearch = async (value: string): Promise<void> => {
    await geoCode(value).then((geoPoint) => {
      setValue(geoPoint)
      form.setFieldsValue(geoPoint)
      if (props.onChange !== undefined) {
        props.onChange(geoPoint)
      }
    }).catch((error: Error) => {
      if (error.message === ERROR_ADDRESS_NOT_FOUND) {
        const errorMessage = (
          <span>
            <p>{t('geocode.address-not-found')}</p>
            <strong>{t('geocode.possible-causes')}:</strong>
            <p>{t('geocode.postal-code-format-error')}</p>
          </span>
        )
        alertModal.error({ content: errorMessage })
      } else {
        alertModal.error({ content: error.message })
      }
    })
  }

  useEffect(() => {
    const newValue = { lat: props.value?.lat, lng: props.value?.lng }
    setValue(newValue)
    form.setFieldsValue(newValue)
  }, [props.value])

  return (
    <Box
      className={ styles.footer }
      padding={ { y: 'mini' } }
    >
      <Flex
        className="w-full"
        gap="mini"
      >

        <Search
          className="geo-search-field"
          onSearch={ onSearch }
          placeholder={ t('search-address') }
        />

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
                        name="lat"
                      >
                        <InputNumber onChange={ onChange } />
                      </Form.Item>
                      <Form.Item
                        label={ t('longitude') }
                        name="lng"
                      >
                        <InputNumber onChange={ onChange } />
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
              name="dots-horizontal"
                   /> }
            onClick={ (e) => { e.stopPropagation() } }
          />
        </Dropdown>

        <div className="remove-button-wrapper">
          <Tooltip
            key="external-image-delete"
            title={ t('set-to-null') }
          >
            <IconButton
              disabled={ value.lat === undefined && value.lng === undefined }
              icon={ 'delete-outlined' }
              onClick={ emptyValue }
            />
          </Tooltip>
        </div>
      </Flex>
    </Box>
  )
}
