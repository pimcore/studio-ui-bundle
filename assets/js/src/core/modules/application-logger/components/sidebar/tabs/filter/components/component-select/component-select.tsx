import { useBundleApplicationLoggerListComponentsQuery } from "@Pimcore/modules/application-logger/application-logger-api-slice.gen";
import { Select } from "@sdk/components";
import { DefaultOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import { useFilter } from "../../provider/filter-provider/use-filter";

export const ComponentSelect = (): React.JSX.Element => {
  const { data, isLoading } = useBundleApplicationLoggerListComponentsQuery();
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const { component, setComponent } = useFilter()

  useEffect(() => {
    if (data?.items !== undefined && data.items.length > 0) {
      const tmpOptions: DefaultOptionType[] = [];
      data.items.forEach((component: string) => {
        tmpOptions.push({
          value: component,
          label: component,
        })
      })

      setOptions(tmpOptions);
    }
  }, [data])

  return (
    <Select
      loading={isLoading}
      options={options ?? []}
      value={component ?? undefined}
      onChange={(value: string | number) => {
        setComponent(value as string)
      }}
    />
  )
}