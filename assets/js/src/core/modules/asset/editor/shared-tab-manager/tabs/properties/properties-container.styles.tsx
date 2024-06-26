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
      flex-direction: column;
    `,
    toolbar: css`
      display: flex;
      gap: 12px;
      padding: ${token.paddingXS}px;
      align-items: center;
        
      .ant-btn {
        display: flex;
        align-items: center;
      }
        
      .pimcore-properties-toolbar__headline {
          font-weight: 600;
          line-height: 20px;
          color: ${token.itemActiveColor};
      }
        
      .ant-segmented-group {
        padding: 2px;
        border-radius: ${token.borderRadius}px;
        border: 1px solid ${token.colorBorderSecondary};
        background: ${token.colorBgLayout};
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
          
        .ant-segmented-item {
          color: ${token.itemColor};
          
          &.ant-segmented-item-selected {
            background: ${token.controlItemBgActive};
            border-color: ${token.controlItemBgActive};
            color: rgba(0, 0, 0, 0.88); //TODO: replace with token
          }
        }
      }

      .pimcore-properties-toolbar__predefined-properties {
        display: flex;
        align-items: center;
        gap: 8px;
          
        .pimcore-properties-toolbar__predefined-properties__manual {
          display: flex;
          gap: 8px;
          
          .ant-btn {
            color: ${token.colorPrimary};
            
            &:hover {
              color: ${token.colorPrimaryHover};
            }
          }
            
          .ant-select {
            min-width: 100px;
          }
        }
        
        .ant-select {
          .ant-select-selection-placeholder,
          .ant-select-arrow {
            color: rgba(0, 0, 0, 0.88)   
          }
        }
        
        .ant-divider {
          border-color: ${token.Divider.colorSplit};
          height: 24px;
          margin: 0;
        }
      }
    `
  }
})
