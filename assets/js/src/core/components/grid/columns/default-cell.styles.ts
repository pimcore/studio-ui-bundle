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
    'default-cell': css`
      display: flex;
      width: 100%;
      height: 100%;
    
      &:focus {
        outline: 1px solid ${token.colorPrimaryActive};
        outline-offset: -1px;
      }

      .default-cell__content {
        width: 100%;
        margin: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.default-cell--modified, .default-cell--modified {
        &::after {
          content: '*';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          pointer-events: none;
          color: ${token.colorAccentSecondary};
          padding: 3px 4px;
          font-size: 12px;
          line-height: 12px;
          border-left: 3px solid ${token.colorAccentSecondary};
        }
      }
    `
  }
})
