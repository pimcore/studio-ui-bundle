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
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          align-self: stretch;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-left: 1px solid rgba(0, 0, 0, 0.08);

          .entry {
              display: flex;
              width: 45px;
              padding: ${token.paddingXS}px ${token.paddingXXS}px;
              justify-content: center;
              align-items: center;

              .pimcore-icon {
                  flex-shrink: 0;
                  color: ${token.Tabs.itemUnselectedIconColor};

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
      
      .sidebar__content {
        padding: ${token.paddingXS}px ${token.paddingSM}px;
        
        .sidebar__content-entry {
            width: 250px;
          
          .sidebar__content-label {
            color: ${token.colorPrimaryActive};
            line-height: 20px;
            margin: 0;
            font-weight: 600;
          }
        }
      }
    `
  }
})
