import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => {
  return {
    split: css`
      .ant-divider {
        height: 24px; 
        margin-inline: 0;
      }
    `,
  }
})
