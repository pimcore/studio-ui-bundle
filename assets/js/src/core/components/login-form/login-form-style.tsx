import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    form: css`
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: Lato, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;

        .flex-space {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ant-btn-link {
          color: ${token.colorPrimary};

          &:hover {
            color: ${token.colorPrimaryHover};
          }
        }
      }
        
      .login__additional-logins {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        
        .ant-btn {
          width: 100%;
        }
      }
    `
  }
})
