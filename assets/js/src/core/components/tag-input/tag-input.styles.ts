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

export const useStyles = createStyles(({ css }) => {
  return {
    tagInput: css`
      width: 100%;

      .ant-select-selector {
        cursor: text !important;
      }

      .ant-select-selection-search {
        cursor: text !important;
        flex: 1;
        min-width: 150px;
      }

      .ant-select-selection-search-input {
        width: 100% !important;
      }
    `
  }
})
