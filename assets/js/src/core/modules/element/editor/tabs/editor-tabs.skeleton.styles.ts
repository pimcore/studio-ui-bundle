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
    skeleton: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #DFD7EA;
        
      .editor-tabs__skeleton {
        display: flex;
        gap: 8px;
      }   
    `
  }
})
