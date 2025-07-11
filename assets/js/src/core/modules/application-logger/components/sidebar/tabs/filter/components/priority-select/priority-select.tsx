import { useBundleApplicationLoggerListPrioritiesQuery } from "@Pimcore/modules/application-logger/application-logger-api-slice-enhanced";
import { Select } from "@sdk/components";
import { DefaultOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFilter } from "../../provider/filter-provider/use-filter";

export const PrioritySelect = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useBundleApplicationLoggerListPrioritiesQuery();
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const { logLevel, setLogLevel } = useFilter()

  useEffect(() => {
    if (data?.priorities !== undefined && data.priorities.length > 0) {
      const tmpOptions: DefaultOptionType[] = [];
      data.priorities.forEach((priority: number) => {
        tmpOptions.push({
          value: priority.toString(),
          label: t('application-logger.filter.priority-level.' + priority.toString()),
        })
      })

      setOptions(tmpOptions);
    }
  }, [data])

  return (
    <Select
      loading={isLoading}
      options={options ?? []}
      value={logLevel ?? undefined}
      onChange={(value: string | number) => {
        setLogLevel(value as string)
      }}
    />
  )
}