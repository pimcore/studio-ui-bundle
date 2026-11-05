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

export const useStyles = createStyles(({ css, token }) => {
  return {
    codeBoxes: css`
      .ant-otp {
        display: flex;
        width: 100%;
      }

      .ant-otp .ant-otp-input {
        flex: 1;
        min-width: 0;
      }
    `,

    codeBoxesCentered: css`
      .ant-otp {
        display: flex;
        justify-content: center;
      }

      .ant-otp .ant-otp-input {
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
      }
    `
  }
})
