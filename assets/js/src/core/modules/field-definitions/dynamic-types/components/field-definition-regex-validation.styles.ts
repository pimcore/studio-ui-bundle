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
    testStringSuccess: css`
      background-color: ${token.Colors.Brand.Success.colorSuccessBg} !important;
      input {
         background-color: ${token.Colors.Brand.Success.colorSuccessBg} !important;
      }
    `,
    testStringError: css`
      background-color: ${token.Colors.Brand.Error.colorErrorBg} !important;
      input {
         background-color: ${token.Colors.Brand.Error.colorErrorBg} !important;
      }
    `
  }
})
