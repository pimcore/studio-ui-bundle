/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

interface IStylesProps {
  isHideRootChecker?: boolean
}

export const useStyles = createStyles(({ token, css }, props: IStylesProps) => {
  return {
    treeContainer: css`
      .ant-tree-list-holder-inner {
        .ant-tree-treenode-leaf-last {
          &:first-child {
            .ant-tree-checkbox {
              display: ${(props.isHideRootChecker === true) ? 'none' : 'block'};
            }
          }
        }

        .ant-tree-treenode {
          padding: 0 ${token.paddingXS}px;
          position: relative;
          
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
        }

        .ant-tree-treenode-selected,
        .ant-tree-treenode-selected:hover {
          background-color: ${token.controlItemBgActive};
        }
      }
      
      .ant-tree-switcher {
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
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
    `
  }
}, { hashPriority: 'high' })
