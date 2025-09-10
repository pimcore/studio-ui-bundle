import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token }) => ({
  allowedObjectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: `${token.marginXS}px`,
    width: '100%'
  }
}))
