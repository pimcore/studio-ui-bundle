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
    imageContainer: css`
      display: grid;
      height: 100%; 
      width: 100%;
      overflow-x: auto;
      overflow-y: auto;
    `,

    floatingContainer: css`
      position: fixed;
      bottom: 60px;
      right: 60px;
    `,

    flexContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      pointer-events: auto;
    `
  }
}, { hashPriority: 'low' })
