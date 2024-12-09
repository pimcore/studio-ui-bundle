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

export const useStyles = createStyles(({ css, token }) => {
  return {
    'tool-strip-box': css`
      .tool-strip-box__content {
        border: 2px solid rgba(0, 0, 0, 0.04);
        border-radius: ${token.borderRadius}px;
      }

      &.tool-strip-box--with-start .tool-strip-box__content {
        border-top-left-radius: 0;
      }

      &.tool-strip-box--with-end .tool-strip-box__content {
        border-top-right-radius: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__content {
        border-radius: 0;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__strip--start {
        border-top-left-radius: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__strip--end {
        border-top-right-radius: 0;
      }
    `
  }
})
