/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => ({
  body: css`
    display: flex;
    gap: ${token.marginSM}px;
    height: 100%;
  `,
  fieldsPanel: css`
    display: flex;
    flex-direction: column;
    gap: ${token.marginXS}px;
    width: 280px;
    height: 100%;
    padding-right: ${token.paddingSM}px;
    border-right: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
  `,
  list: css`
    flex: 1;
    min-width: 0;
    height: 100%;
    overflow-y: auto;

    // Long field keys (e.g. "attributes.Bodywork.numberOfDoors") would otherwise run under the
    // row's own locale/remove controls in a narrow pane.
    .ant-tag {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  `
}))
