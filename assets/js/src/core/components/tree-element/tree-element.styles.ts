/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

interface IStylesProps {
  isHideRootChecker?: boolean
  hasRoot?: boolean
  hideExpanders?: boolean
}

export const useStyles = createStyles(({ token, css }, props: IStylesProps) => {
  return {
    treeContainer: css`
      .ant-tree-list-holder-inner {
        min-width: fit-content;

        & > .ant-tree-treenode {
          .ant-tree-switcher {
            width: ${props.hasRoot === true ? '24px' : '0'};
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .ant-tree-treenode-leaf-last {
          &:first-child {
            .ant-tree-checkbox {
              display: ${(props.isHideRootChecker === true) ? 'none' : 'block'};
            }
          }
        }

        .ant-tree-node--has-drag-and-drop {
          height: 24px;

          .ant-tree-iconEle {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
          }

          .ant-tree-node-content-wrapper {
            display: flex;
          }

          .ant-tree-title {
            position: relative;
            width: 100%;
            flex-grow: 1;
          }

          .ant-tree-title__btn {
            text-align: left;
          }
        }

        .hotspot-droppable  .ant-tree-title__btn {
          position: relative;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          height: 24px;
          min-width: 100%;
        }

        .dnd--hotspot-sorting-top-valid .ant-tree-title__btn {
          &::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -48px;
            right: 0;
            height: 2px;
            background-color: ${token.colorPrimary};
          }

          &::after {
            content: '';
            position: absolute;
            top: -6px;
            left: -49px;
            border-radius: 50%;
            width: 7px;
            height: 7px;
            background-color: ${token.colorPrimary};
          }
        }

        .dnd--hotspot-sorting-bottom-valid .ant-tree-title__btn {
          &::before {
            content: '';
            position: absolute;
            bottom: -4px;
            left: -48px;
            right: 0;
            height: 2px;
            background-color: ${token.colorPrimary};
          }
          
          &::after {
            content: '';
            position: absolute;
            top: auto;
            right: auto;
            bottom: -6px;
            left: -49px;
            border-radius: 50%;
            width: 7px;
            height: 7px;
            background-color: ${token.colorPrimary};
          }
        }

        .dnd--hotspot-drop-middle-valid .ant-tree-title__btn {
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -48px;
            right: 0;
            bottom: 0;
            background: ${token.colorBgContainerDisabled};
            border-radius: ${token.borderRadius}px;
            outline: 1px dashed ${token.colorBorder};
          }
        }

        .ant-tree-treenode {
          white-space: nowrap;
          padding: 0 ${token.paddingXS}px;
          position: relative;
          margin-bottom: 0;
          
          @media (hover: hover) {
            &:hover {
              background-color: ${token.controlItemBgActiveHover};
            }
          }

          &:focus {
            outline: none;
            background-color: ${token.controlItemBgActiveHover};
          }

          .ant-tree-node-content-wrapper {
            padding: 0;
            background: none;

            &:hover {
              background: none;
            }
          }

          &::before {
            display: none;
          }
        }

        .ant-tree-treenode-selected,
        .ant-tree-treenode-selected:hover {
          background-color: ${token.controlItemBgActive};
        }
      }
      
      .ant-tree-treenode.ant-tree-treenode-draggable {
        .ant-tree-switcher {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0px;
          
          &:hover {
            background-color: transparent !important;
          }
        }

        .ant-tree-switcher:not(.ant-tree-switcher-noop):hover:before {
        background-color: transparent !important;
      }
      }

      .ant-tree-switcher-noop {
        pointer-events: none;
      }
      
      .ant-tree-switcher_close {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(0deg);
          }
        }
      }

      .ant-tree-switcher_open {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(-180deg);
          }
        }
      }

      .ant-tree-draggable-icon {
        display: none;
      }
      
      .ant-tree-title__btn {
        background: transparent;
        border: none;
        color: ${token.colorTextTreeElement};
        cursor: pointer;
        padding: 0;
        font-family: ${token.fontFamily};
        font-size: ${token.fontSize}px;
        
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

      .tree-element-item--danger {
        .ant-tree-title .ant-tree-title__btn {
          color: ${token.colorError};
        }

        .ant-tree-icon__customize {
          color: ${token.colorError};
        }
      }
      
      .ant-tree-icon__customize {
        position: relative;
        top: 1px;
      }

      ${props.hideExpanders === true ? '.ant-tree-switcher { display: none !important; width: 0 !important; }' : ''}
    `,
    noRoot: css`
      .ant-tree {
        background-color: red;

        .ant-tree-list-holder-inner > .ant-tree-treenode {
          background-color: red;

          .ant-tree-switcher {
            width: 0
          }
        }
      }
    `
  }
}, { hashPriority: 'high' })
