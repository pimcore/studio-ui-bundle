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
    footer: css`
            .ant-btn {
                &.ant-btn-text {
                    color: ${token.colorPrimary};
                    padding: 0;
                }
            }
        `
  }
}, { hashPriority: 'low' })
