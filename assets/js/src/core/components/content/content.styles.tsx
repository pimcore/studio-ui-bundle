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
import { type Sizings, getTokenValue } from '@Pimcore/utils/sizing'

interface ContentStylesProps {
  gap: Sizings
}

export const useStyles = createStyles(({ token, css }, { gap }: ContentStylesProps) => {
  const gapValue = getTokenValue(token, gap, 'margin')

  return {
    content: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      gap: ${gapValue}px;
      
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
      
      &.content--is-default-padded .ant-table-thead,
      &.content--padded .ant-table-thead,
      &.p-t-small .ant-table-thead {
        top: -${token.paddingSM}px;
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
