import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    preview: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      object-fit: contain;

      .ant-image {
        display: flex;
        max-height: 100%;
        max-width: 100%;
      }

      .ant-image-img {
        object-fit: contain;
      }
    `,
    floatingContainer: css`
      position: absolute;
      bottom: 20px;
      width: 100%;
      z-index: 9999;
    `,
    flexContainer: css`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-left: 15px;
      padding-right: 15px;
    `
  }
}, { hashPriority: 'low' })
