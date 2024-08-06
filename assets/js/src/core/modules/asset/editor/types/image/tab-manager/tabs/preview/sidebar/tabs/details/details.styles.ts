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

export const useStyle = createStyles(({ token, css }) => {
  return {
    sidebarContentEntry: css`
            .sidebar__content-label {
                color: ${token.colorPrimaryActive};
                line-height: 20px;
                font-weight: 600;
                margin: 0;
                padding-bottom: ${token.paddingXS}px;
                
                &:not(:first-of-type) {
                    padding-top: ${token.paddingXS}px;
                }
            }
        `,

    sidebarContentDimensions: css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            
            .entry-content__dimensions-label {
                display: flex;
                padding-bottom: ${token.paddingXXS};
                gap: ${token.marginMD}px;
                align-items: center;
                gap: ${token.marginXXS};
                align-self: stretch;

                p {
                    margin: 0
                }
            }

            .entry-content__dimensions-content {
                color: ${token.colorTextDescription};
                display: flex;
                padding-bottom: ${token.paddingXXS};
                gap: ${token.marginMD}px;
                align-items: center;
                gap: ${token.marginXXS};
                align-self: stretch;

                p {
                    margin: 0;
                    line-height: 22px;
                }
            }
        `,

    sidebarContentDownload: css`
            .entry-content__download-content-thumbnail {
                display: flex;
                align-items: center;
                gap: ${token.paddingXXS}px;
                padding-bottom: ${token.paddingSM}px;
                
                .ant-select {
                    flex: 1
                }
            }
            
            .entry-content__download-content-custom {
                .ant-form-item {
                    margin-bottom: 0;
                }
                
                .entry-content__download-content-custom__dimensions {
                    display: flex;
                    gap: ${token.marginSM}px;
                    padding-bottom: ${token.paddingSM}px;
                }
                
                .entry-content__download-content-custom__others {
                    display: flex;
                    gap: ${token.paddingXS}px;
                    flex-direction: column;
                    padding-bottom: ${token.paddingSM}px;
                    
                    > div {
                        display: flex;
                        gap: ${token.marginSM}px;
                        
                        >.ant-form-item {
                            flex: 1
                        }
                    }
                }
                
                .entry-content__download-content-custom__button {
                    padding: ${token.paddingXS}px 0;
                }
              
                .entry-content__download-content-custom__default {
                  color: ${token.colorTextDescription};
                }
            }
        `
  }
}, { hashPriority: 'low' })
