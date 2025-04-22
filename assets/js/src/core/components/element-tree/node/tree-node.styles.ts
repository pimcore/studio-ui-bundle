/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    treeNode: css`
      user-select: none;

      &.tree-node--is-root {
        & > .tree-node__content {
          padding-left: ${token.paddingSM}px;
        }
      }

      &.tree-node--danger {
        & > .tree-node__content .tree-node__content-wrapper {
          color: ${token.colorError};
          text-decoration: line-through;
        }
      }

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        padding: 2px ${token.paddingSM}px 2px 0;
        white-space: nowrap;
        align-items: center;
          
        .ant-upload-wrapper {
          width: 100%;
          overflow: hidden;
            
          .ant-upload {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 8px
          }
        }

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

      &.tree-node--selected > .tree-node__content {
        background-color: ${token.controlItemBgActive};
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
  }
}, { hashPriority: 'low' })
