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
    segmented: css`
            .ant-segmented-group {
                padding: 2px;
                border-radius: ${token.borderRadius}px;
                border: 1px solid ${token.colorBorderSecondary};
                background: ${token.colorBgLayout};
                box-shadow: ${token.boxShadow};

                .ant-segmented-item {
                    color: ${token.itemColor};

                    &.ant-segmented-item-selected {
                        background: ${token.controlItemBgActive};
                        border-color: ${token.controlItemBgActive};
                        color: ${token.itemSelectedColor};
                    }
                }
            }
        `
  }
})
