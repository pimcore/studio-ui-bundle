import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    sidebar: css`
      display: flex;
      
      .sidebar__navigation {
          display: flex;
          width: 45px;
          padding: 4px 8px;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          align-self: stretch;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-left: 1px solid rgba(0, 0, 0, 0.08);
          justify-content: space-between;
          color: ${token.colorIconSidebar};

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

                  .pimcore-icon {
                      flex-shrink: 0;
                      color: ${token.colorIconSidebar};

                      &:hover {
                          color: ${token.colorIconHover};
                          cursor: pointer;
                      }
                  }

                  &.active {
                      border-right: 2px solid ${token.colorPrimaryActive};

                      .pimcore-icon {
                          color: ${token.colorPrimaryActive}
                      }
                  }
              }
          }
      }
      
      .sidebar__content {
        padding: ${token.paddingXS}px ${token.paddingSM}px;
        width: 250px;

        .tab {
          display: none;
          
            &.active {
                display: block;
            }
        }
        
        &:not(.expanded) {
          display: none;
        }
      }
    `
  }
}, { hashPriority: 'low' })
