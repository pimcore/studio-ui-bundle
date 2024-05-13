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
    resizer: css`
      &.grid__resizer {
        position: absolute;
        right: -4px;
        top: 0;
        bottom: 0;
        width: 8px;
        z-index: 1;
        background-color: transparent;

        &--resizing {
          background-color: ${token.colorPrimary};
          width: 2px;
          right: -1px;
        }

        &--hoverable {
          cursor: col-resize;
        }
      }

      &:focus {
        outline: none;
      }
    `
  }
}, { hashPriority: 'low' })
