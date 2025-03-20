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
  return {
    uploadList: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
        
      .ant-upload-list-item {
          display: flex;
          align-items: center;
          gap: ${token.paddingXS}px;
          
          &.ant-upload-list-item-error {
              color: ${token.colorError};
          }
          
          .ant-upload-icon {
              display: flex;
          }
      }

        .success_items {
            display: flex;
            align-items: center;
            gap: ${token.paddingXS}px;
            
            p {
                margin: 0;
            }
            
            .pimcore-icon{
                &.pimcore-icon-checkmark {
                    color: ${token.colorSuccess};
                }
            }   
        }
    `
  }
})
