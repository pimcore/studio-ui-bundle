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
    content: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      gap: 12px;

      &.content--overflow-x-hidden {
        overflow-x: hidden;
      }

      &.content--overflow-y-hidden {
        overflow-y: hidden;
      }

      &.content--overflow-x-auto {
        overflow-x: auto;
      }

      &.content--overflow-y-auto {
        overflow-y: auto;
      }

      &.content--overflow-x-visible {
        overflow-x: visible;
      }

      &.content--overflow-y-visible {
        overflow-y: visible;
      }

      &.content--overflow-x-scroll {
        overflow-x: scroll;
      }

      &.content--overflow-y-scroll {
        overflow-y: scroll;
      }

      &.content--padded {
        padding: ${token.paddingSM}px;
      }

      &.content--centered {
        justify-content: center;
        align-items: center;
      }
    `,

    contentFullPage: css`
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    `
  }
})
