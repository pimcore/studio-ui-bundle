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
    editContainer: css`
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      & > .ant-space,
      & > .ant-space > .ant-space-item {
        display: flex;
        width: 100%;
        height: 100%;

        .ant-tabs {
          width: 100%;
        }
      }
    `
  }
}, { hashPriority: 'high' })
