import { createStyles } from "antd-style";

export const useStyles = createStyles(({css, token}) => {
  return {
    selectionButton: css`
      color: transparent;
      transition: color 0.3s;

      &.selection-button--active {
        color: ${token.colorPrimary};
      }
    `,
  };
});
