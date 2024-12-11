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
            
            .hotspot-image__image {
                width: 100%;
                height: auto;
            }
      }
      
      // &.image-preview-bordered {
      //   outline: 1px solid ${token.colorBorderSecondary};
      //   border-radius: ${token.borderRadius}px;
      //   .ant-image-img {
      //      border-radius: ${token.borderRadius}px;
      //   }
      // }
    `
    }
})
