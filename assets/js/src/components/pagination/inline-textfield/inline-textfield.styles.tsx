import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'editable-container': css`
      position: relative;
        
      .input-field {
          font-family: Lato, sans-serif;
          font-size: 12px;
          text-align: center;
          line-height: 32px;

          border-radius: ${token.borderRadius}px;
          border-color: ${token.colorBorder};
          background-color: white;
          
          /* Firefox */
          -moz-appearance: textfield;
      }

      .input-field:focus-visible {
          outline: none;
      }

      /* Chrome, Safari, Edge, Opera */
      .input-field::-webkit-outer-spin-button,
      .input-field::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }

      & a, .input-field {
          display: block;
          position: absolute;
          top: 0;
          inset-inline-end: 0;
          bottom: 0;
          inset-inline-start: 0;
          margin: auto;

          width: 32px;
          height: 32px;
      }
        
      .inline-label {
          border: 1px solid ${token.colorPrimary};
          border-radius: 6px;
          cursor: text;
      }
      
      .input-field.remove-decoration {
          border: none;
          background: none;
      }
        
      & a.inline-label.display-none, & a.inline-label-dots.display-none, & input.input-field.display-none {
          display: none;
      } 
        
      a {
          font-family: Lato, sans-serif;
          line-height: 30px;
          text-align: center;
          color: unset;
      }  
    `
  }
}, { hashPriority: 'low' })
