import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    'tree-list__pager': css` 
      padding: ${token.paddingSM}px 0;

      &:empty {
        padding: 0;
      }
    `,

    'tree-list__search': css`
      padding: ${token.paddingXS}px ${token.paddingSM}px ${token.paddingXXS}px 0;

      &:empty {
        padding: 0;
      }
    `
  }
}, { hashPriority: 'low' })
