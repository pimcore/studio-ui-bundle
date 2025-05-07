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

export const useStyles = createStyles(({ css, token }) => {
  return {
    section: css`
      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `,

    sectionLabel: css`
      position: relative;
    `,

    subSectionLabel: css`
      color: ${token.colorTextSecondary};
      margin-left: 6px;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: -5px;
        width: 2px;
        height: 22px;
        background-color: ${token.Colors.Neutral.Fill.colorFill};
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 22px;
        background-color: ${token.Colors.Neutral.Fill.colorFill};
      }
    `,

    fieldTitle: css`
      display: block;
      margin-bottom: 4px;
    `
  }
})
