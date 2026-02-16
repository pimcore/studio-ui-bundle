/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ConfigurationPartial, useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Dropdown, type DropdownMenuProps, IconTextButton } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const TopBarItemSelect = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useItemsQuery } = useSettings()
  const { isLoading, data } = useItemsQuery()
  const { setActiveConfiguration, activeConfiguration } = useItems()

  const dropdownItems: DropdownMenuProps['items'] = React.useMemo(() => {
    if (data === undefined) {
      return []
    }

    return data.items.map((configuration) => ({
      key: configuration.id,
      label: configuration.name,
      onClick: () => {
        setActiveConfiguration(configuration as ConfigurationPartial)
      }
    }))
  }, [data, setActiveConfiguration])

  return (
    <>
      {
        isLoading || data === undefined || data?.items?.length === 0
          ? <></>
          : (
            <Dropdown menu={ { items: dropdownItems } }>
              <IconTextButton
                icon={ { value: 'edit' } }
              >
                { activeConfiguration !== undefined ? activeConfiguration.name : t('field-definitions.select-item-configuration') }
              </IconTextButton>
            </Dropdown>
            )
      }
    </>
  )
}
