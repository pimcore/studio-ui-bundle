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
    default: css`
      & .dnd--drag-active {
        background: ${token.colorBgContainerDisabled};
        border: 1px dashed ${token.colorBorder};
      }
      
      & .dnd--drag-valid {
        background: ${token.colorBgTextActive};
        border: 1px dashed ${token.colorInfoBorderHover};
      }

      & .dnd--drag-error {
        background: ${token.colorErrorBg};
        border: 1px dashed ${token.colorErrorActive};
      }

      & .dnd--cursor-near {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10;
      }

      & .dnd--cursor-near.dnd--drag-active {
        background: ${token.colorBgContainer};
        border-color: ${token.colorPrimary};
        animation: pulse-active 1.5s ease-in-out infinite;
      }

      & .dnd--cursor-near.dnd--drag-valid {
        border-color: ${token.colorSuccess};
        animation: pulse-valid 1.5s ease-in-out infinite;
      }

      & .dnd--cursor-near.dnd--drag-error {
        border-color: ${token.colorError};
        animation: pulse-error 1.5s ease-in-out infinite;
      }

      @keyframes pulse-active {
        0%, 100% { 
          opacity: 1; 
        }
        50% { 
          opacity: 0.7; 
        }
      }

      @keyframes pulse-valid {
        0%, 100% { 
          opacity: 1;
          border-color: ${token.colorSuccess};
        }
        50% { 
          opacity: 0.8;
          border-color: ${token.colorSuccessActive};
        }
      }

      @keyframes pulse-error {
        0%, 100% { 
          opacity: 1;
          border-color: ${token.colorError};
        }
        50% { 
          opacity: 0.8;
          border-color: ${token.colorErrorActive};
        }
      }
    `,
    outline: css`
      & .dnd--drag-valid {
        outline: 1px dashed ${token.colorInfoBorderHover} !important;
      }

      & .dnd--drag-error {
        outline: 1px dashed ${token.colorErrorActive} !important;
      }
    `,
    round: css`
      & .dnd--drag-active, & .dnd--drag-valid, & .dnd--drag-error {
        border-radius: ${token.borderRadius}px;
      }
    `
  }
})
