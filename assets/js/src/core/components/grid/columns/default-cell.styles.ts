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
    `
  }
})
