/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AreaProvider, type AreaProviderProps } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { ItemsProvider } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { ItemsSidebar } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar'
import { ItemsTabs } from '@Pimcore/modules/field-definitions/components/editor/items/tabs'
import { SettingsProvider, type SettingsProviderProps } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { ConfigLayout } from '@sdk/components'
import React from 'react'

export interface EditorProps {
  area: AreaProviderProps['area']
  AddModal: SettingsProviderProps['AddModal']
  useItemsQuery: SettingsProviderProps['useItemsQuery']
  useItemsDeleteMutation: SettingsProviderProps['useItemsDeleteMutation']
  useDetailGeneralSettingsQuery: SettingsProviderProps['useDetailGeneralSettingsQuery']
  useDetailLayoutQuery: SettingsProviderProps['useDetailLayoutQuery']
  useDetailUpdateMutation: SettingsProviderProps['useDetailUpdateMutation']
}

export const Editor = (props: EditorProps): React.JSX.Element => {
  const { area, ...rest } = props

  return (
    <AreaProvider area={ area }>
      <SettingsProvider
        { ...rest }
      >
        <ItemsProvider>
          <ConfigLayout
            leftItem={ {
              minSize: 250,
              maxSize: 350,
              size: 250,
              children: <ItemsSidebar />
            } }
            resizeAble
            rightItem={ {
              children: <ItemsTabs />
            } }
          />
        </ItemsProvider>
      </SettingsProvider>
    </AreaProvider>
  )
}
