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
