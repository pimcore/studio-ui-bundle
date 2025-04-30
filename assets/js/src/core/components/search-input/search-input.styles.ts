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
    search: css`
 
    .ant-input-prefix {
    margin-inline-end: ${token.marginXS}px;
    }
     
 &.ant-input-search
  > .ant-input-group 
  > .ant-input-group-addon:last-child 
  .ant-input-search-button:not(.ant-btn-primary):not(:hover):not(:active) {
      border-color: ${token.Button.defaultGhostBorderColor}; 
      color: ${token.colorPrimary};
      }
      
     .ant-input-clear-icon {
      display: flex;
      }
    `,

    fullWidth: css`
    max-width: 100%;
    `,

    searchWithoutAddon: css`
      .ant-input-group-addon {
        display: none;
      }
      
      .ant-input-affix-wrapper,
      .ant-input {
        border-radius: ${token.borderRadius}px !important;
      }
    `,
    searchIcon: css`
      color: ${token.colorTextPlaceholder};
    `,

    closeIcon: css`
      color: ${token.colorIcon};
    `
  }
})
