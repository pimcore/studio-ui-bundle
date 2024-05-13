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
    'menu-icon': css`
      .anticon& {
          vertical-align: middle;
          margin-right: ${token.marginXS}px;
      }
    `,
    label: css`
        margin-right: ${token.marginXS}px;
    `,
    'flexbox-start-end': css`
        display: flex;
        justify-content: space-between;
      `
  }
}, { hashPriority: 'low' })
