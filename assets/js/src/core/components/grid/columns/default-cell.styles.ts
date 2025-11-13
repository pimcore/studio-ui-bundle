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
import { type GridProps } from '@Pimcore/types/components/types'

export interface UseStyleProps {
  size?: GridProps['size']
}

export const useStyle = createStyles(({ token, css }, { size = 'normal' }: UseStyleProps) => {
  const gridCellPaddingVertical = size === 'small' ? 2 : 4
  const gridCellPaddingHorizontal = 4

  return {
    'default-cell': css`
      display: flex;
      width: 100%;
      height: 100%;

      &.default-cell--active:not(:focus):not(.default-cell--edit-mode) {
        background-color: ${token.controlItemBgActive};
      }
      
      &:focus {
        outline: 1px solid ${token.colorPrimaryActive};
        outline-offset: -1px;
      }

      .default-cell__content {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0 ${token.paddingXXS}px; 
        overflow: hidden;
        text-overflow: ellipsis;
        align-items: center;
        white-space: normal;
      }

      .default-cell__content--padded {
        padding: ${gridCellPaddingVertical}px ${gridCellPaddingHorizontal}px;
      }

      &.default-cell--modified, .default-cell--modified {
        &::after {
          content: '*';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          pointer-events: none;
          color: ${token.colorAccentSecondary};
          padding: 3px 4px;
          font-size: 12px;
          line-height: 12px;
          border-left: 3px solid ${token.colorAccentSecondary};
        }
      }
    `
  }
})
