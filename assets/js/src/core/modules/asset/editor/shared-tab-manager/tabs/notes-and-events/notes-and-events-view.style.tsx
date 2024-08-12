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
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
      overflow: hidden;
 
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
      
      & .notes-content__header {
        padding: ${token.paddingXS}px ${notesAndEventsToken.paddingSM}px;
        display: flex;
        align-items: center;
        gap: ${notesAndEventsToken.paddingSM}px;
      }
      
      & .notes-content__text {
        color: ${token.colorPrimary};
        margin: 0;
        font-weight: 600;
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

      & .notes-content__header > button {
        display: flex;
        align-items: center;
        line-height: 24px;
      }
      
      .notes-container__pagination-container {
        border-top: 1px solid ${notesAndEventsToken.colorBorderTertiary};
        position: sticky;
        bottom: 0;
        height: ${notesAndEventsToken.sizeXXL}px;
      }

      .notes-container__pagination {
        display: flex;
        justify-content: space-between;
        background-color: ${notesAndEventsToken.colorWhite};
        padding-right: ${notesAndEventsToken.paddingSM}px;
        padding-left: ${notesAndEventsToken.paddingXS}px;
        align-items: center;
        width: 100%;
        height: ${notesAndEventsToken.sizeXXL}px;
      }
    `,

    'add-note-modal__section': css`
      width: ${notesAndEventsToken.notesModalFieldsWidth}px;
      margin-bottom: 10px;

      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        width: ${notesAndEventsToken.notesModalFieldsWidth}px;
      }
      
      .mandatory {
        color: #FF4D4F;
      }
    `
  }
}, { hashPriority: 'low' })
