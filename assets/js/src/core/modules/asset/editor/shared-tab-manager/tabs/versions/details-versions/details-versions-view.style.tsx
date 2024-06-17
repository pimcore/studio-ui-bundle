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
    'right-side': css`
      width: calc(100% - 369px);
      padding: ${token.paddingSM}px;

      & > div {
        display: flex;
        flex-direction: row;
      }
      
      & .ant-table {
        width: 100%;
      }
      
      & .highlight-cell {
        background-color: ${token.colorWarningBg};
        font-weight: bold;
      }
    `
  }
}, { hashPriority: 'low' })
