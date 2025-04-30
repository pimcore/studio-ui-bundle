/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    detailContent: css`
      max-height: 400px;
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
