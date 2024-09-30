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

export const useStyles = createStyles(({ token, css }) => {

  return {
    card: css`
      border-radius: ${token.borderRadius}px;
      
      .ant-card-head {
        min-height: 38px;
        border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0 ;
        padding: ${token.paddingXXS}px ${token.paddingSM}px;
      }
      
      .ant-card-head-title {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        font-size: ${token.fontSize}px;
      }
      
      .ant-card-extra {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        color: ${token.colorTextSecondary};
      }
      
      .ant-card-body {
        border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
        padding: ${token.paddingSM}px;
      }
      
      .ant-card-actions {
        border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
        
        //todo should we use the card actions ? or should we build our own? cause antd is setting inline styles to the li
        li {
          width: auto !important;
        }
        
        li:not(:last-child) {
          border: none;
        }
      }
    `
  }
})
