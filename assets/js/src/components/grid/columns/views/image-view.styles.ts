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
    image: css`
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      width: 80px;
    `
  }
}, { hashPriority: 'low' })
