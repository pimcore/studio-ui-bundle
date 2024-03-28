import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    WidgetTitle: css`
      display: flex;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      gap: 8px;
      align-items: center;
      color: ${token.Tree.colorPrimaryHeading};
      font-weight: 600;
    `
  }
}, { hashPriority: 'low' })
