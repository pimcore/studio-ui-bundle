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
  const baseTag = css`
    max-width: 100%;

    &.ant-tag {
      display: flex;
      align-items: center;
      cursor: default;
      
      > .tag-content {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .ant-tag-close-icon {
        flex: 0 0 auto;
        margin-inline-start: 4px;
      }
    }
  `

  return {
    tag: css`
      ${baseTag}
    `,
    tagInline: css`
      ${baseTag}
      
      &.ant-tag {
        display: inline-flex;
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
