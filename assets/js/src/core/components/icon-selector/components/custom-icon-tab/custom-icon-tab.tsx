/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { SearchInput } from '@sdk/components'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useStyles } from '../../icon-selector.styles'

export interface CustomIconTabProps {
  customIconPath: string
  onCustomIconPathChange: (icon: ElementIcon | undefined) => void
}

export const CustomIconTab = ({
  customIconPath,
  onCustomIconPathChange
}: CustomIconTabProps): React.JSX.Element => {
  const [customPathValue, setCustomPathValue] = useState<string>(customIconPath)

  const { styles } = useStyles()

  useEffect(() => {
    setCustomPathValue(customIconPath)
  }, [customIconPath])

  const handleInputSubmission = (): void => {
    if (customPathValue.trim() !== '') {
      const customIcon: ElementIcon = {
        type: 'path',
        value: customPathValue.trim()
      }
      onCustomIconPathChange(customIcon)
    } else {
      onCustomIconPathChange(undefined)
    }
  }

  return (
    <Flex
      className={ styles.customIconContainer }
      gap="large"
      vertical
    >
      <Flex
        gap="small"
        vertical
      >
        <span>{t('icon-selector.custom-icon-path')}</span>
        <SearchInput
          maxWidth={ '1000px' }
          onChange={ (e) => { setCustomPathValue(e.target.value) } }
          onSearch={ handleInputSubmission }
          placeholder={ t('icon-selector.custom-icon-path-placeholder') }
          searchButtonIcon='refresh'
          value={ customPathValue }
          withPrefix={ false }
          withoutAddon={ false }
        />
      </Flex>
    </Flex>
  )
}
