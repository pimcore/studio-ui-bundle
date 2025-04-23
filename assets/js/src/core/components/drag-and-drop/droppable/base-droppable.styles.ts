/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
