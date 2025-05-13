/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
