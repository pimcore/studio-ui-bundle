import { type Meta } from '@storybook/react'
import { DropdownMenu as DropdownMenuComponent } from './dropdown-menu'
import {Button, MenuProps} from "antd";
import {Icon} from "@Pimcore/components/icon/icon";
import React from "react";
import i18n from "@Pimcore/app/i18n";
import {useStyle} from "@Pimcore/components/dropdown-menu/dropdown-menu.styles";

const config: Meta = {
  title: 'Pimcore studio/UI/DropdownMenu',
  component: DropdownMenuComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const styles = useStyle //Doesn't work - it's only for demonstration

const children =
    <Button
      size="small"
      icon={<Icon name="dots-horizontal"/>}
    />

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
        <div>
          <Icon name="target" className={styles['menu-icon']} />
          {i18n.t("asset.asset-preview.locate-in-tree")}
        </div>
    ),
  },
  {
    key: '2',
    label: (
        <div>
          <Icon name="rich-edit" className={styles['menu-icon']} />
          {i18n.t("asset.asset-preview.rename")}
        </div>
    ),
  },
  {
    key: '3',
    label: (
        <div>
          <Icon name="download-02" className={styles['menu-icon']} />
          {i18n.t("asset.asset-preview.download-zip")}
        </div>
    ),
  }
]

export const _default = {
  args: {
    children: children,
    placement: "bottomLeft",
    items: items
  }
}
