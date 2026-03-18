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
    treeNode: css`
      user-select: none;

      &.tree-node--is-root {
        .tree-node__content {
          padding-left: ${token.paddingSM}px;
        }
      }

      &.tree-node--danger {
        .tree-node__content .tree-node__content-wrapper {
          color: ${token.colorError};
          text-decoration: line-through;
        }
      }

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        white-space: nowrap;
        align-items: center;

        .tree-node__content-wrapper {
          width: 100%;
          overflow: hidden;
        }

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

      .tree-node__content-inner {
        padding: 0 ${token.paddingSM}px 0 0;

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

      .tree-node__content-wrapper-outer {
        position: relative;
        padding: 2px 0 2px 0;
        gap: ${token.paddingXXS}px;
      }

      .tree-node__content--selected {
        background-color: ${token.controlItemBgActive};

        &:hover,
        & .tree-node__content-inner {
          background-color: ${token.controlItemBgActive};
        }
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        color: ${token.colorTextTreeElement};
      }
    `
  }
}, { hashPriority: 'low' })
