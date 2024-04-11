import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'scale-by-width': css`
      > .ant-image {
          max-width: 100%;
          max-height: 100%;
      }
    `,
    'scale-to-original-size': css`
      > .ant-image {
          max-width: unset !important;
          max-height: unset !important;
          
          .ant-image-img {
              width: unset !important;
          }
      }
    `,
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
    `
  }
}, { hashPriority: 'low' })
