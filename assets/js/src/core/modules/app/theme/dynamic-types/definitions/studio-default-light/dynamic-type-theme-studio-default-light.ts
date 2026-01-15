/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeThemeAbstract, type PimcoreThemeConfig } from '../dynamic-type-theme-abstract'
import { studioThemeIds } from '../../../constants/theme-ids'
const staticTokens = {
  token: {
    fontFamily: 'Lato, sans-serif'
  },

  components: {
    Form: {
      itemMarginBottom: 12,
      verticalLabelPadding: 4
    }
  }
}

export const studioDefaultLightThemeConfig = {
  token: {
    ...staticTokens.token,
    colorLink: '#722ed1',
    colorLinkActive: '#531dab',
    colorLinkHover: '#9254de',
    controlOutline: 'rgba(114, 46, 209, 0.1)',
    controlItemBgActive: '#f8eeff',
    itemSelectedColor: 'rgba(0, 0, 0, 0.88)',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.6)',
    colorFill: 'rgba(215, 199, 236, 0.6)',
    colorFillQuaternary: 'rgba(215, 199, 236, 0.4)',
    colorBgLayout: '#fcfcfc',
    colorBgSpotlight: '#060606',
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
    colorInfoBorderHover: '#b37feb',
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
    colorAccentSecondary: '#08979c',
    colorButtonInverse: '#f5f5f5',
    colorFillInverse: '#151515',
    colorTextInverse: 'rgba(255, 255, 255, 0.88)',
    colorBorderInverse: '#424242',
    colorDividerInverse: 'rgba(217, 217, 217, 0.34)',
    colorInactiveInverse: 'rgba(255, 255, 255, 0.5)',
    
    // custom color tokens (e.g. for icon colors)
    red1: '#b73933',
    red2: '#cc4a46',
    red3: '#e05c59',
    red4: '#e94226',
    red5: '#de2b1a',
    red6: '#d11f0f',
    beige1: '#8e685a',
    beige2: '#76594f',
    beige3: '#9c8a84',
    gold1: '#6c410b',
    gold2: '#b26500',
    gold3: '#c38000',
    orange1: '#934600',
    orange2: '#ac5d00',
    orange3: '#d77300',
    green1: '#007f52',
    green2: '#008a42',
    green3: '#2d9f67',
    green4: '#297f5a',
    green5: '#00a14c',
    mint1: '#136767',
    mint2: '#0d8a8a',
    mint3: '#1a9dbd',
    blue1: '#147bb7',
    blue2: '#006afa',
    blue3: '#595fee',
    blue4: '#3c37cc',
    purple1: '#5a1fb3',
    purple2: '#8341e5',
    purple3: '#784ebd',
    purple4: '#976ae2',
    violet1: '#66256d',
    violet2: '#9d4a9d',
    violet3: '#cc63d2',
    violet4: '#b745b7',
    violet5: '#a324a4',
    magenta1: '#7e0d5b',
    magenta2: '#ba278f',
    magenta3: '#d542b1',
    magenta4: '#ca6bb7'
  },
  components: {
    ...staticTokens.components,
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
    IconButton: {
      colorBgContainer: '#ffffff',
      borderRadiusSM: '4px'
    },
    Button: {
      primaryColor: '#ffffff',
      defaultBorderColor: '#d3adf7',
      defaultColor: '#722ed1',
      defaultGhostBorderColor: '#d9d9d9',
      defaultGhostColor: '#722ed1',
      textGhostColor: 'rgba(0, 0, 0, 0.88)',
      controlHeightSM: 24
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
      colorBorderSecondary: '#D9D9D9AA',
      controlItemBgActive: '#f8eeff',
      footerBg: '#fafafa',
      headerBg: '#fafafa'
    },
    Tabs: {
      colorBgSelectedTab: '#ffffff',
      itemColor: 'rgba(0, 0, 0, 0.65)',
      itemActiveColor: '#531dab',
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
    Alert: {
      colorInfo: '#722ed1',
      colorInfoBg: '#f9f0ff',
      colorInfoBorder: '#d3adf7'
    },
    Empty: {
      colorTextDisabled: 'rgba(0, 0, 0, 0.25)'
    },
    Colors: {
      Neutral: {
        Fill: {
          colorFill: 'rgba(215, 199, 236, 0.60)',
          colorFillTertiary: '#f5f5f5'
        },
        Icon: {
          colorIcon: 'rgba(0, 0, 0, 0.6)'
        }
      },
      Brand: {
        Success: {
          colorSuccessBg: '#f6ffed',
          colorSuccessBorder: '#b7eb8f',
          colorSuccessText: '#52c41a'
        },
        Warning: {
          colorWarning: '#faad14',
          colorWarningBg: '#fffbe6',
          colorWarningBorder: '#ffe58f'
        },
        Error: {
          colorError: '#ff4d4f',
          colorErrorBg: '#fff2f0'
        },
        Primary: {
          colorPrimaryText: '#22075e'
        }
      },
      Base: {
        Geekblue: {
          2: '#d6e4ff',
          3: '#adc6ff',
          6: '#2f54eb'
        }
      }
    },

    Tag: {
      colorBorder: '#d9d9d9',
      colorErrorBg: '#fff2f0',
      colorErrorBorder: '#ffccc7',
      colorFillQuaternary: 'rgba(215, 199, 236, 0.4)',
      colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
      colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
      colorInfoBg: '#f9f0ff',
      colorInfoBorder: '#d3adf7',
      colorPrimary: '#722ed1',
      colorPrimaryActive: '#531dab',
      colorPrimaryHover: '#9254de',
      colorSuccessBg: '#f6ffed',
      colorSuccessBorder: '#b7eb8f',
      colorText: 'rgba(0, 0, 0, 0.88)',
      colorTextDescription: 'rgba(0, 0, 0, 0.6)',
      colorTextHeading: 'rgba(0, 0, 0, 0.88)',
      colorTextLightSolid: '#ffffff',
      colorWarningBg: '#fffbe6',
      colorWarningBorder: '#ffe58f',
      borderRadiusSM: 4,
      lineWidth: 1,
      marginXS: 8,
      paddingXXS: 4,
      fontSize: 12,
      fontSizeIcon: 12,
      fontSizeSM: 12,
      defaultBg: '#fafafa',
      defaultColor: 'rgba(0, 0, 0, 0.88)'
    },
    Split: {
      colorFillSecondary: undefined
    }
  }
}

export class DynamicTypeThemeStudioDefaultLight extends DynamicTypeThemeAbstract {
  id: string = studioThemeIds.light

  getThemeConfig (): PimcoreThemeConfig {
    return studioDefaultLightThemeConfig
  }
}
