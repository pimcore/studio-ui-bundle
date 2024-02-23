import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    treeNode: css`
      user-select: none;

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        padding: 2px ${token.paddingSM}px 2px 0;
        white-space: nowrap;
        align-items: center;

        @media (hover: hover) {
          &:hover {
            background-color: ${token.controlItemBgActiveHover};
          }
        }
      }

      &.tree-node--selected > .tree-node__content {
        background-color: ${token.controlItemBgActive};
      }

      .tree-node__content-wrapper {
        max-width: max(100px, calc(100% - 16px));
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
  }
})
