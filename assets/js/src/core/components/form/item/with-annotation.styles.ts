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
  // the label chrome is the host's; the tag only claims the space right after it, sized to
  // sit on the label's own baseline whether the host lays the label out inline or as flex
  tag: css`
    display: inline-flex;
    align-items: center;
    height: ${token.controlHeightXS}px;
    margin-inline: ${token.marginXXS}px 0;
    padding-inline: ${token.paddingXXS}px;
    border-radius: ${token.borderRadiusSM}px;
    font-size: ${token.fontSizeSM}px;
    line-height: 1;
  `,
  // a tag with no label sits in the extra slot, which AntD stacks under the control. A compact
  // control leaves room on its own row, so turn that column into a row and keep it there.
  tagOnControlRow: css`
    .ant-form-item-control:has(.ant-switch, .ant-checkbox, .ant-radio) {
      flex-direction: row;
      align-items: center;
      gap: ${token.marginXXS}px;

      > .ant-form-item-control-input,
      > .ant-form-item-additional {
        flex: 0 0 auto;
      }

      .ant-form-item-extra {
        min-height: 0;
      }
    }
  `
}))
