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
    'notification-content': css`
      .ant-btn {
        color: ${token.colorPrimary};
        box-shadow: none;
        outline: none;
        transition: unset;
        padding: 0 ${token.paddingXXS}px;

        &:hover {
          color: ${token.colorPrimaryHover};
        }
      }
        
      .notification-content__header { 
        .notification-content__header__content {
          .notification-content__header__headline {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 4px;
              
            > div {
              display: flex;
              flex-direction: row;
              align-items: center;
            }
          
            p {
              margin: 0; 
            }

            .notification-content__header__headline__collapse-btn {
                background: transparent;
                border: none;
                box-shadow: none;
                display: flex;
                width: 24px;
                height: 24px;
                justify-content: center;
                align-items: center;
            }
          }
        }
      }
        
      .notification-content__content {          
        &.collapsed {
          display: none;
        }

        &.collapse {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notification-content__content__completed-actions {
          .notification-content__content__completed-actions__headline {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4px;
          }

          .notification-content__content__completed-actions__actions {
            .notification-content__content__completed-actions__actions__action {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;

              p {
                margin: 0;
              }
            }
          }
        }
      }  
    `
  }
})
