import { createStyles } from "antd-style";

export const useStyles = createStyles((({ token, css }) => {
  return {
    subscriptionDetails: css`
      position: relative;

      .subscription-details__icon {
        position: absolute;
        top: -4px;
        right: 6px;
        color: ${token.colorWarningActive};
      }

      .subscription-details__link {
        display: block;
      }
    `,
  };
}));
