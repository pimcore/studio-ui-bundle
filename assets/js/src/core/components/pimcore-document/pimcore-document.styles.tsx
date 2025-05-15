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
    'document-container': css`
      width: 100%;
      height: 100%;
      .loading-div {
        position: absolute;
        top: calc(50% - 11px);
        left: calc(50% - 8px);
      }
      
      .display-none {
        display: none;
      }
    `
  }
}, { hashPriority: 'low' })
