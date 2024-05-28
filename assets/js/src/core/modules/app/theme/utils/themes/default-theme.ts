/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

interface PimcoreThemeConfig {
  token: Record<string, unknown>
  components: Record<string, unknown>
}

const staticTokens = {
  token: {
    fontFamily: 'Lato, sans-serif'
  }
}

const defaultTheme = {
  token: {
    colorLinkHover: '#9254de',
    controlOutline: 'rgba(114, 46, 209, 0.1)',
    controlItemBgActive: '#f8eeff',
    colorTextTertiary: 'rgba(0, 0, 0, 0.6)',
    colorFill: 'rgba(215, 199, 236, 0.6)',
    colorFillQuaternary: 'rgba(215, 199, 236, 0.4)',
    colorBgLayout: '#fcfcfc',
    colorPrimary: '#722ed1',
    fontSize: 12,
    fontSizeHeading1: 35,
    colorIconSecondary: '#4d4169',
    colorFillNav: 'rgba(77, 65, 105, 0.08)',
    colorIconSidebar: '#22075e',
    colorBorderActive: '#00bab3',
    colorLogo: '#5520a6',
    colorBorderTertiary: '#eae8ed',
    colorTextTreeElement: '#404655',
    colorIconTree: '#404655',
    colorIconTreeUnpublished: 'rgba(64, 70, 85, 0.4)',
    paddingTabs: 8,
    colorTextSidebarTitle: '#531dab',
    colorBgToolbar: '#f5f3fa',
    colorFillActive: '#d7c7ec',
    colorFillAdditional: '#f5f3fa',
    colorBgSidebarOptions: '#f5f3fa',
    colorBgSelectedTab: '#ffffff',
    cardGutter: 2,
    cardHeight: 40,
    horizontalItemGutter: 32,
    itemActiveColor: '#531dab',
    itemColor: 'rgba(0, 0, 0, 0.65)',
    itemHoverColor: 'rgba(215, 199, 236, 0.6)',
    itemUnselectedIconColor: '#4d4169',
    colorBorderContainer: '#eae8ed',
    colorBorderActiveTab: '#00bab3',
    colorFillAlter: 'rgba(215, 199, 236, 0.4)',
    colorTextDescription: 'rgba(0, 0, 0, 0.6)',
    colorBgUnselectedTab: 'rgba(215, 199, 236, 0.4)',
    colorBgHoverUnselectedTab: 'rgba(215, 199, 236, 0.6)',
    ...staticTokens.token
  },
  components: {
    Pagination: {
      colorPrimary: '#531dab'
    },
    Tree: {
      colorBorderTree: '#eae8ed',
      colorTextTree: '#404655',
      colorPrimaryHeading: '#531dab',
      colorTextTreeUnpublished: 'rgba(0, 0, 0, 0.25)'
    },
    Progress: {
      colorText: 'rgba(0, 0, 0, 0.65)',
      circleTextColor: 'rgba(0, 0, 0, 0.25)'
    },
    Divider: {
      colorSplit: '#d3adf7'
    },
    Button: {
      defaultBorderColor: '#d3adf7',
      defaultColor: '#722ed1',
      defaultGhostBorderColor: '#d9d9d9',
      defaultGhostColor: '#722ed1',
      textGhostColor: 'rgba(0, 0, 0, 0.88)'
    },
    Breadcrumb: {
      lastItemColor: '#531dab'
    },
    Menu: {
      darkItemColor: 'rgba(255, 255, 255, 0.65)',
      darkItemDisabledColor: 'rgba(255, 255, 255, 0.25)',
      darkGroupTitleColor: 'rgba(255, 255, 255, 0.65)'
    },
    Collapse: {
      headerBg: 'rgba(0, 0, 0, 0.04)'
    },
    Image: {
      previewOperationColor: 'rgba(255, 255, 255, 0.65)',
      previewOperationColorDisabled: 'rgba(255, 255, 255, 0.25)',
      previewOperationHoverColor: 'rgba(255, 255, 255, 0.85)'
    },
    Table: {
      cellPaddingBlockSM: 4,
      cellPaddingInlineSM: 4,
      footerBg: '#fafafa',
      headerBg: '#fafafa'
    },
    Tabs: {
      colorBgSelectedTab: '#ffffff',
      itemColor: 'rgba(0, 0, 0, 0.65)',
      itemHoverColor: 'rgba(215, 199, 236, 0.6)',
      itemUnselectedIconColor: '#4d4169',
      colorBorderActiveTab: '#00bab3',
      colorBgUnselectedTab: 'rgba(215, 199, 236, 0.4)',
      colorBgHoverUnselectedTab: 'rgba(215, 199, 236, 0.6)',
      colorBorderContainer: '#eae8ed'
    },
    Avatar: {
      colorUserIndicator: '#722ed1'
    },
    Modal: {
      colorTextSecondary: 'rgba(0, 0, 0, 0.6)'
    },
    Example: {
      color: '#722ed1'
    }
  }
}

type tokens = typeof defaultTheme.token
type components = typeof defaultTheme.components

const PimcoreDefaultTheme: PimcoreThemeConfig = defaultTheme

export { PimcoreDefaultTheme }

declare module 'antd-style' {
  export interface ThemeConfig extends PimcoreThemeConfig {}
  export interface FullToken extends tokens, components {}
}
