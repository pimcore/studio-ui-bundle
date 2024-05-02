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
    filesList: css`
            list-style: none;
            padding: 0;
            margin: 10px 0 0;

            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${token.colorTextTertiary}
            }
        `
  }
}, { hashPriority: 'low' })
