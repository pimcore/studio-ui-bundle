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
    WidgetTitle: css`
      display: flex;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      gap: 8px;
      align-items: center;
      color: ${token.Tree.colorPrimaryHeading};
      font-weight: 600;
    `
  }
}, { hashPriority: 'low' })
