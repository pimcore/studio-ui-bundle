import { createGlobalStyle, createStyles } from "antd-style";

export const useStyle = createStyles(({token, css}) => {
  return {
    droppable: css`
      & .dnd--drag-active {
        background: ${token.colorBgContainerDisabled};
        border: 1px dashed ${token.colorBorder};
      }

      & .dnd--drag-valid {
        background: ${token.colorBgTextActive};
        border: 1px dashed ${token.colorInfoBorder};
      }

      & .dnd--drag-error {
        background: ${token.colorErrorBg};
        border: 1px dashed ${token.colorErrorActive};
      }
    `,
  }
});

export const GlobalStyle = createGlobalStyle(({theme: token}) => {
  return {
    '.dnd--dragging': {
      cursor: 'move',
    },

    '.dnd--invalid': {
      '.dnd__overlay': {
        background: token.colorErrorBg,
        color: token.colorErrorActive
      },
    },
  }
});
