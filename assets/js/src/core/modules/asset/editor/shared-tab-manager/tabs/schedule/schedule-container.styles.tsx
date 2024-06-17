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

export const useStyles = createStyles(({ css, token }) => {
  return {
    tab: css`
      .pimcore-schedule-toolbar {
        padding: 0 ${token.paddingSM}px;
          
        .pimcore-schedule-toolbar__headline {
          padding-top: ${token.paddingXS}px;
          padding-bottom: ${token.paddingXS}px;
          display: flex;
          align-items: center;
          gap: 8px;
            
          .pimcore-schedule-toolbar__headline__text {
            font-weight: 600;
            color: ${token.colorPrimary};
            margin: 0;

            &:hover {
              color: ${token.colorPrimaryHover};
            }
          }
            
          .pimcore-schedule-toolbar__headline__buttons {
            display: flex;
            justify-content: space-between;
            flex-grow: 1;

            .pimcore-schedule-toolbar__headline__buttons__add,
            .pimcore-schedule-toolbar__headline__buttons__save {
              display: flex;
              align-items: center;
              line-height: 22px;
            }
          }
        }
          
        .pimcore-schedule-toolbar__filters {
          padding-top: ${token.paddingXXS}px;
          display: flex;
          justify-content: space-between;
            
          .pimcore-schedule-toolbar__filters__active-switch {
            display: flex;
            align-items: center;
            gap: 8px;
          }
        }
      }
          
        .ant-segmented-group {
          padding: 0px;
          border-radius: ${token.borderRadius}px;
          border: 1px solid ${token.colorBorderSecondary};
          background: ${token.colorBgLayout};
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          
          .ant-segmented-item {
            color: ${token.itemColor};
          
          &.ant-segmented-item-selected {
            background: ${token.controlItemBgActive};
            border-color: ${token.controlItemBgActive};
            color: rgba(0, 0, 0, 0.88); //TODO: replace with token
          }
        }
      }

      .pimcore-schedule-content {
        padding: 0 ${token.paddingSM}px;
      }
    `
  }
})
