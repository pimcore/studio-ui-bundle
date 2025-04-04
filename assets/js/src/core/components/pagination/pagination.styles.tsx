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

export const useStyle = createStyles(({ token, css }) => {
  return {
    pagination: css`
      .ant-pagination {
        display: flex;
        align-items: center;
        margin-left: ${token.marginXXS}px;
      }
      
      .ant-pagination .ant-pagination-item {
        border: 0;
      }

      button.page-number-node {
        color: ${token.colorText};
        text-align: center;
        box-shadow: none;
        border: 1px solid transparent;
        padding: ${token.paddingXXS}px;
        background-color: ${token.colorBgContainer};
        
        &:hover {
          border-color: ${token.colorPrimary};
          color: ${token.colorPrimary};
        }
      }
      .ant-pagination-item-active .page-number-node {
        color: ${token.colorPrimary};
        border-color: ${token.colorPrimary};
      }

      button.page-number-node, .ant-pagination .ant-pagination-item {
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        background-color: transparent;
      }
      
      & .ant-pagination-item-active span {
        color: ${token.colorPrimary};
        background: ${token.colorBgContainer};
      }
      
      .ant-pagination-item-link {
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .ant-pagination .ant-pagination-total-text {
        height: auto;
        line-height: 1;
        margin-right: ${token.marginXXS}px;
      }
    `
  }
}, { hashPriority: 'low' })
