import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css}) => ({
  gridContentRenderer: css`
    &.grid-content-renderer {
      .ant-table-content table {
        min-width: auto !important;
        width: 100% !important;
      }

      .ant-table {
        margin-block: 0 !important;
        margin-inline: 0 !important;
      }

      .ant-table-thead {
        display: none;
      }

      .ant-table-row {
        display: flex;
        height: auto;
      }

      .ant-table-cell {
        width: auto !important;
        min-width: 0 !important;
        max-width: 100% !important; 
        border: none;

        &:nth-child(n + 2) {
          border-left: 2px solid ${token.Table.colorBorderSecondary};
        }
      }

      .default-cell__content {
        padding: 0;
        margin: 0 5px;
      }
    }
  `
}))
