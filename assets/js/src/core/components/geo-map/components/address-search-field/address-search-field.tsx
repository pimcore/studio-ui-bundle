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
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { ERROR_ADDRESS_NOT_FOUND, geoCode } from '@Pimcore/components/geo-map/utils/geocode'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

interface AddressSearchFieldProps {
  onSearch: (geoPoint?: GeoPoint) => void
  disabled?: boolean
}

export const AddressSearchField = (props: AddressSearchFieldProps): React.JSX.Element => {
  const { t } = useTranslation()
  const alertModal = useAlertModal()
  const settings = useSettings()

  const onSearch = async (value: string): Promise<void> => {
    if (value === '') {
      props.onSearch(undefined); return
    }

    await geoCode(value, settings.maps.geocoding_url_template as string)
      .then(props.onSearch)
      .catch((error: Error) => {
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

  return (
    <Input.Search
      className="address-search-field"
      disabled={ props.disabled }
      onSearch={ onSearch }
      placeholder={ t('search-address') }
    />
  )
}
