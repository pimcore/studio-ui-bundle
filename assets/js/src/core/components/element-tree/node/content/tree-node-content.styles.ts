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
    container: css`
      width: 100%;
      overflow: hidden;
    `,
    containerChild: css`
      min-width: 150px
    `,
    unpublishedIcon: css`
      color: ${token.colorIconTreeUnpublished}
    `,
    unpublishedIconPath: css`
       .pimcore-icon__image {
          opacity: 0.4
       }
    `,
    indirectLockedIcon: css`
      opacity: 0.5;
    `
  }
})
