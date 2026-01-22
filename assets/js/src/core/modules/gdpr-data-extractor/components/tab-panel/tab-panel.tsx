import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { Tabpanel as BaseTabPanel } from "@Pimcore/components/tabpanel/tabpanel"
import { SortFilter } from "@Pimcore/modules/app/types/sort-filter"
import { isNil } from "lodash"
import React from "react"
import { DynamicTypeGDPRProviderRegistry } from "../../dynamic-types/registry/dynamic-type-gdpr-provider-registry"
import { GdprSearchDataApiResponse, useGdprListProvidersQuery } from "../../gdpr-data-extractor-api-slice.gen"
import { SearchOverrides } from "../../gdpr-data-extractor-container"
import { SortingState } from "@tanstack/react-table"
import { transformToSortFilter, transformToSortingState } from "@Pimcore/modules/app/utils/sort-filter-helper"

export interface GDPRProviderTabProps<T> {
  data: T[]
  providerKey: string
  sorting: SortingState
  isLoading?: boolean
  refresh?: (overrides?: SearchOverrides) => void
  onSortingChange?: (sorting: SortingState) => void
}

interface TabpanelProps {
  sortFilter: SortFilter
  data?: GdprSearchDataApiResponse['items']
  onProviderChange?: (providerKey: string) => void
  onSortingChange?: (sortFilter: SortFilter | null) => void
  isLoading?: boolean
  refresh?: (overrides?: SearchOverrides) => void
}

export const Tabpanel = ({ data, onProviderChange, isLoading, onSortingChange, sortFilter, ...props }: TabpanelProps): React.JSX.Element => {
  const gdprProviderRegistry = container.get<DynamicTypeGDPRProviderRegistry>(serviceIds['DynamicTypes/GDPRProviderRegistry'])
  const { data: providerData, isLoading: isProvidersLoading } = useGdprListProvidersQuery()

  const items = () => {
    return providerData?.items
      .map((provider) => {
        const gdprProvider = gdprProviderRegistry.getDynamicType(provider.key)

        if (isNil(gdprProvider)) {
          return null
        }

        const tabData = data?.find((d) => d.providerKey === provider.key)?.results ?? []

        return {
          key: provider.key,
          label: provider.label,
          children: gdprProvider.getTabContent({
            data: tabData,
            providerKey: provider.key,
            isLoading: isLoading || isProvidersLoading,
            sorting: transformToSortingState(sortFilter),
            onSortingChange: (sorting) => {
              onSortingChange?.(
                transformToSortFilter(sorting)
              )
            },
            ...props
          } as GDPRProviderTabProps<any>)
        }
      })
      .filter((item) => !isNil(item)) ?? []
  }

  return (
    <BaseTabPanel
      items={items()}
      onChange={(tabKey) => {
        onProviderChange?.(providerData?.items[tabKey]?.key)
      }}
    />
  )
}