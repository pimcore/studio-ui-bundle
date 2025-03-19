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

export const useStyles = createStyles(({ token, css }) => {
  return {
    tag: css`
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    `,
    tagClickable: css`
      cursor: pointer;
    `,
    tagDisabled: css`
      position: relative;
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.07);
        pointer-events: none;
      }
    `
  }
})
