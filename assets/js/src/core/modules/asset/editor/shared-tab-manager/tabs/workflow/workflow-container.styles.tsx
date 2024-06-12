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

export const useStyle = createStyles(({ token, css }) => {
  return {
    tab: css`
      display: flex;
      flex-direction: column;
        
      .pimcore-workflow-toolbar {
        padding: ${token.paddingSM}px ${token.paddingXS}px ${token.paddingXS}px ${token.paddingSM}px;
        
        .pimcore-workflow-toolbar__headline {
          font-weight: 600;
          color: ${token.colorPrimary};
          margin: 0;
          
          &:hover {
              color: ${token.colorPrimaryHover};
          }
        }
      }
        
      .pimcore-workflow-workflows {
          padding: 0 ${token.paddingXS}px;
          display: flex;
          gap: 10px;
          flex-direction: column;
      }
    `
  }
})
