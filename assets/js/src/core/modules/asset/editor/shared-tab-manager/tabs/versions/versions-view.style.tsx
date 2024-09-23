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
  const versionToken = { versionsLeftSideWidth: '395', ...token }

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
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        overflow: hidden;

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
      
      .btn-publish {
        margin-right: ${themeToken.marginXXS}px;
      }

      .row-margin {
        margin-top: ${themeToken.marginXS}px;
      }

      .date-container {
        margin-top: 3px;
      }

      .scheduled-date {
        margin-left: ${themeToken.marginXXS}px;
        color: ${themeToken.colorTextDescription};
      }

      & input.ant-input {
        margin-top: 5px;
      }

      & .ant-checkbox-wrapper {
        margin-right: 6px;
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

      .flexbox-start-end {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
      
      & .left-side {
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;

            height: 100%;
            width: ${versionToken.versionsLeftSideWidth}px;
        }

      .flexbox-start-end {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

        & .ant-btn-icon {
            vertical-align: text-bottom;
        }

        & .compare-button {
            background-color: ${versionToken.colorFillAlter};
        }
    `,
    noContent: css`
        height: 100%;
        display: flex;
        flex-direction: column;
      
          &:hover {
              color: ${token.colorPrimaryHover};
          }
      }
        
        .empty-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `
  }
}, { hashPriority: 'low' })
