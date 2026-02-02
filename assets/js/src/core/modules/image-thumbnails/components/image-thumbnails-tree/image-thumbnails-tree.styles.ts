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
    container: css`
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `,
    
    toolbar: css`
      border-bottom: 1px solid ${token.colorBorder};
      padding: ${token.paddingXS}px;
      background: ${token.colorBgContainer};
    `,
    
    toolbarActions: css`
      display: flex;
      justify-content: flex-end;
      gap: ${token.marginXS}px;
    `,
    
    treeContent: css`
      flex: 1;
      overflow: auto;
      
      .ant-tree {
        background: transparent;
        
        .ant-tree-node-content-wrapper {
          &:hover {
            background: ${token.colorBgTextHover};
          }
          
          &.ant-tree-node-selected {
            background: ${token.colorPrimary};
            color: ${token.colorWhite};
          }
        }
      }
    `,
    
    folderIcon: css`
      width: 16px;
      height: 16px;
      background: ${token.colorPrimary};
      border-radius: 2px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: ${token.colorWhite};
        border-radius: 1px;
      }
    `,
    
    thumbnailIcon: css`
      width: 16px;
      height: 16px;
      background: ${token.colorSuccess};
      border-radius: 50%;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: ${token.colorWhite};
        border-radius: 50%;
      }
    `
  }
})
