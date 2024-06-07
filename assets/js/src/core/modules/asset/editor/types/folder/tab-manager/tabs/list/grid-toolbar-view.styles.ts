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
    GridToolbar: css`
      display: flex;
      justify-content: space-between;
      background-color: ${token.colorWhite};
      padding-right: ${token.paddingSM}px;
      padding-left: ${token.paddingXS}px;
      height: ${token.sizeXXL}px;
      align-items: center;
      justify-content: space-between;
    `
  }
}, { hashPriority: 'low' })
