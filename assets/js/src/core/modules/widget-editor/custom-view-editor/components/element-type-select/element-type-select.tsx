import { Select, SelectProps } from "@Pimcore/components/select/select"
import { elementTypes } from "@Pimcore/types/enums/element/element-type"
import React from "react"
import { useTranslation } from "react-i18next"

export const ElementTypeSelect = (props: SelectProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Select
      {...props}
      options={[
        {
          label: t('document'),
          value: elementTypes.document
        },
        {
          label: t('asset'),
          value: elementTypes.asset
        },
        {
          label: t('data-object'),
          value: elementTypes.dataObject
        }
      ]}
    />
  )
}