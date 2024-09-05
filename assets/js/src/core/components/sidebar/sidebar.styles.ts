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
    sidebar: css`
      display: flex;
        height: 100%;
      
      .sidebar__navigation {
          display: flex;
          width: 45px;
          padding: 4px 8px ${token.paddingSM}px 8px;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          align-self: stretch;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-left: 1px solid rgba(0, 0, 0, 0.08);
          justify-content: space-between;
          color: ${token.colorIconSidebar};
          background: ${token.colorBgToolbar};

          .sidebar__navigation__tabs,
          .sidebar__navigation__buttons {
            .pimcore-icon {
              flex-shrink: 0;
              color: ${token.colorIconSidebar};

              &:hover {
                color: ${token.colorIconHover};
                cursor: pointer;
              }
            }
          }

          .sidebar__navigation__tabs {
              .entry {
                  display: flex;
                  width: 45px;
                  padding: ${token.paddingXS}px ${token.paddingXXS}px;
                  justify-content: center;
                  align-items: center;

                  &:not(.active).entry--highlighted {
                      .pimcore-icon {
                          background: ${token.colorFillQuaternary};
                          border-radius: 2px;
                          outline: 8px solid ${token.colorFillQuaternary};
                      }
                  }

                  .pimcore-icon {
                      flex-shrink: 0;
                      color: ${token.colorIconSidebar};

                      &:hover {
                          color: ${token.colorIconHover};
                          cursor: pointer;
                      }
                  }

                  &.active {
                      background: ${token.colorFillQuaternary};
                      border-right: 2px solid ${token.colorPrimaryActive};

                      .pimcore-icon {
                          color: ${token.colorPrimaryActive}
                      }
                  }
              }
          },
      
          .sidebar__navigation__buttons
            .button {
              &.button--highlighted {
                .pimcore-icon {
                    background: ${token.colorFillQuaternary};
                    border-radius: 2px;
                    outline: 8px solid ${token.colorFillQuaternary};
                  color: ${token.colorPrimary};
                }
              }
            }
          }
      
      .sidebar__content {
        position: relative;
        overflow: auto;
        width: 250px;

        .tab {
          display: none;
          
          &.active {
              display: flex;
              width: 100%;
              height: 100%;
          }
        }
        
        &:not(.expanded) {
          display: none;
        }

        &--sizing-large {
          width: 432px;
        }
      }
    `
  }
}, { hashPriority: 'low' })
