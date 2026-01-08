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
    container: css`
      &.versionFieldItem {
        .ant-input-disabled {
          color: ${token.colorText} !important;
          border: 1px solid transparent !important;
        }
      }
      
      &.versionFieldItemHighlight {
        .ant-input-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
          border-color: ${token.colorBorder} !important;
        }
      }
    `,

    droppableWrapper: css`
      display: flex;
      flex: 1;
      overflow: hidden;
 
      > * {
        width: 100%;
      }
      
      .ant-input-prefix {
        width: 100%;
      }

      .ant-input-group {
        display: flex;
        width: 100%;
      }

      .ant-input-group > .ant-input-affix-wrapper {
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
        width: auto;
      }

      .ant-input-group > .ant-input-group-addon {
        display: flex;
        flex: 0 0 auto;
        width: auto;
      }
    `
  }
})
