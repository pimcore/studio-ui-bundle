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
    Widget: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .widget__content {
        flex: 1;
        overflow: auto;
        contain: layout size;
        position: relative;
      }

      .widget__title {
        padding-top: ${token.paddingSM}px;
      }
    `
  }
}, { hashPriority: 'low' })
