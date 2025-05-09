/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    userMenu: css`
      .user-menu__title {
        text-transform: uppercase;
      }
    
      .ant-badge .ant-badge-count {
        background: ${token.colorPrimary};
        width: 20px;
        height: 20px;
        border-radius: 100%;
      }
    `
  }
})
