import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { Button } from "@Pimcore/components/button/button"
import { Dropdown, DropdownProps, ItemType } from "@Pimcore/components/dropdown/dropdown"
import { usePerspectiveWidgetGetConfigCollectionQuery } from "@Pimcore/modules/perspectives/perspectives-slice.enhanced"
import { DynamicTypeWidgetTypeRegistry } from "@Pimcore/modules/widget-editor/custom-view-editor/dynmic-types/registry/dynamic-type-widget-type-registry"
import React from "react"
import { useTranslation } from "react-i18next"
import { useWidgetConfiguratorContext } from "../../context/hooks/use-widget-configurator-context"

export const AddWidgetDropdown = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { onAdd } = useWidgetConfiguratorContext()
  const dynamicType = container.get<DynamicTypeWidgetTypeRegistry>(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry'])
  const { data: widgets, isFetching } = usePerspectiveWidgetGetConfigCollectionQuery()

  const handleWidgetClick = (widget: any): void => {
    onAdd?.(widget)
  }

  const menu: DropdownProps['menu']['items'] = [
    ...dynamicType.getMenuItems(widgets?.items ?? [], handleWidgetClick)
  ]

  return (
    <Dropdown
      menu={{
        items: menu
      }}
    >
      <Button
        type="default"
        loading={isFetching}
      >
        {t('add')}
      </Button>
    </Dropdown>
  )
}