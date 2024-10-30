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
    preview: css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      max-height: 100%;
      object-fit: contain;

      .ant-image {
        display: flex;
        max-height: 100%;
        max-width: 100%;
      }

      .ant-image-img {
        object-fit: contain;
      }
    `,
    floatingContainer: css`
      position: absolute;
      bottom: 20px;
      width: 100%;
      z-index: 9999;
    `,
    flexContainer: css`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-left: 15px;
      padding-right: 15px;
    `,
    imageContainer: css`
      max-height: 100%;
    `
  }
}, { hashPriority: 'low' })
