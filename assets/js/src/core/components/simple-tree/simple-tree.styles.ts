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

export const useStyles = createStyles(({ token, css }) => {
    return {
        tree: css`
            .ant-tree-treenode {
                padding: 2px ${token.paddingSM}px 2px 0;
                position: relative;
                gap: 8px;
                
                @media (hover: hover) {
                    &:hover {
                        background-color: ${token.controlItemBgActiveHover};
                    }
                }
                
                &:focus {
                    outline: none;
                    background-color: ${token.controlItemBgActiveHover};
                }
            }
            
            .ant-tree-treenode-selected {
                background-color: ${token.controlItemBgActive};
            }

            .ant-tree-list .ant-tree-node-content-wrapper {
                background: none;
                position: static;
                padding: 0;
                line-height: 20px;
                min-height: 20px;
                display: flex;
                gap: 8px;

                &:hover {
                    background: none;
                }
            }
            
            .ant-tree-list .ant-tree-switcher {
                position: relative;
                z-index: 1;
                width: 16px;
                height: 16px;
                background: none;
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

            .ant-tree-list .ant-tree-iconEle.ant-tree-iconEle {
                width: 16px;
                height: 16px;
                line-height: 22px;
            } 
            
            .ant-tree-checkbox {
                margin: 1px 0 0 0;
                z-index: 1;
            }
            
            .ant-tree-draggable-icon {
                display: none;
            }
            .ant-tree-switcher-noop {
                pointer-events: none;
            }
        `
    }
}, { hashPriority: 'high' })