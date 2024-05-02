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
    tree: css`
      padding: ${token.paddingXXS}px 0 ${token.paddingXS}px 0;
      max-width: 100%;
      color: ${token.colorTextTreeElement}
    `
  }
}, { hashPriority: 'low' })
