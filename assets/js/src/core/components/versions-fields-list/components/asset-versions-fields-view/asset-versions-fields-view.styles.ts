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
    categoryTitle: css`
      display: block;
      padding: ${token.paddingXS}px;
      font-size: 14px;
      font-weight: 900;
    `,

    categoryFields: css`
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorderContainer};
      border-radius: ${token.borderRadius}px;
    `,

    fieldTitle: css`
      display: block;
      margin-bottom: 4px;
    `,

    categoryFieldItem: css`
      flex: 1 1 50%;
      padding: ${token.paddingXS}px;
      background-color: ${token.colorBgContainerDisabled};
      border-radius: ${token.borderRadius}px;

      &:only-child {
        flex: 1 1 100%;
      }
    `
  }
})
