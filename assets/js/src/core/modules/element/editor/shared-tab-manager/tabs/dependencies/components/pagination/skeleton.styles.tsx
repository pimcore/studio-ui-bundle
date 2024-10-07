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

// @todo move to components
export const useStyle = createStyles(({ token, css }) => {
  return {
    skeleton: css`
      width: 100%;
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: flex-end;
        
      .square {
        .ant-skeleton-button {
          width: 24px;
          height: 24px;
          min-width: unset;   
        }
      }
    `
  }
})
