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
  const themeToken = {
    highlightBackgroundColor: token.colorSuccessBg,
    highlightBorderColor: token.colorSuccessBorder,
    highlightColor: token.colorSuccessText,
    signalBackgroundColor: '#E6F4FF',
    signalBorderColor: '#91CAFF',
    signalColor: '#1677FF',
    ...token
  }

  return {
    versions: css`
      .title-tag__own-draft {
        color: ${themeToken.signalColor};
        border-color: ${themeToken.signalBorderColor};
        background-color: ${themeToken.signalBackgroundColor};
      }

      .title-tag__published {
        color: ${themeToken.highlightColor};
        border-color: ${themeToken.highlightBorderColor};
        background-color: ${themeToken.highlightBackgroundColor};
      }

      .sub-title {
        font-weight: normal;
        margin-right: 4px;
        color: ${themeToken.colorTextDescription};
      }

      .ant-tag {
        display: flex;
        align-items: center;
      }

      .ant-tag-geekblue {
        background-color: ${token.Colors.Base.Geekblue['2']} !important;
        color: ${token.Colors.Base.Geekblue['6']} !important;
        border-color: ${token.Colors.Base.Geekblue['3']} !important;
      }
    `,

    compareButton: css`
      background-color: ${token.Colors.Neutral.Fill.colorFill} !important;
    `,

    notificationMessage: css`
      text-align: center;
      max-width: 200px;
    `
  }
}, { hashPriority: 'low' })
