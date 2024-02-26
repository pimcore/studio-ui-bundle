import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'container': css`
      border-radius: ${token.paddingContentVerticalSM}px ${token.borderRadius}px ${token.borderRadius}px;
      border-top: 0.5px solid #DFD7EA;
      border-right: 0.3px solid #DFD7EA;
      border-bottom: 0.3px solid #DFD7EA;
      border-left: 0.3px solid #DFD7EA;
      background: #FFF;
    `,
    'left-container': css`
      display: flex;
      align-items: center;
      gap: ${token.marginXS}px;
    `,
    'btn-info': css`
      padding-left: 5px;
      padding-right: 17px;
    `,
    'info-arrow-down': css`
      position: absolute;
      top: 13px;
      left: 26px;
    `,
    'btn-default-color': css`
          color: ${token.Button.defaultColor};
    `,
    'more-arrow-down': css`
      position: absolute;
      top: 13px;
      right: 5px;
    `,
  }
})
