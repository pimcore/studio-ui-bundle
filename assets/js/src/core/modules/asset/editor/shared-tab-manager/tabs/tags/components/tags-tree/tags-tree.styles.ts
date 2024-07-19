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

export const useStyle = createStyles(({ token, css }) => {
  return {
    search: css`
      padding-top: ${token.paddingXS}px;
        
      .ant-input-group-addon {        
        > .ant-btn {
            border-color: #d9d9d9;
           color: ${token.colorPrimary} !important; 
        }
      }
    `,
    tree: css`
      padding-top: ${token.paddingXS}px;
      .ant-tree-list-holder-inner {
        .ant-tree-treenode:first-of-type {
          >.ant-tree-indent {
            display: none
          }
        }
      }
      .
    `
  }
})
