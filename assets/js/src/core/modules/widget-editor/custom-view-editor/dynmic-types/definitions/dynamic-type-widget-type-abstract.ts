import { DynamicTypeAbstract } from "@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract";
import { WidgetConfig } from "@sdk/api/perspectives";
import { ItemType } from "@sdk/components";
import { injectable } from "inversify";
import React from "react";

@injectable()
export abstract class DynamicTypeWidgetTypeAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  name: string
  group: string
  icon: string

  abstract form(): React.JSX.Element

  getSubMenuItems(configs: WidgetConfig[]): ItemType[] {
    return configs.map((config) => {
      return {
        label: config.name,
        key: config.id,
        icon: config.icon.value,
      }
    })
  }
}