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
  const notesAndEventsToken = {
    notesContainerWidth: '710',
    notesModalFieldsWidth: '637',
    ...token
  }

  return {
    'notes-and-events': css`

      span, div, div.anticon, button {
        vertical-align: middle;
      }

      .panel-title {
        font-size: 12px;
        font-weight: 600;
      }

      .panel-title__user, .panel-title__divider {
        vertical-align: unset;
        font-weight: 400;
        line-height: 20px;
        color: ${token.colorTextSecondary}
      }

      .panel-extra__trash-icon {
        color: ${token.colorPrimary};
      }

      .panel-body__description {
        display: block;
        margin: 0;
      }

      .panel-body__description-padding {
        padding-bottom: ${token.paddingSM}px;
      }

      .panel-body__details {
        display: block;
        padding-bottom: ${token.paddingXS}px;
      }

      .ant-table-wrapper p {
        margin: 0;
      }

      .ant-table-wrapper .ant-table-cell {
        white-space: unset;
        overflow-wrap: anywhere;
      }
      
      .notes-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: ${notesAndEventsToken.notesContainerWidth}px;
      }
      
      & .notes-content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 100%;
      }
      
      & .notes-content__details {
        padding: 0 ${token.paddingXS}px;
      } 
        
      & .notes-content__empty-container {
        align-content: center;
        height: 100%;
        }
      
      & .notes-card {
        margin-bottom: ${token.marginXS}px;
      }

      & .notes-content > .notes-content__text {
        color: ${token.colorText};
      }
      
    `

  }
}, { hashPriority: 'low' })
