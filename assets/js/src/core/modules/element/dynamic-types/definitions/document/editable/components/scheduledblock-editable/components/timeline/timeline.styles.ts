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

export const useStyles = createStyles(({ css, token }) => {
  return {
    sliderContainer: css`
      flex: 1;
      min-width: 200px;
      padding: 0 ${token.paddingSM}px;

      .ant-slider-track {
        display: none;
      }
    `,

    sliderWrapper: css`
      
      .ant-slider-handle {
        display: none;
      }
      
      .ant-slider-dot {
        display: none;
      }
    `
  }
})
