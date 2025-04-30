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
