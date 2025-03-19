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
    table: css`
      width: auto !important;
      min-width: 100%;
      border-radius: 0 !important;

      td, th {
        padding: 2px ${token.paddingXXS}px !important;
        text-align: left;
        border: 1px solid ${token.colorBorderSecondary};
        white-space: nowrap;
        width: auto;
      }
      
    `,
    tableNoMinWidth: css`
      min-width: auto;
    `
  }
})
