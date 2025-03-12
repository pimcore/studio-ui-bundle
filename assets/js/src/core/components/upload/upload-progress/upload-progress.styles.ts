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
    uploadProgress: css`
      margin-top: ${token.paddingSM}px;
      margin-bottom: ${token.paddingSM}px;
      display: flex;
      gap: ${token.paddingSM}px;
      flex-direction: column;
      align-items: center;
        
      .progress-label {
          color: ${token.colorTextDescription};
      }
    `
  }
})
