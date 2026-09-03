/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStlyes = createStyles(({ token, css }) => {
  return {
    baseLayout: css`
      position: absolute;
      overflow: hidden;
      inset: 0;
    `,
    skipLink: css`
      position: absolute;
      top: -100%;
      left: ${token.paddingSM}px;
      z-index: 9999;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      background: ${token.colorPrimary};
      color: ${token.colorWhite};
      border-radius: ${token.borderRadiusSM}px;
      text-decoration: none;
      font-weight: 500;

      &:focus {
        top: ${token.paddingSM}px;
      }
    `
  }
}, { hashPriority: 'low' })
