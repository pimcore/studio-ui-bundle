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
    title: css`
      .ant-space-item {
        display: flex;
        align-items: center;
        width: fit-content;
      }

      .ant-space-item:has(.widget-manager__tab-title-close-button) {
        margin-inline-start: ${token.sizeXXS}px;
      }
    `,

    // same as the unpublished elements in the tree: the icon fades, its "eye-off" sub icon stays opaque
    unpublishedIcon: css`
      .pimcore-icon__svg,
      .pimcore-icon__image {
        opacity: 0.4;
      }
    `
  }
}, { hashPriority: 'low' })
