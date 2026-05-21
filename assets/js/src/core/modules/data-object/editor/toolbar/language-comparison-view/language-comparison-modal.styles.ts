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
    headerGrid: css`
      display: grid;
      width: 100%;
    `,

    headerItem: css`
      flex: 1 1 50%;
      padding: ${token.paddingXS}px;
      background-color: ${token.Table.headerBg};
      border: 0.5px solid ${token.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);
      display: flex;
      align-items: center;

      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0;
      }

      &:only-child {
        flex: 1 1 100%;
        border-right: 0.5px;
        border-left: 0.5px;
      }
    `,

    content: css`
      position: relative;
      min-width: 220px;
    `,

    columns: css`
      width: 100%;
    `,

    columnWrapper: css`
      flex: 1 1 50%;
      min-width: 50%;
      max-width: 900px;
      width: 100%;
      padding: ${token.paddingXS}px;

      &:only-child {
        flex: 1 1 100%;
        max-width: 100%;
      }
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
    `,

    comparisonSections: css`
      width: 100%;
    `,

    sectionBlock: css`
      width: 100%;
    `,

    sectionHeaderRow: css`
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: ${token.paddingXS}px;
      width: 100%;
    `,

    sectionHeaderCell: css`
      min-width: 0;
    `,

    fieldRow: css`
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: ${token.paddingXS}px;
      width: 100%;
      align-items: stretch;
    `,

    fieldCell: css`
      min-width: 0;
    `
  }
})
