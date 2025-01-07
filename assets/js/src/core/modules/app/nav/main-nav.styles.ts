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

export const useStlyes = createStyles(({
  token,
  css
}) => {
  return {
    mainNav: css`
      position: absolute;
      left: 100%;
      top: 0;
      background: #fff;
      padding: ${token.paddingMD}px;
      box-shadow: ${token.boxShadowSecondary};
      border-radius: ${token.borderRadius}px;
      width: 818px;
      max-width: 90vw;
      min-width: 530px;
      text-align: left;
      
      .main-nav__top {
        display: flex;
        justify-content: space-between;
      }
      
      .main-nav__list-inline {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-nav__bottom {
        display: flex;
        text-transform: uppercase;
        gap: ${token.marginSM}px;
        color: ${token.colorTextDescription};
        
        .main-nav__bottom-title {
          margin-top: ${token.marginXS}px;
          line-height: 1.5;
        }

        .main-nav__list-inline {
          gap: ${token.marginXS}px;
          flex-wrap: wrap;
        }
      }
      
      .main-nav__list {
        margin: 0;
        list-style: none;
        width: 100%;
        //width: 25%;
        padding: 0 ${token.paddingXS}px;
        font-size: ${token.fontSize}px;
      }

      .main-nav__list--level-0 {
        width: 25%;
        padding: 0;
        background: rgba(0, 0, 0, 0.02);
        
        > .main-nav__list-item.is-active > .main-nav__list-btn {
          border-left: 2px solid ${token.colorPrimary};
          background: ${token.controlItemBgActive};
          color: ${token.colorPrimary};
        }
      }

      .main-nav__list--level-1 {
        padding: ${token.paddingXS}px;
      }
      
      .main-nav__list:not(.main-nav__list--level-0) {
        position: absolute;
        left: 100%;
        top: 0;
        transform: translateX(-15px);
        opacity: 0;
        visibility: hidden;
        transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
      }
      
      .is-active > .main-nav__list {
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
      }
      
      .main-nav__list-item {
        position: relative;
      }
      .main-nav__list-btn {
        background: none;
        border: 0;
        width: 100%;
        padding: ${token.paddingSM}px;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        min-height: 46px;
        
        &:hover {
          background: ${token.controlItemBgActiveHover};
          color: ${token.colorPrimary};
        }
      }

      .is-active > .main-nav__list-btn {
        background: ${token.controlItemBgActive};
        color: ${token.colorPrimary};
      }
      
      .main-nav__list-btn-icon {
        margin-left: auto;
      }
      
      .main-nav__divider {
        margin: ${token.marginSM}px 0;
      }
      
      .main-nav__list--level-1 .main-nav__list-btn {
        min-height: unset;
        border-radius: ${token.borderRadius}px;
        padding: ${token.paddingXS}px;
      }
    `
  }
}, { hashPriority: 'low' })
