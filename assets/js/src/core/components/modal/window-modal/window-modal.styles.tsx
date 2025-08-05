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

export const useStyle = createStyles(({ token, css }, { zIndex }: { zIndex?: number } = {}) => {
  return {
    wrapper: css`
      pointer-events: none;
      ${zIndex !== undefined ? `z-index: ${zIndex} !important;` : ''}
    `,
    modal: css`
      .ant-modal-content {
          outline: 1px solid ${token.colorBorderContainer};
          box-shadow: ${token.boxShadowSecondary} !important;
      }
    `
  }
}, { hashPriority: 'low' })
