import { Tabpanel as BaseTabPanel } from "@Pimcore/components/tabpanel/tabpanel"
import React from "react"
import { GdprDataRow, GdprSearchDataApiResponse, useGdprListProvidersQuery } from "../../gdpr-data-extractor-api-slice.gen"
import { isNil } from "lodash"
import { container } from "@Pimcore/app/depency-injection"
import { DynamicTypeGDPRProviderRegistry } from "../../dynamic-types/registry/dynamic-type-gdpr-provider-registry"
import { serviceIds } from "@Pimcore/app/config/services/service-ids"

export interface GDPRProviderTabProps<T> {
  data: T[]
  providerKey: string
  isLoading?: boolean
}

interface TabpanelProps {
  data?: GdprSearchDataApiResponse['items']
  onProviderChange?: (providerKey: string) => void
  isLoading?: boolean
}

export const Tabpanel = ({ data, onProviderChange, isLoading }: TabpanelProps): React.JSX.Element => {
  const gdprProviderRegistry = container.get<DynamicTypeGDPRProviderRegistry>(serviceIds['DynamicTypes/GDPRProviderRegistry'])
  const { data: providerData, isLoading: isProvidersLoading } = useGdprListProvidersQuery()

  /*if (isNil(data)) {
    return <></>
  }*/

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
            isLoading: isLoading || isProvidersLoading
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