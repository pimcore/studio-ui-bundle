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
      .ant-card-head {
        min-height: 38px;
        padding: ${token.paddingXXS}px ${token.paddingSM}px;
      }
      
      .ant-card-head-title {
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
        font-size: ${token.fontSize}px;
      }
      
      .ant-card-extra {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        color: ${token.colorTextSecondary};
      }
      
      .ant-card-body {
        padding: ${token.paddingSM}px;
      }
      
      .ant-card-actions {
        padding: ${token.paddingXXS}px;
        
        li {
          margin: 0;
          max-width: fit-content;
        }
        
        li:not(:last-child) {
          border: none;
        }
      }
    `
  }
})
