import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    pagination: css`
      .ant-pagination .ant-pagination-item {
        padding: unset;
        margin-top: unset;
        margin-bottom: unset;
        vertical-align: middle;
      }

      button.page-number-node {
        color: black;
        text-align: center;
        vertical-align: text-bottom;
        box-shadow: none;
        padding: 0 2px 2px 0;
        border: none;
      }

      button.page-number-node, .ant-pagination .ant-pagination-item {
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        background-color: transparent;
      }
      
      & .ant-pagination-item-active span {
        color: ${token.colorPrimary};
      }
    `
  }
}, { hashPriority: 'low' })
