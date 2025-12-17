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

export const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
      height: 100%;
      padding: ${token.padding}px;
    `,

    innerContainer: css``,

    thumbnailContainer: css`
      max-height: 800px;
      
      .ant-image-img {
        max-height: 800px;
      }
    `,

    thumbnail: css``
  }
})
