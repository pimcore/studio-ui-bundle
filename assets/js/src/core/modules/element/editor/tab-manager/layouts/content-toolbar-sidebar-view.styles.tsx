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
    ContentToolbarSidebarLayout: css`
      &.content-toolbar-sidebar-layout {
        position: relative;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: 1fr auto;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .content-toolbar-sidebar-layout__content {
        display: flex;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        overflow: auto;
        height: 100%;
        width: 100%;
      }

      .content-toolbar-sidebar-layout__toolbar {
        border-top: 1px solid ${token.colorBorderTertiary};
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        position: sticky;
        bottom: 0;
        height: ${token.sizeXXL}px; 
      }

      .content-toolbar-sidebar-layout__sidebar {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
      }
    `
  }
}, { hashPriority: 'low' })
