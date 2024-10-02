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
  const themeToken = {
    highlightBackgroundColor: '#F6FFED',
    highlightBorderColor: '#B7EB8F',
    highlightColor: '#52C41A',
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

      .ant-card-extra {
        height: 44px;
      }

      .sub-title {
        font-weight: normal;
        margin-right: 4px;
        color: ${themeToken.colorTextDescription};
      }

      .title-tag {
        font-size: 12px;
      }

      .tag-icon {
        position: relative;
        right: 3px;
        bottom: 1px;
      }

      .id-tag {
        width: 56px;
        height: 22px;

        display: inline-grid;
        justify-content: center;

        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
      }
    `
  }
}, { hashPriority: 'low' })
