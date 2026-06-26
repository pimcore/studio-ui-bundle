/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeThemeAbstract, type PimcoreThemeConfig } from '../dynamic-type-theme-abstract'
import { theme } from 'antd'
import { studioThemeIds } from '../../../constants/theme-ids'

@injectable()
export class DynamicTypeThemeStudioDefaultDark extends DynamicTypeThemeAbstract {
  id: string = studioThemeIds.dark
  extends: string[] = [studioThemeIds.light]

  getThemeConfig (): PimcoreThemeConfig {
    return {
      token: {
        // Colors that exist in light theme but have different values in dark
        colorLink: '#d7b7f5',
        colorLinkActive: '#d7b7f5',
        colorLinkHover: '#854eca',
        controlOutline: '#1a1325',
        controlItemBgActive: '#1a1325',
        // Explicitly set so the dark algorithm doesn't derive an over-saturated purple hover from colorPrimary.
        controlItemBgActiveHover: 'rgba(255, 255, 255, 0.06)',
        itemSelectedColor: 'rgba(255, 255, 255, 0.85)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
        colorFill: 'rgba(255, 255, 255, 0.15)',
        colorFillQuaternary: 'rgba(255, 255, 255, 0.09)',
        colorBgLayout: 'rgba(20, 20, 20, 0.44)',
        // Outermost app/page background — wired to html, body via global.styles.ts
        colorBgCanvas: '#0D0C14',
        // Soft glow bubble behind the logo on the background screen — dark tint (vs. the light theme's near-white)
        colorBgLogoOrbit: 'rgba(26, 19, 37, 0.5)',
        // Subtle neutral panel for the main-nav first-level column (matches the light theme's neutral intent)
        colorBgMainNavColumn: 'rgba(255, 255, 255, 0.09)',
        // Fieldset (layout group) border + background
        colorBorderFieldset: '#6D667B',
        colorBgFieldset: '#27262E',
        colorPrimary: '#6f2acf',
        "colorPrimaryBg": "#1a1325",
        "colorPrimaryBgHover": "#24163a",
        "colorPrimaryBorder": "#301c4d",
        "colorPrimaryBorderHover": "#3e2069",
        "colorPrimaryHover": "#d7b7f5",
        "colorPrimaryActive": "#ebd7fa",
        "colorPrimaryTextHover": "#d7b7f5",
        "colorPrimaryText": "#d7b7f5",
        "colorPrimaryTextActive": "#ebd7fa",
        colorIconSecondary: '#9d8fbd',
        colorFillNav: '#ffffff',
        colorIconSidebar: '#d5caed',
        colorBorderActiveTab: '#13a8a8',
        colorLogo: '#ffffff',
        colorBorderTertiary: '#333039',
        // Panel title separator: neutral border in dark (light keeps the purple highlight).
        colorBorderPanelTitle: '#333039',
        colorTextTreeElement: 'rgba(255, 255, 255, 0.85)',
        colorIconTree: '#d4d4d4',
        colorIconTreeUnpublished: 'rgba(212, 212, 212, 0.75)',
        colorTextSidebarTitle: '#d7b7f5',
        colorBgToolbar: '#1c1b1f',
        // Default toolstrip background — #FFF at 9% alpha (subtle overlay on dark surfaces)
        colorBgToolstrip: 'rgba(255, 255, 255, 0.09)',
        colorFillActive: '#ffffff',
        // Subtle low-contrast fill/line surface (pipeline item bg, secondary divider). White read as glaring boxes/lines on dark.
        colorFillAdditional: 'rgba(255, 255, 255, 0.09)',
        colorBgSidebarOptions: '#1e1e24',
        colorBgSelectedTab: '#1e1e24',
        itemActiveColor: '#d7b7f5',
        itemColor: 'rgba(255, 255, 255, 0.85)',
        itemHoverColor: '#1a1325',
        itemUnselectedIconColor: '#9d8fbd',
        colorBorderContainer: '#1e1e24',
        colorFillAlter: 'rgba(255, 255, 255, 0.09)',
        colorTextDescription: 'rgba(255, 255, 255, 0.45)',
        colorBgUnselectedTab: '#ffffff',
        colorBgHoverUnselectedTab: '#ffffff',
        colorAccentSecondary: '#33bcb7',
        colorBgElevated: '#1f1f1f',

        // Base seed = the page background (#141414, the darkest surface). Reseeds the dark algorithm so
        // derived surfaces (popovers, elevated, spotlight) step up from it rather than from pure black.
        colorBgBase: '#1e1e24',
        // Containers/cards sit one elevation step above the page background.
        colorBgContainer: '#1e1e24',

        // Inverse tokens flipped for dark mode (light surfaces shown on the dark theme).
        // Previously these were inherited from the light theme, so "inverse" surfaces were dark-on-dark.
        colorButtonInverse: '#151515',
        colorFillInverse: '#f5f5f5',
        colorTextInverse: 'rgba(21, 21, 21, 0.88)',
        colorBorderInverse: '#d9d9d9',
        colorDividerInverse: 'rgba(255, 255, 255, 0.34)',
        colorInactiveInverse: 'rgba(21, 21, 21, 0.5)',

        // Dark-tuned coding colour palette. The dark theme previously inherited the light-mode
        // values (tuned for light backgrounds); these brighter variants read correctly on dark.
        colorCodingRed1: '#c03b3d',
        colorCodingRed2: '#d65656',
        colorCodingRed3: '#f77d7d',
        colorCodingRed4: '#ffa095',
        colorCodingRed5: '#fa6f65',
        colorCodingRed6: '#f75b50',
        colorCodingBeige1: '#c09283',
        colorCodingBeige2: '#ae9389',
        colorCodingBeige3: '#d7ccc8',
        colorCodingGold1: '#c87c00',
        colorCodingGold2: '#feb026',
        colorCodingGold3: '#ffca64',
        colorCodingOrange1: '#ff8517',
        colorCodingOrange2: '#ffa03d',
        colorCodingOrange3: '#ffc077',
        colorCodingGreen1: '#3eaf72',
        colorCodingGreen2: '#00c880',
        colorCodingGreen3: '#61bf9f',
        colorCodingGreen4: '#4beda7',
        colorCodingGreen5: '#00f573',
        colorCodingMint1: '#26c4c4',
        colorCodingMint2: '#41dcdc',
        colorCodingMint3: '#6deafb',
        colorCodingBlue1: '#178ed3',
        colorCodingBlue2: '#3981fa',
        colorCodingBlue3: '#726df5',
        colorCodingBlue4: '#825fe5',
        colorCodingPurple1: '#9250d5',
        colorCodingPurple2: '#9c63ea',
        colorCodingPurple3: '#ac7bee',
        colorCodingPurple4: '#c795f9',
        colorCodingViolet1: '#ba47c0',
        colorCodingViolet2: '#ca60cc',
        colorCodingViolet3: '#f59ff5',
        colorCodingViolet4: '#f57ff5',
        colorCodingViolet5: '#e04ee1',
        colorCodingMagenta1: '#c1389e',
        colorCodingMagenta2: '#c84ba9',
        colorCodingMagenta3: '#d05eb4',
        colorCodingMagenta4: '#df84ca',
        colorCodingBgYellow: 'rgba(255, 255, 243, 0.08)',
        colorCodingContentYellow: '#e0d9b5',
        colorCodingBorderYellow: 'rgba(224, 217, 181, 0.2)',
        colorCodingBgOrange: 'rgba(248, 226, 180, 0.08)',
        colorCodingContentOrange: '#ecc9a1',
        colorCodingBorderOrange: 'rgba(236, 201, 161, 0.2)',
        colorCodingBgPink: 'rgba(255, 133, 192, 0.08)',
        colorCodingContentPink: '#feaad6',
        colorCodingBorderPink: 'rgba(254, 170, 214, 0.2)',
        colorCodingBgPurple: 'rgba(173, 156, 255, 0.08)',
        colorCodingContentPurple: '#d0b0fc',
        colorCodingBorderPurple: 'rgba(208, 176, 252, 0.2)',
        colorCodingContentBlue: '#bce1ff',
        colorCodingBorderBlue: 'rgba(188, 225, 255, 0.2)',
        colorCodingBgBlue: 'rgba(174, 228, 254, 0.08)',
        colorCodingBgMint: 'rgba(134, 213, 208, 0.08)',
        colorCodingContentMint: '#58d1c9',
        colorCodingBorderMint: 'rgba(88, 209, 201, 0.2)',
        colorCodingBgEmerald: 'rgba(100, 236, 188, 0.08)',
        colorCodingContentEmerald: '#07e4af',
        colorCodingBorderEmerald: 'rgba(7, 228, 175, 0.2)',
        colorCodingBgGreen: 'rgba(180, 248, 187, 0.08)',
        colorCodingContentGreen: '#bef5ae',
        colorCodingBorderGreen: 'rgba(190, 245, 174, 0.2)',
        colorCodingBgWhite: '#1e1e24',
        colorCodingContentWhite: '#d0b0fc',
        colorCodingBorderWhite: 'rgba(208, 176, 252, 0.2)'
      },
      components: {
        Tree: {
          colorBorderTree: '#424242',
          colorTextTree: 'rgba(255, 255, 255, 0.85)',
          colorPrimaryHeading: '#6f2acf',
          colorTextTreeUnpublished: 'rgba(255, 255, 255, 0.85)',
          colorIconTree: 'rgba(255, 255, 255, 0.85)'
        },
        Progress: {
          colorText: 'rgba(255, 255, 255, 0.85)',
          circleTextColor: 'rgba(255, 255, 255, 0.85)'
        },
        Divider: {
          colorSplit: 'rgba(255, 255, 255, 0.06)'
        },
        Button: {
          defaultBorderColor: '#424242',
          defaultColor: '#d7b7f5',
          defaultGhostBorderColor: '#1e1e24',
          defaultGhostColor: '#1e1e24',
          textGhostColor: 'rgba(255, 255, 255, 0)',
          colorBgTextActive: 'rgba(255, 255, 255, 0.12)'
        },
        Menu: {
          darkItemSelectedBg: 'rgba(171, 122, 224, 0.4)',
          subMenuItemBg: 'rgba(255, 255, 255, 0.02)'
        },
        Breadcrumb: {
          lastItemColor: 'rgba(255, 255, 255, 0.85)'
        },
        Collapse: {
          headerBg: 'rgba(255, 255, 255, 0.09)'
        },
        Table: {
          controlItemBgActive: '#1a1325',
          footerBg: '#1d1d1d',
          headerBg: '#1d1d1d',
          colorBorderSecondary: '#303030'
        },
        Tabs: {
          colorBgSelectedTab: '#1e1e24',
          itemColor: 'rgba(255, 255, 255, 0.65)',
          itemActiveColor: '#d7b7f5',
          // Selected-tab text + icon color — mirrors itemActiveColor so it doesn't fall back to colorPrimary
          itemSelectedColor: '#d7b7f5',
          inkBarColor: '#d7b7f5',
          itemHoverColor: '#854eca',
          itemUnselectedIconColor: '#9d8fbd',
          colorBorderActiveTab: '#13a8a8',
          colorBgUnselectedTab: 'rgba(255, 255, 255, 0.09)',
          colorBgHoverUnselectedTab: 'rgba(255, 255, 255, 0.15)',
          colorBorderContainer: '#1e1e24'
        },
        Avatar: {
          colorUserIndicator: '#722ed1'
        },
        Modal: {
          colorTextSecondary: 'rgba(255, 255, 255, 0.45)'
        },
        Alert: {
          colorInfo: '#d7b7f5',
          colorInfoBg: '#1a1325',
          colorInfoBorder: '#301c4d'
        },
        Empty: {
          colorTextDisabled: 'rgba(255, 255, 255, 0.52)'
        },
        Tag: {
          colorBorder: '#424242',
          colorErrorBg: '#2c1618',
          colorErrorBorder: '#5b2526',
          colorFillQuaternary: 'rgba(255, 255, 255, 0.09)',
          colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
          colorFillTertiary: 'rgba(255, 255, 255, 0.08)',
          colorInfoBg: '#1a1325',
          colorInfoBorder: '#301c4d',
          colorPrimary: '#6f2acf',
          colorPrimaryActive: '#d7b7f5',
          colorPrimaryHover: '#854eca',
          colorSuccessBg: '#162312',
          colorSuccessBorder: '#274916',
          colorText: 'rgba(255, 255, 255, 0.85)',
          colorTextDescription: 'rgba(255, 255, 255, 0.45)',
          colorTextHeading: 'rgba(255, 255, 255, 0.85)',
          colorTextLightSolid: '#ffffff',
          colorWarningBg: '#2b2111',
          colorWarningBorder: '#594214',
          defaultBg: 'rgba(255, 255, 255, 0.09)',
          defaultColor: 'rgba(255, 255, 255, 0.85)'
        },
        Colors: {
          Neutral: {
            Fill: {
              colorFill: 'rgba(255, 255, 255, 0.15)',
              colorFillTertiary: 'rgba(255, 255, 255, 0.09)'
            },
            Icon: {
              colorIcon: 'rgba(255, 255, 255, 0.85)'
            }
          },
          Base: {
            Geekblue: {
              2: '#1C2755',
              3: '#2C3A6B',
              6: '#A8C1F8'
            }
          }
        }
      },
      algorithm: theme.darkAlgorithm
    }
  }
}
