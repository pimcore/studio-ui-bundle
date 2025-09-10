import { Select, SelectProps } from "@Pimcore/components/select/select"
import { container, serviceIds } from "@sdk/app"
import React from "react"
import { useTranslation } from "react-i18next"
import { WidgetTypeRegistry } from "../../registry/widget-type-registry"

export enum WidgetTypes {
  ElementTree = 'element_tree'
}

export const WidgetTypeSelect = (props: SelectProps): React.JSX.Element => {
  const { t } = useTranslation()

  const widgetTypes = container.get<WidgetTypeRegistry>(serviceIds['WidgetEditor/WidgetTypeRegistry']).getAllWidgetTypes()

  return (
    <Select
      {...props}
      options={widgetTypes.map(type => ({
        label: t(`widget-editor.create-form.widgetType.${type.id}`),
        value: type.id
      }))}
    />
  )
}