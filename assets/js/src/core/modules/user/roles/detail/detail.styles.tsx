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
    detailTabs: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: ${token.paddingSM}px ${token.paddingSM}px;
      
      .detail-tabs__content {
        height: 100%;
        width: 100%;
        overflow: hidden;
        
        .ant-tabs {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .ant-tabs-content {
          display: flex;
          height: 100%;
          margin-left: -${token.paddingXS}px;
          margin-right: -${token.paddingXS}px;
          padding-left: ${token.paddingXS}px;
          padding-right: ${token.paddingXS}px;
        }

        .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .ant-tabs-content-holder {
          overflow: auto;
        }
      }
    `
  }
}, { hashPriority: 'low' })
