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

export const useStyles = createStyles(({ token, css }) => {
  const versionToken = {
    versionsLeftSideWidth: '383',
    ...token
  }

  return {
    'right-side': css`
      width: calc(100% - ${versionToken.versionsLeftSideWidth}px);
      padding: ${token.paddingSM}px;
      display: ruby;
      
      .image-slider {
        display: block;
        margin: 0 auto 20px auto;
        width: 470px;
        text-align: center;
        
        .image-slider__image {
          max-width: 360px; 
        }
      }

      .ant-table.ant-table-small {
        margin: auto;
      }
    `
  }
}, { hashPriority: 'low' })
