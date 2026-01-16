import { Tabpanel as BaseTabPanel } from "@Pimcore/components/tabpanel/tabpanel"
import React from "react"
import { GdprSearchDataApiResponse, useGdprListProvidersQuery } from "../../gdpr-data-extractor-api-slice.gen"
import { isNil } from "lodash"

interface TabpanelProps {
  data?: GdprSearchDataApiResponse['items']
  onProviderChange?: (providerKey: string) => void
}

export const Tabpanel = ({ data, onProviderChange }: TabpanelProps): React.JSX.Element => {
  const { data: providerData, isLoading } = useGdprListProvidersQuery()

  /*if (isNil(data)) {
    return <></>
  }*/

  return (
    <BaseTabPanel
      items={providerData?.items.map((provider) => ({
        key: provider.key,
        label: provider.label,
      })) ?? []}
      onChange={(tabKey) => {
        onProviderChange?.(providerData?.items[tabKey]?.key)
      }}
    />
  )
}