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
