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
    scheduledblockContainer: css`
      position: relative;
    `,

    controlsContainer: css`
      display: flex;
      align-items: center;
      gap: ${token.marginSM}px;
      margin-bottom: ${token.marginSM}px;
      padding: ${token.paddingXXS}px ${token.paddingSM}px ;
      background-color: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      min-height: 70px;
    `,

    datePickerContainer: css`
      min-width: 120px;
    `,

    buttonsContainer: css`
      display: flex;
      gap: ${token.marginXS}px;
    `
  }
})
