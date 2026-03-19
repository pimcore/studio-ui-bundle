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

export const useStyles = createStyles(({ token, css }) => ({
  fileInput: css`
    display: none;
  `,

  dropZone: css`
    min-height: 120px;
    border: 1px dashed ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    cursor: pointer;
  `,

  selectedFileRow: css`
    padding: ${token.paddingXS}px;
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,

  fileName: css`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
}))
