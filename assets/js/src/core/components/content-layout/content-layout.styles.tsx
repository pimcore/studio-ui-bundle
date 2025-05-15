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
    ContentLayout: css`
      &.content-toolbar-sidebar-layout {
        position: relative;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .content-toolbar-sidebar-layout__top-bar {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        position: sticky;
        bottom: 0;
        height: max-content; 
        overflow: hidden;
      }

      .content-toolbar-sidebar-layout__content {
        display: flex;
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        overflow: auto;
        height: 100%;
        width: 100%;
      }

      .content-toolbar-sidebar-layout__toolbar {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        position: sticky;
        bottom: 0;
        height: max-content; 
        overflow: hidden;
      }

      .content-toolbar-sidebar-layout__sidebar {
        grid-column: 2 / 3;
        grid-row: 1 / 4;
      }
    `
  }
}, { hashPriority: 'low' })
