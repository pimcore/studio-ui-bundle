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

export const useStyle = createStyles(({ css, token }) => {
  return {
    'element-cell': css`
      padding: 3px;
    `,
    link: css`
      display: flex;
      gap: 8px;
      width: 100%;
      
      .ant-tag {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        cursor: pointer;
      }
    `,
    dropTargetIcon: css`
      margin-left: auto;
      margin-top: 4px
    `
  }
})
