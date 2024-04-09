import { createStyles } from 'antd-style'

export const useStlyes = createStyles(({
  token,
  css
}) => {
  return {
    leftSidebar: css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;

      .left-sidebar__avatar {
        margin: 8px 15px 0 15px;
        pointer-events: all;
      }

      .ant-avatar {
        background-color: rgba(114, 46, 209, 0.66);

        .anticon {
          vertical-align: 0;
        }
      }
    `
  }
}, { hashPriority: 'low' })
