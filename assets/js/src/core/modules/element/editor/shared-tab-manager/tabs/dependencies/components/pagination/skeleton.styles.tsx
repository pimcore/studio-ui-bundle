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

// @todo move to components
export const useStyle = createStyles(({ token, css }) => {
  return {
    skeleton: css`
      width: 100%;
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: flex-end;
        
      .square {
        .ant-skeleton-button {
          width: 24px;
          height: 24px;
          min-width: unset;   
        }
      }
    `
  }
})
