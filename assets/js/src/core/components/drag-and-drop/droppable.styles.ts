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
    droppable: css`
      & .dnd--drag-active {
        background: ${token.colorBgContainerDisabled};
        border: 1px dashed ${token.colorBorder};
        border-radius: ${token.borderRadius}px;
      }

      & .dnd--drag-valid {
        background: ${token.colorBgTextActive};
        border: 1px dashed ${token.colorInfoBorder};
        border-radius: ${token.borderRadius}px;
      }

      & .dnd--drag-error {
        background: ${token.colorErrorBg};
        border: 1px dashed ${token.colorErrorActive};
        border-radius: ${token.borderRadius}px;
      }
    `
  }
})
