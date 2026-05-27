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
    body: css`
      max-height: 70vh;
      overflow-y: auto;
      position: relative;
    `,

    headerContainer: css`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999999999;

      &::before {
        content: '';
        position: absolute;
        top: -15px;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: #fff;
        z-index: -1;
      }
    `,

    headerRow: css`
      width: 100%;
    `,

    headerItem: css`
      flex: 1 1 0;
      min-width: 320px;
      padding: ${token.paddingXS}px;
      background-color: ${token.Table.headerBg};
      border: 0.5px solid ${token.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);
    `,

    content: css`
      position: relative;
      min-width: 220px;
    `,

    comparisonSections: css`
      width: 100%;
    `,

    sectionBlock: css`
      width: 100%;
    `,

    sectionHeaderRow: css`
      width: 100%;
    `,

    sectionHeaderCell: css`
      flex: 1 1 0;
      min-width: 320px;
    `,

    sectionFields: css`
      width: 100%;
    `,

    fieldRow: css`
      width: 100%;
    `,

    fieldCell: css`
      flex: 1 1 0;
      min-width: 320px;
    `,

    sectionTitle: css`
      position: relative;
      display: block;
      padding: ${token.paddingSM}px ${token.paddingXS}px ${token.paddingXS}px ${token.paddingXS}px;
      font-size: 14px;
      font-weight: 900;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 2px;
        width: 2px;
        height: 22px;
        background-color: ${token.Colors.Neutral.Fill.colorFill};
      }
    `,

    sectionTitleHidden: css`
      visibility: hidden;
    `,

    subSectionText: css`
      font-weight: 400;
    `,

    emptyState: css`
      margin-top: 40px;
      max-width: 320px;
      text-align: center;
    `
  }
})
