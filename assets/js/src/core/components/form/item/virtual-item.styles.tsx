import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => {
  return {
    virtualItem: css`
      .virtual-item__label {
        display: flex;
        padding: ${token.Form.verticalLabelPadding}px;
      }
    `
  };
});
