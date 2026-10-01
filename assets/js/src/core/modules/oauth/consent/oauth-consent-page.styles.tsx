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

export const useStyle = createStyles(({ token, css }) => {
  return {
    page: css`
      display: flex;
      /* "safe" keeps the card's top reachable: when it is taller than the
         viewport the browser falls back to start alignment instead of pushing
         the heading above the scroll origin. */
      align-items: safe center;
      justify-content: safe center;
      position: absolute;
      inset: 0;
      overflow-y: auto;
      padding: 40px 16px;
      background: ${token.colorBgLayout};
    `,
    card: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 460px;
      border-radius: 8px;
      background: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorderSecondary};
      box-shadow: 0px 2px 0px 0px ${token.controlOutline};
      padding: 40px;
    `,
    // The permissions heading is a real h2 for assistive technology, styled to stay the
    // quiet section label it reads as. Same !important pattern as `title` below, because
    // the Title component scopes its own sizing as '.pimcore-title.ant-typography'.
    sectionTitle: css`
      margin: 0 !important;
      font-size: ${token.fontSize}px !important;
      line-height: ${token.lineHeight} !important;
    `,
    scopeList: css`
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: ${token.paddingSM}px ${token.padding}px;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
      }
    `,
    // Overrides the Title component's own 12px default, which is scoped as
    // '.pimcore-title.ant-typography' — same pattern as sidebar-title.styles.ts.
    title: css`
      margin: 0 !important;
      font-size: 20px !important;
      line-height: 28px !important;
    `,
    actions: css`
      button {
        flex: 1;
      }
    `
  }
})
