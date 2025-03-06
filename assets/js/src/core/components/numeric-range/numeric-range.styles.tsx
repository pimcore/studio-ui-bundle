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

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      &.versionFieldItem {
        .ant-input-number-disabled {
          width: 100%;
          max-width: 100% !important;
          color: ${token.colorText} !important;
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-input-number-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
          border-color: ${token.colorBorder} !important;
        }
      }
    `
  }
})
