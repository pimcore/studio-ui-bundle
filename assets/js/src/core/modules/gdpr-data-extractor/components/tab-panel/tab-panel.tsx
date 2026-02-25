/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { Tabpanel as BaseTabPanel, type TabpanelItem } from '@Pimcore/components/tabpanel/tabpanel'
import { type SortFilter } from '@Pimcore/modules/app/types/sort-filter'
import { isNil } from 'lodash'
import React from 'react'
import { type DynamicTypeGDPRProviderRegistry } from '../../dynamic-types/registry/dynamic-type-gdpr-provider-registry'
import { type GdprSearchDataApiResponse, useGdprListProvidersQuery } from '../../gdpr-data-extractor-api-slice.gen'
import { type SearchOverrides } from '../../gdpr-data-extractor-container'

export interface GDPRProviderTabProps<T> {
  data: T[]
  providerKey: string
  isLoading?: boolean
  refresh?: (overrides?: SearchOverrides) => void
  onSortingChange?: (sorting: SortFilter) => void
}

interface TabpanelProps {
  providerKey: string
  data: GdprSearchDataApiResponse['items']
  executeSearch: (overrides?: SearchOverrides) => void
  onProviderChange?: (providerKey: string) => void
  isLoading?: boolean
  refresh?: (overrides?: SearchOverrides) => void
}

export const Tabpanel = ({ data, providerKey, onProviderChange, isLoading, executeSearch, ...props }: TabpanelProps): React.JSX.Element => {
  const gdprProviderRegistry = container.get<DynamicTypeGDPRProviderRegistry>(serviceIds['DynamicTypes/GDPRProviderRegistry'])
  const { data: providerData, isLoading: isProvidersLoading } = useGdprListProvidersQuery()

  const items: TabpanelItem[] = providerData?.items
    .map((provider) => {
      const gdprProvider = gdprProviderRegistry.getDynamicType(provider.key)

      if (isNil(gdprProvider)) {
        return null
      }

      const tabData = provider.key === providerKey
        ? data
        : []

      const item: TabpanelItem = {
        key: provider.key,
        label: provider.label,
        children: gdprProvider.getTabContent({
          data: tabData,
          providerKey: provider.key,
          isLoading: isLoading ?? isProvidersLoading,
          onSortingChange: (sortFilter) => {
            executeSearch({ sortFilter })
          },
          ...props
        })
      }

      return item
    })
    .filter((item) => !isNil(item)) ?? []

  return (
    <BaseTabPanel
      data-testid="gdpr-tab-panel"
      items={ items }
      onChange={ (tabKey) => {
        onProviderChange?.(providerData?.items[tabKey]?.key as string)
      } }
    />
  )
}
