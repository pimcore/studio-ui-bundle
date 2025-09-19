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
    tag: css`
      display: block;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;

      &.ant-tag {
        cursor: default;
      }
    `,
    tagClickable: css`
      &.ant-tag {
        cursor: pointer;
      }
    `,
    tagDisabled: css`
      position: relative;
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.07);
        pointer-events: none;
      }
    `
  }
})
