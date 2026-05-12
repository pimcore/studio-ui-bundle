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

export const useStyle = createStyles(({ css }) => {
  return {
    translationsContainer: css`
      .ant-form-inline {
        flex-wrap: nowrap;
      }

      .translations-key-input {
        width: 200px;
      }

      .translations-domain-select {
        min-width: 240px;
      }

      .translations-locale-select {
        min-width: 240px;

        .ant-select-selection-placeholder {
          color: inherit;
        }
      }

      .translations-search-input {
        min-width: 300px;
      }
    `
  }
})
