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

import { createStyles } from 'antd-style'
import { type TabsToken } from 'antd/es/tabs/style'

export const getTabTokens = (token): TabsToken => {
  let tabTokens = {
    zIndexPopup: token.zIndexPopupBase + 50,
    cardBg: token.colorFillAlter,
    cardHeight: token.controlHeightLG,
    // Initialize with empty string, because cardPadding will be calculated with cardHeight by default.
    cardPadding: '',
    cardPaddingSM: `${token.paddingXXS * 1.5}px ${token.padding}px`,
    cardPaddingLG: `${token.paddingXS}px ${token.padding}px ${token.paddingXXS * 1.5}px`,
    titleFontSize: `${token.fontSize}px`,
    titleFontSizeLG: `${token.fontSizeLG}px`,
    titleFontSizeSM: `${token.fontSize}px`,
    inkBarColor: token.colorPrimary,
    horizontalMargin: `0 0 ${token.margin}px 0`,
    horizontalItemGutter: 32, // Fixed Value
    // Initialize with empty string, because horizontalItemMargin will be calculated with horizontalItemGutter by default.
    horizontalItemMargin: '',
    horizontalItemMarginRTL: '',
    horizontalItemPadding: `${token.paddingSM}px 0`,
    horizontalItemPaddingSM: `${token.paddingXS}px 0`,
    horizontalItemPaddingLG: `${token.padding}px 0`,
    verticalItemPadding: `${token.paddingXS}px ${token.paddingLG}px`,
    verticalItemMargin: `${token.margin}px 0 0 0`,
    itemSelectedColor: token.colorPrimary,
    itemHoverColor: token.colorPrimaryHover,
    itemActiveColor: token.colorPrimaryActive,
    cardGutter: token.marginXXS / 2,
    ...(token?.Tabs ?? {})
  }

  tabTokens = {
    ...tabTokens,
    tabsCardPadding:
      token.cardPadding ??
      `${
        (tabTokens.cardHeight - Math.round(token.fontSize * token.lineHeight)) / 2 - token.lineWidth
      }px ${token.paddingSM}px`,
    dropdownEdgeChildVerticalPadding: token.paddingXXS,
    tabsActiveTextShadow: '0 0 0.25px currentcolor',
    tabsDropdownHeight: 200,
    tabsDropdownWidth: 120,
    tabsHorizontalItemMargin: `0 0 0 ${token.horizontalItemGutter}px`,
    tabsHorizontalItemMarginRTL: `0 0 0 ${token.horizontalItemGutter}px`
  }

  return tabTokens
}

export const useStyles = createStyles(({ token, css }) => {
  const tabToken = getTabTokens(token)

  return {
    widgetManager: css`
        position: absolute;
        inset: 8px 6px 12px 6px;
  
        .flexlayout__layout {
          overflow: visible;
        }
  
        &.widget-manager--inner {
          inset: 0;
        }
  
        .flexlayout__tab_button_leading,
        .flexlayout__border_button_leading {
          display: none;
        }
  
        .flexlayout__tab_button {
          margin: 0;
          padding: ${token.paddingSM}px ${token.paddingSM}px;
          background: ${token.colorFillAlter};
          transition: all ${token.motionDurationSlow} ${token.motionEaseInOut};
          font-size: ${token.fontSize}px;
          color: ${tabToken.itemColor};
          outline: none;
          gap: ${token.marginXXS}px;
        
          &:hover {
            background: ${token.Tabs.colorBgHoverUnselectedTab};
          }
  
          &_trailing {
            display: none;
          }
  
          &--selected {
            font-weight: ${token.fontWeightStrong};
            color: ${tabToken.itemActiveColor};
            background: ${token.colorBgContainer};
            border-top: 2px solid ${token.Tabs.colorBorderActiveTab};

            .widget-manager__tab-title-close-button {
              display: block;
            }
  
            .widget-manager-tab-title {
              margin-top: -2px;
            }
  
            &:hover {
              background: ${token.colorBgContainer};
            }
          }

          .flexlayout__tab_button_trailing {
            margin-top: -2px;
            display: none;
          }
  
          &:focus:not(:focus-visible), &:active {
            color: ${tabToken.itemActiveColor};
          }
  
          &:first-child {
            border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          }
        }
  
        .flexlayout__tabset_tab_divider {
          width: ${tabToken.cardGutter}px;
        }
  
        .flexlayout__tab_button_top {
          border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
          border-bottom: 0;
        }
  
        .flexlayout__border_inner_tab_container {
          width: calc(100svh - 12px);
          justify-content: flex-end;
        }
  
        .flexlayout__border_inner_tab_container_left, .flexlayout__border_inner_tab_container_right {
          .flexlayout__border_tab_divider {
            width: 0;
          }
        }
  
        .flexlayout__splitter,
        .flexlayout__border,
        .flexlayout__tabset_tabbar_outer {
          background: transparent;
        }
  
        .flexlayout__tab {
          overflow: visible;
          background: ${token.colorBgContainer};
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-bottom: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-radius: 0 8px 8px 8px;
        }

        .flexlayout__tab:not(.widget-manager-inner-container) {
          overflow: hidden;
        }
      
        .flexlayout__tab_border {
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-top: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-right: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-bottom: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-radius: 8px;
        }
  
        .widget-manager-inner-container {
          background: transparent;
          box-shadow: none;
          border: 0;
        }
  
        .flexlayout__tabset {
          overflow: visible;
          border-radius: ${token.borderRadius}px;
          font-family: ${token.fontFamily};
  
          &, &-selected {
            background: transparent;
          }
        }
  
        .flexlayout__border {
          font-family: ${token.fontFamily};
        }
  
        .flexlayout__border_button {
          margin: 0 0 6px 0;
          background: transparent;
          width: 40px;
          justify-content: center;
          border-radius: ${token.borderRadiusSM}px;
          transition: all ${token.motionDurationSlow} ${token.motionEaseInOut};
  
          &--selected {
            color: ${tabToken.itemActiveColor};
            border-top: 1.5px solid ${token.colorBorderActive};
            background: ${token.controlItemBgHover};
          }
        }
  
        @media (hover: hover) {
          .flexlayout__border_button--unselected:hover {
            color: ${token.colorTextSecondary}; 
            background: ${token.controlItemBgActiveHover};
          }
          
          .flexlayout__tab_button--selected:hover {
            color: ${tabToken.itemActiveColor};
            background: ${token.colorBgContainer};
          }
        }
  
        .flexlayout__border_button_trailing {
          display: none;
        }
  
        .flexlayout__border_left {
          border-right: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(90deg);
          }
        }
  
        .flexlayout__border_right {
          border-left: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(-90deg);
          }
        }
  
        .flexlayout__tabset_tabbar_outer_top {
          border: 0;
        }
  
        .flexlayout__tabset_tabbar_inner_tab_container {
          padding-left: 0;
        }
  
        .flexlayout__border_toolbar {
          display: none;
        }

        .widget-manager__tab-title-close-button {
          display: none;
          width: 12px;
          height: 12px;
          padding: 4px;
          line-height: 0;
          margin-top: -8px;
          color: ${token.colorIcon};
        }
      `
  }
}, { hashPriority: 'low' })
