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

export const useStyles = createStyles(({ css }) => {
  return {
    editorWrapper: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      min-height: 0;

      /* ReactCodeMirror renders className on the theme wrapper div */
      /* We need both the theme wrapper and .cm-editor to fill height */
      > div {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .cm-editor {
        flex: 1;
        height: 100%;
        min-height: 0;
      }
    `
  }
})
