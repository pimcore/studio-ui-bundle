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
            .sidebar__content-hr {
              position: absolute;
              left: 0;
              right: 0;
              border-color: ${token.colorSplit};
              margin: 0;
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
            }
        `,
    sidebarContentImagePreview: css`
      & > .sidebar__content-label {
        margin-top: ${token.marginXS}px;
      }
      
      .ant-btn-group {
        button {
          padding: 0 4px;
          height: 24px;
          border-radius: unset;
        }
        button:nth-child(1)  {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        button:nth-child(2)  {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }

      .ant-card {
        height: 208px;
      }
      
      .ant-card, .ant-card-meta-title {
        margin-top: ${token.marginSM}px;
      }
      
      .image-preview-container {
        height: 129px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        div {
          display: flex;
          gap: ${token.marginXXS}px;
        }
        
        span {
          margin-top: ${token.marginSM}px;
        }
      }

      .image-preview__toolbar {
        position: absolute;
        left: 0;
        right: 0;
        background: none;
        margin-top: ${token.marginXS}px
      }
    `
  }
}, { hashPriority: 'low' })
