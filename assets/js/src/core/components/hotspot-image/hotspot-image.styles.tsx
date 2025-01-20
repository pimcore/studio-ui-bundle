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
    hotspotImage: css`
            position: relative;
            width: fit-content;
            height: auto;
            margin: 0 auto;
            
            .hotspot-image__image {
                width: auto;
                max-width: 100%;
                height: auto;
                display: block;
            }
            
            .hotspot-image__item {
                border-radius: ${token.borderRadius}px;
                color: ${token.colorPrimary};
                background: rgba(215, 199, 236, 0.40);
                border: 3px dashed ${token.colorPrimary};
                border-radius: ${token.borderRadius}px;
                user-select: none;
                cursor: nwse-resize;
                
                &:before {
                    content: '';
                    position: absolute;
                    right: 6px;
                    bottom: 6px;
                    left: 6px;
                    top: 6px;
                    cursor: move;
                }
            }
            
            .hotspot-image__item--marker {
                cursor: move;
                border-width: 1px;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .hotspot-image__item--disabled {
                cursor: default;
                &:before {
                    cursor: default;
                }
            }
            
            .hotspot-image__popover {
            }
        `,
    Popover: css`
            .ant-popover-inner {
                padding: ${token.paddingXS}px;
            }
        `
  }
})
