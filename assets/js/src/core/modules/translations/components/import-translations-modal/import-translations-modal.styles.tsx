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
    uploadedFile: css`
      .file-name {
        font-weight: ${token.fontWeightStrong};
      }

      .file-size {
        color: ${token.colorTextSecondary};
        font-size: ${token.fontSizeSM}px;
      }

      .icon-button--theme-primary {
        margin-top: 3px;
      }
    `,

    draggerContent: css`
      padding: ${token.paddingLG}px;
    `,

    fileError: css`
      color: ${token.colorError};
      margin-top: ${token.marginXS}px;
      font-size: ${token.fontSizeSM}px;
    `,

    spinnerContainer: css`
      padding: ${token.paddingLG}px;
    `
  }
})
