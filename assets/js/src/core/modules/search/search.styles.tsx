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
    detailContent: css`
      max-height: 450px;
    `,

    searchResultImage: css`
      min-height: 100px;
      max-height: 200px;
    `,

    searchResultDocument: css`
      iframe {
        width: 100%;
        height: 100%;
      }
    `
  }
})
