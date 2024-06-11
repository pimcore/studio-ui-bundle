import { createStyles } from "antd-style";

export const useStyle = createStyles(({css}) => {
  return {
    dragOverlay: css`
      display: inline-flex;
      gap: 5px;
      align-items: center;
      padding: 5px;
      width: max-content;
      background: white;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    `,
  }
});
