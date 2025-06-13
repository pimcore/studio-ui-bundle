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

export const useStyle = createStyles(({ css }) => {
  return {
    dragOverlay: css`
      position: relative;
      display: inline-flex;
      gap: 5px;
      align-items: center;
      padding: 5px;
      width: max-content;
      background: white;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;

      &::before {
        content: '';
        position: absolute;
        top: -5000px;
        left: -5000px;
        right: -5000px;
        bottom: -5000px;
        z-index: 0;
      }

    `
  }
})