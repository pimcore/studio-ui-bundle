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

export const useStlyes = createStyles(({ token, css }) => {
  return {
    logo: css`
      padding: 13px 16px 0 16px;
    `
  }
}, { hashPriority: 'low' })
