import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    treeNode: css`
      user-select: none;
      padding-inline: 20px;
    `
  }
})
