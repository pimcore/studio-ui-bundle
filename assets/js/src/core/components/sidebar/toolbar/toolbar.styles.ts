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
    toolbar: css`
      display: flex;
      justify-content: space-between;
      border-top: 1px solid ${token.colorBorder};
      gap: 8px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 48px;
      padding: ${token.paddingXS}px
    `
  }
})
