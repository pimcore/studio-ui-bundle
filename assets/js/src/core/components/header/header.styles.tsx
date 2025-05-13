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

export const useStyles = createStyles(({ token, css }) => {
  return {
    header: css`
      display: flex;
      width: 100%;
      height: 32px;
      min-height: 32px;
      align-items: center;
      gap: 8px;

      .header__title {
          font-weight: 600;
          color: ${token.colorPrimary};
          white-space: nowrap;
      }

      .header__text {
        white-space: nowrap;
        margin: 0;
        
        h1 {
          margin: 0;
        }
      }
    `
  }
}, { hashPriority: 'low' })
