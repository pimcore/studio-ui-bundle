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

export const useStyles = createStyles(({ css, token }) => {
  return {
    space: css`
      &.space--sizing-none {
        gap: 0;
      }

      &.space--sizing-mini {
        gap: ${token.sizeXXS}px;
      }

      &.space--sizing-extra-small {
        gap: ${token.sizeXS}px;
      }

      &.space--sizing-small {
        gap: ${token.sizeSM}px;
      }

      &.space--sizing-normal {
        gap: ${token.size}px;
      }

      &.space--sizing-medium {
        gap: ${token.sizeMD}px;
      }

      &.space--sizing-large {
        gap: ${token.sizeLG}px;
      }

      &.space--sizing-extra-large {
        gap: ${token.sizeXL}px;
      }

      &.space--sizing-maxi {
        gap: ${token.sizeXXL}px;
      }
    `
  }
})
