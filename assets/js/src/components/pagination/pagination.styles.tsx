import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    pagination: css`
      .jump-to-page {
          font-family: Lato, sans-serif;
          font-size: 12px;
          text-align: center;
          line-height: 32px;
          
          /* Firefox */
          -moz-appearance: textfield;
      }

      .jump-to-page:focus-visible {
          outline: none;
      }

      /* Chrome, Safari, Edge, Opera */
      .jump-to-page::-webkit-outer-spin-button,
      .jump-to-page::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
        
      .jump-to-container {
        position: relative;
      }
        
      .jump-to-page-label, .jump-to-page {
        display: block;  
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        bottom: 0;
        inset-inline-start: 0;
        margin: auto;  
          
        width: 32px;
        height: 32px;
          
        background-color: white;
        border: 1px solid ${token.colorPrimary};
        border-radius: 6px;
        cursor: text;
      }

      .ant-pagination .ant-pagination-item a.display-none {
        display: none;
      }

      .ant-pagination .ant-pagination-item {
          height: unset;
      }  
    `
  }
}, { hashPriority: 'low' })
