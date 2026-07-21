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
    /**
     * The channel columns are data-driven, so the grid template is built at render time from
     * however many the API reports rather than being fixed here.
     */
    table: css`
        width: 100%;
        /*
         * Capped so the toggles sit next to the type they belong to instead of drifting to
         * the far edge of a wide editor. Comfortably holds the type column plus several
         * channel columns; on a narrow editor width: 100% still wins and it shrinks.
         */
        max-width: 900px;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
        overflow: hidden;
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
    head: css`
        background: ${token.colorFillQuaternary};
    `,
    groupRow: css`
        padding: ${token.paddingXS}px ${token.padding}px;
        background: ${token.colorFillQuaternary};
        border-bottom: 1px solid ${token.colorBorderSecondary};
        text-transform: uppercase;
        letter-spacing: 0.06em;
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
