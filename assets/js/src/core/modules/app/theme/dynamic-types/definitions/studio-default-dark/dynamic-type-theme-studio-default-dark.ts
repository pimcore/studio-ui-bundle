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
        itemSelectedColor: 'rgba(255, 255, 255, 0.85)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
        colorFill: 'rgba(255, 255, 255, 0.15)',
        colorFillQuaternary: 'rgba(255, 255, 255, 0.09)',
        colorBgLayout: '#1e1e24',
        colorPrimary: '#6f2acf',
        colorIconSecondary: '#d4d4d4',
        colorFillNav: '#ffffff',
        colorIconSidebar: '#d4d4d4',
        colorBorderActiveTab: '#13a8a8',
        colorLogo: '#ffffff',
        colorBorderTertiary: '#333039',
        colorTextTreeElement: 'rgba(255, 255, 255, 0.85)',
        colorIconTree: '#d4d4d4',
        colorIconTreeUnpublished: 'rgba(212, 212, 212, 0.75)',
        colorTextSidebarTitle: '#d7b7f5',
        colorBgToolbar: '#1c1b1f',
        colorFillActive: '#ffffff',
        colorFillAdditional: '#ffffff',
        colorBgSidebarOptions: '#1e1e24',
        colorBgSelectedTab: '#1e1e24',
        itemActiveColor: '#d7b7f5',
        itemColor: 'rgba(255, 255, 255, 0.85)',
        itemHoverColor: '#854eca',
        itemUnselectedIconColor: '#d4d4d4',
        colorBorderContainer: '#1e1e24',
        colorFillAlter: 'rgba(255, 255, 255, 0.09)',
        colorTextDescription: 'rgba(255, 255, 255, 0.45)',
        colorBgUnselectedTab: '#ffffff',
        colorBgHoverUnselectedTab: '#ffffff',
        colorAccentSecondary: '#33bcb7'
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
          textGhostColor: 'rgba(255, 255, 255, 0)'
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
          headerBg: '#1d1d1d'
        },
        Tabs: {
          colorBgSelectedTab: '#1e1e24',
          itemColor: 'rgba(255, 255, 255, 0.65)',
          itemActiveColor: '#d7b7f5',
          itemHoverColor: '#854eca',
          itemUnselectedIconColor: '#d4d4d4',
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
          colorInfo: '#6f2acf',
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
        }
      },
      algorithm: theme.darkAlgorithm
    }
  }
}
