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
    flex: css`
      .pimcore-icon {
        color: ${token.colorPrimary};
        margin-right: 4px;
      }
    `,
    title: css`
      &.pimcore-title.ant-typography {
        font-size: 12px;
        font-weight: 600;
        color: ${token.colorPrimary};
      }
      .pimcore-icon {
        color: ${token.colorPrimary};
        margin-right: 4px;
      }
    `
  }
}, { hashPriority: 'low' })
