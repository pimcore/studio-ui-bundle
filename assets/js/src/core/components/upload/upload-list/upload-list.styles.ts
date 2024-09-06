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
      .ant-upload-list {
        .ant-upload-list-item-container {
          padding-bottom: 4px;
          
          .file-upload-list__file-details {
            display: flex;
            gap: 8px;

            > .file-upload-list__file__filename {
              margin: 0
            }
          }
            
          //.file-upload-list__file__progress {
          //    .ant-progress-bg {
          //        height: 4px !important;
          //    }
          //}
        }
      }
    `
  }
})
