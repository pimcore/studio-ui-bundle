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
import { useStyles } from './geo-map-card-footer.styles'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { AddressSearchField } from '@Pimcore/components/geo-map/components/address-search-field/address-search-field'
import { Tooltip } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'

export interface GeoMapCardFooterProps {
  onSearch: (geoPoint: GeoPoint) => void
  emptyValue: () => void
  dropdown?: React.ReactNode
  disabled?: boolean
  removeButtonDisabled?: boolean
}

export const GeoMapCardFooter = (props: GeoMapCardFooterProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  return (
    <Box
      className={ styles.footer }
      padding={ { y: 'mini' } }
    >
      <Flex
        className="w-full"
        gap="mini"
      >

        { props.disabled !== true && (
          <AddressSearchField
            onSearch={ props.onSearch }
          />
        )}

        {props.dropdown}

        { props.disabled !== true && (
          <div className="remove-button-wrapper">
            <Tooltip
              title={ t('set-to-null') }
            >
              <IconButton
                disabled={ props.removeButtonDisabled }
                icon={ { value: 'trash' } }
                onClick={ props.emptyValue }
              />
            </Tooltip>
          </div>
        )}
      </Flex>
    </Box>
  )
}
