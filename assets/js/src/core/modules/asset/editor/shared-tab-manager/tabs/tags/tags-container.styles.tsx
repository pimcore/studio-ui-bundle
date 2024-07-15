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
    tab: css`
      display: flex;
      flex-direction: row;
        height: 100%;

        .ant-btn {
            color: ${token.colorPrimary};

            &:hover {
                color: ${token.colorPrimaryHover};
            }
        }
        
        .pimcore-tags-sidebar {
            width: auto;
        }
        
        .pimcore-tags-main {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        .ant-divider {
          stroke: ${token.Divider.colorSplit};
          height: 100%;
        }
    `,
    toolbar: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
    
        .pimcore-tags-toolbar__headline {
            font-weight: 600;
            line-height: 20px;
            color: ${token.itemActiveColor}; 
        }
        
        .ant-dropdown-button {
            width: auto;
        }
    `
  }
})
