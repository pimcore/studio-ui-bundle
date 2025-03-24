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
        .ant-select-disabled,
        .ant-input-disabled {
          width: 100%;
          max-width: 100% !important;
        }

        .ant-select-disabled .ant-select-selection-item,
        .ant-input-disabled {
          color: ${token.colorText} !important;
        }

        .ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }

        .ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: ${token.colorBorder} !important;
        }
      }
    `,

    select: css`
       min-width: 100px;
    `,

    input: css`
      min-width: 80px;
    `
  }
})
