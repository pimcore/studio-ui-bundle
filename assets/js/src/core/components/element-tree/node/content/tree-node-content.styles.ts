/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      width: 100%;
      min-width: 0;
    `,
    containerChild: css`
      min-width: 0;
      overflow: hidden;
      flex-shrink: 1;
    `,
    metaIcons: css`
      flex-shrink: 0;
    `,
    unpublishedIcon: css`
      .pimcore-icon__svg {
          opacity: 0.4
       }
    `,
    unpublishedIconPath: css`
       .pimcore-icon__image {
          opacity: 0.4
       }
    `,
    lockIcon: css`
      color: ${token.colorTextTreeElement};
    `
  }
})
