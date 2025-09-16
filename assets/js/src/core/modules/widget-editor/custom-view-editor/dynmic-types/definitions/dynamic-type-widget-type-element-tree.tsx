import { ItemType } from "@Pimcore/components/dropdown/dropdown";
import { ElementTreeWidget } from "@Pimcore/modules/perspectives/perspectives-slice.gen";
import React from "react";
import { ElementTreeWidgetTypeForm } from "../../components/widget-type-form/element-tree-widget-type-form";
import { DynamicTypeWidgetTypeAbstract } from "./dynamic-type-widget-type-abstract";

export class DynamicTypeWidgetTypeElementTree extends DynamicTypeWidgetTypeAbstract {
  readonly id = 'element_tree'
  name = 'element_tree'
  group = 'perspective-editor.system-widgets'
  icon = 'tree'

  form(): React.JSX.Element {
    return <ElementTreeWidgetTypeForm />
  }

  getSubMenuItems(configs: ElementTreeWidget[]): ItemType[] {
    const widgetTypes: Record<string, ElementTreeWidget[]> = {};

    configs.forEach((config) => {
      widgetTypes[config.elementType] = widgetTypes[config.elementType] ?? [];
      widgetTypes[config.elementType].push(config);
    })

    console.log('types', Object.entries(widgetTypes))

    return Object.entries(widgetTypes).map(([type, typeConfigs]) => {
      return {
        name: type,
        key: type,
        children: super.getSubMenuItems(typeConfigs),
      }
    })
  }
}