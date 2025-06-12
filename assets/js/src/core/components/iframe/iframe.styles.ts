import { createStyles } from 'antd-style'

interface StylesProps {
  isLoaded: boolean
}

export const useStyle = createStyles(({ css, token }, props: StylesProps) => {
  return {
    iframeContainer: css`
      width: 100%;
      height: 100%;
    `,

    iframe: css`
      width: 100%;
      height: 100%;
      border: none;
      display: ${props.isLoaded ? 'block' : 'none'};
    `
  }
})
