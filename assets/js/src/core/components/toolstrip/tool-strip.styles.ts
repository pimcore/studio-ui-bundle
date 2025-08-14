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

export const useStyles = createStyles(({ css, token }) => {
  return {
    'tool-strip': css`
      background: #f5f5f5;
      border-top-left-radius: ${token.borderRadius}px;
      border-top-right-radius: ${token.borderRadius}px;
      line-height: 0;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;

      &.tool-strip--theme-inverse {
        background: ${token.colorFillInverse};
      }

      &.tool-strip--activate-on-hover {
        overflow: hidden;
        
        .tool-strip__children-container {
          transition: max-width 0.08s ease-in-out, opacity 0.05s ease-in-out;
        }
        
        &:not(.tool-strip--activated) {
          .tool-strip__children-container {
            max-width: 0;
            overflow: hidden;
          }
          
        }

        &.tool-strip--activated {
          .tool-strip__children-container {
            max-width: 1000px;
            transition: max-width 0.3s ease-in-out, opacity 0.2s ease-in-out 0.1s;
          }
        }
      }
    `,

    dragger: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    `,

    'draggable-area': css`
      cursor: grab;
      
      &:active {
        cursor: grabbing;
      }
    `
  }
})
