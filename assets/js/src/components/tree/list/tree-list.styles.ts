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

export const useStyles = createStyles(({ token, css }) => {
  return {
    'tree-list__pager': css` 
      padding: ${token.paddingSM}px 0;

      &:empty {
        padding: 0;
      }
    `,

    'tree-list__search': css`
      padding: ${token.paddingXXS}px ${token.paddingSM}px ${token.paddingXS}px 0;

      &:empty {
        padding: 0;
      }

      .ant-btn-default {
        border-color: ${token.colorBorder}
      }
    `
  }
}, { hashPriority: 'low' })
