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
    image: css`
      transition: transform ${token.motionDurationFast}s;
    `,
    'loading-div': css`
      position: absolute;
      top: calc(50% - 11px);
      left: calc(50% - 8px);
    `
  }
}, { hashPriority: 'low' })
