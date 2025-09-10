import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token }) => ({
  allowedContextMenuOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: `${token.marginXS}px`,
    width: '100%'
  }
}))
