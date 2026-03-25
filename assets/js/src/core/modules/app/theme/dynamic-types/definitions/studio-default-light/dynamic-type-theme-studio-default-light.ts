/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

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
    colorAccent: '#13C2C2',
    colorAccentSecondary: '#08979c',
    colorButtonInverse: '#f5f5f5',
    colorFillInverse: '#151515',
    colorTextInverse: 'rgba(255, 255, 255, 0.88)',
    colorBorderInverse: '#424242',
    colorDividerInverse: 'rgba(217, 217, 217, 0.34)',
    colorInactiveInverse: 'rgba(255, 255, 255, 0.5)',

    // custom color tokens (e.g. for icon colors)
    colorCodingRed1: '#b73933',
    colorCodingRed2: '#cc4a46',
    colorCodingRed3: '#e05c59',
    colorCodingRed4: '#e94226',
    colorCodingRed5: '#de2b1a',
    colorCodingRed6: '#d11f0f',
    colorCodingBeige1: '#8e685a',
    colorCodingBeige2: '#76594f',
    colorCodingBeige3: '#9c8a84',
    colorCodingGold1: '#6c410b',
    colorCodingGold2: '#b26500',
    colorCodingGold3: '#c38000',
    colorCodingOrange1: '#934600',
    colorCodingOrange2: '#ac5d00',
    colorCodingOrange3: '#d77300',
    colorCodingGreen1: '#007f52',
    colorCodingGreen2: '#008a42',
    colorCodingGreen3: '#2d9f67',
    colorCodingGreen4: '#297f5a',
    colorCodingGreen5: '#00a14c',
    colorCodingMint1: '#136767',
    colorCodingMint2: '#0d8a8a',
    colorCodingMint3: '#1a9dbd',
    colorCodingBlue1: '#147bb7',
    colorCodingBlue2: '#006afa',
    colorCodingBlue3: '#595fee',
    colorCodingBlue4: '#3c37cc',
    colorCodingPurple1: '#5a1fb3',
    colorCodingPurple2: '#8341e5',
    colorCodingPurple3: '#784ebd',
    colorCodingPurple4: '#976ae2',
    colorCodingViolet1: '#66256d',
    colorCodingViolet2: '#9d4a9d',
    colorCodingViolet3: '#cc63d2',
    colorCodingViolet4: '#b745b7',
    colorCodingViolet5: '#a324a4',
    colorCodingMagenta1: '#7e0d5b',
    colorCodingMagenta2: '#ba278f',
    colorCodingMagenta3: '#d542b1',
    colorCodingMagenta4: '#ca6bb7',
    colorCodingBgYellow: 'rgba(255, 253, 226, 0.5)',
    colorCodingContentYellow: '#b39501',
    colorCodingBorderYellow: 'rgba(179, 149, 1, 0.2)',
    colorCodingBgOrange: 'rgba(255, 234, 189, 0.5)',
    colorCodingContentOrange: '#ad4e00',
    colorCodingBorderOrange: 'rgba(173, 78, 0, 0.2)',
    colorCodingBgPink: 'rgba(255, 218, 236, 0.5)',
    colorCodingContentPink: '#c41d7f',
    colorCodingBorderPink: 'rgba(196, 29, 127, 0.2)',
    colorCodingBgPurple: 'rgba(239, 232, 255, 0.5)',
    colorCodingContentPurple: '#722ed1',
    colorCodingBorderPurple: 'rgba(114, 46, 209, 0.2)',
    colorCodingContentBlue: '#117db3',
    colorCodingBorderBlue: 'rgba(17, 125, 179, 0.2)',
    colorCodingBgBlue: 'rgba(215, 242, 255, 0.5)',
    colorCodingBgMint: 'rgba(212, 235, 236, 0.5)',
    colorCodingContentMint: '#006d75',
    colorCodingBorderMint: 'rgba(0, 109, 117, 0.2)',
    colorCodingBgEmerald: 'rgba(205, 255, 234, 0.5)',
    colorCodingContentEmerald: '#0a6751',
    colorCodingBorderEmerald: 'rgba(10, 103, 81, 0.2)',
    colorCodingBgGreen: 'rgba(209, 251, 213, 0.5)',
    colorCodingContentGreen: '#13aa22',
    colorCodingBorderGreen: 'rgba(19, 170, 34, 0.2)',
    colorCodingBgWhite: '#ffffff',
    colorCodingContentWhite: '#722ed1',
    colorCodingBorderWhite: 'rgba(114, 46, 209, 0.2)'
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

    Radio: {
      fontFamily: 'Lato'
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
