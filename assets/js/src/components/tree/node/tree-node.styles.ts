/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    treeNode: css`
      user-select: none;

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        padding: 2px ${token.paddingSM}px 2px 0;
        white-space: nowrap;
        align-items: center;

        @media (hover: hover) {
          &:hover {
            background-color: ${token.controlItemBgActiveHover};
          }
        }

        &:focus {
          outline: none;
          background-color: ${token.controlItemBgActiveHover};
        }
      }

      &.tree-node--selected > .tree-node__content {
        background-color: ${token.controlItemBgActive};
      }

      .tree-node__content-wrapper {
        max-width: max(100px, calc(100% - 16px));
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
  }
}, { hashPriority: 'low' })
