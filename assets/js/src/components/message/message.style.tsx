/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    message: css`
      .ant-message-custom-content {
          font-family: Lato,serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
      }
    `
  }
}, { hashPriority: 'low' })
