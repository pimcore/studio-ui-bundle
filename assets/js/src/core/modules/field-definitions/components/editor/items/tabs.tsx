/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ItemDetail } from '@Pimcore/modules/field-definitions/components/editor/items/detail'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { Icon, type ITabsProps, Tabs } from '@sdk/components'
import React from 'react'

export const ItemsTabs = (): React.JSX.Element => {
  const { configurations, activeConfiguration, setActiveConfiguration, closeConfiguration } = useItems()

  const items: ITabsProps['items'] = configurations.map((configuration) => ({
    key: `${configuration.id}`,
    label: (configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id) ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
    icon: <Icon { ...(configuration.icon ?? { value: 'class' }) } />,
    closable: true,
    children: (
      <ItemDetail configuration={ configuration } />
    )
  }))

  return (
    <Tabs
      activeKey={ activeConfiguration?.id ?? undefined }
      fullHeight
      items={ items }

      onChange={ (configurationKey) => {
        const configuration = configurations.find(cd => cd.id === configurationKey)
        if (configuration !== undefined) {
          setActiveConfiguration(configuration)
        }
      } }

      onClose={ (configurationKey) => {
        const configuration = configurations.find(cd => cd.id === configurationKey)

        if (configuration !== undefined) {
          closeConfiguration(configuration)
        }
      } }
    />
  )
}
