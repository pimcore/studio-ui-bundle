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

export const useStyles = createStyles(({ token, css }) => {
  return {
    table: css`
        width: 100%;
        /* Capped so the toggles stay next to their type instead of drifting to the far edge. */
        max-width: 900px;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
        /* Scroll rather than clip: a data-driven set can report more channel columns than fit. */
        overflow-x: auto;
    `,
    row: css`
        display: grid;
        grid-template-columns: minmax(0, 1fr) repeat(auto-fit, minmax(110px, 130px));
        grid-auto-columns: minmax(110px, 130px);
        grid-auto-flow: column;
        align-items: center;
        gap: ${token.marginXS}px;
        padding: ${token.paddingSM}px ${token.padding}px;
        border-bottom: 1px solid ${token.colorBorderSecondary};

        &:last-child {
            border-bottom: none;
        }
    `,
    // Filled and bold; group headings stay flat so the two read as different kinds of row.
    head: css`
        background: ${token.colorFillSecondary};
        font-weight: ${token.fontWeightStrong};
    `,
    groupRow: css`
        padding: ${token.padding}px ${token.padding}px ${token.paddingXS}px;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: ${token.fontSizeSM}px;
    `,
    typeColumn: css`
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding-right: ${token.padding}px;
    `,
    typeDescription: css`
        /* A readable measure rather than one long line across the whole column. */
        max-width: 52ch;
    `,
    cellColumn: css`
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    // The tooltip needs a real element to hold its ref, and a plain inline span would drop the
    // icon onto the text baseline instead of centring it beside the channel label and its icon.
    channelWarning: css`
        display: inline-flex;
        align-items: center;
    `,
    toolbar: css`
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
        width: 100%;
    `,
    toolbarSpacer: css`
        flex: 1;
    `
  }
})
