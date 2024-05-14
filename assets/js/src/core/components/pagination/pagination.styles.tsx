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
      .ant-pagination .ant-pagination-item {
        padding: unset;
        margin-top: unset;
        margin-bottom: unset;
        vertical-align: middle;
      }

      button.page-number-node {
        color: black;
        text-align: center;
        vertical-align: text-bottom;
        box-shadow: none;
        padding: 0 2px 2px 0;
        border: none;
      }

      button.page-number-node, .ant-pagination .ant-pagination-item {
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        background-color: transparent;
      }
      
      & .ant-pagination-item-active span {
        color: ${token.colorPrimary};
      }
    `
  }
}, { hashPriority: 'low' })
