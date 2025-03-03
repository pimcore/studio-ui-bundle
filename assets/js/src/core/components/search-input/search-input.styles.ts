/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    search: css`
   
   max-width: 300px;
   
      .ant-input-prefix {
        margin-inline-end: ${token.marginXS}px;
      }
     

.ant-input-search-button:not(.ant-btn-primary) {
  border-color: ${token.Button.defaultGhostBorderColor}; 
}
      
      .ant-input-clear-icon {
        display: flex;
      }
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
