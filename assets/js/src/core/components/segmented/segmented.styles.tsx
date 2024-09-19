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
                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02);

                .ant-segmented-item {
                    color: ${token.itemColor};

                    &.ant-segmented-item-selected {
                        background: ${token.controlItemBgActive};
                        border-color: ${token.controlItemBgActive};
                        color: rgba(0, 0, 0, 0.88); //TODO: replace with token
                    }
                }
            }
        `
  }
})
