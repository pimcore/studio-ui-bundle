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

export const useStyle = createStyles(({ css, token }) => {
  return {
    dragOverlay: css`
      margin-top: 15px;
      margin-left: 15px;
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: center;
      padding: 5px;
      width: max-content;
      background: white;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
      box-sizing: border-box; 

      .dnd--invalid & {
        background: ${token.colorErrorBg};
        color: ${token.colorErrorActive};
      }


      .dnd__overlay--icon-valid {
        color: ${token.colorSuccessActive};
        display: none;
      }

      .dnd__overlay--icon-invalid {
        color: ${token.colorErrorActive};
        display: none;
      }

      .dnd__overlay--icon-dragging {
          display: flex
      }

     .dnd__overlay--icon-valid, .dnd--has-valid-drop & .dnd__overlay--icon-dragging, .dnd--invalid & .dnd__overlay--icon-dragging {
          display: none;
      }

      .dnd--has-valid-drop & .dnd__overlay--icon-valid {
        display: flex;
      }
      .dnd--invalid & .dnd__overlay--icon-invalid {
        display: flex;
      }

    `
  }
})
