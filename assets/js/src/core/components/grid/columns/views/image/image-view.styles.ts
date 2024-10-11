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
    image: css`
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      width: 100%;
      height: 100%;

      &.image-cell.default-cell__content {
        margin: ${token.paddingXXS}px;
      }

      .ant-image {
        display: flex;
        width: 100%;
        height: 100%;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    `
  }
}, { hashPriority: 'low' })
