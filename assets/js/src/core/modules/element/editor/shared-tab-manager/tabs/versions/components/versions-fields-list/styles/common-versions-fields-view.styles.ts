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
    sectionTitle: css`
      position: relative;
      display: block;
      padding: ${token.paddingXS}px;
      font-size: 14px;
      font-weight: 900;
    `,

    subSectionTitle: css`
      margin-left: 5px;
        
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 2px;
          width: 2px;
          height: 22px;
          background-color: ${token.Colors.Neutral.Fill.colorFill};
        }
    `,

    subSectionText: css`
      font-weight: 400;
    `,

    sectionFields: css`
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorderContainer};
      border-radius: ${token.borderRadius}px;
    `,

    sectionFieldsWithoutBorder: css`
      border-width: 0;
    `,

    fieldTitle: css`
      display: block;
      margin-bottom: 4px;
    `,

    sectionFieldItem: css`
      flex: 1 1 50%;
      padding: ${token.paddingXS}px;
      background-color: ${token.colorBgContainerDisabled};
      border-radius: ${token.borderRadius}px;

      &:only-child {
        flex: 1 1 100%;
      }
    `,

    sectionFieldItemHighlight: css`
      background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
    `,

    objectSectionFieldItemWrapper: css`
      flex: 1 1 50%;
      max-width: 460px;
      width: 100%;
      
      .ant-input,
      .ant-input-number,
      .ant-picker,
      .ant-color-picker-trigger,
      .ant-checkbox-wrapper,
      .consent-wrapper {
        border-radius: ${token.borderRadius}px;
        border-color: transparent !important;
        color: ${token.colorText} !important;
      }
      
      .ant-input,
      .ant-select.ant-select-disabled,
      .ant-input-number,
      .ant-picker,
      .ant-color-picker-trigger,
      .ant-checkbox-wrapper,
      .consent-wrapper {
        width: 100%;
        max-width: 100% !important;
      }
      
      .ant-select.ant-select-disabled {
        .ant-select-selector {
          background: ${token.colorBgContainerDisabled} !important;
          border-color: transparent !important;
        }
        
        .ant-select-selection-item {
          color: ${token.colorText} !important;
        }
      }
      
      .ant-picker {
        input {
          color: ${token.colorText} !important;
        }
        .ant-picker-suffix {
          display: none;
        }
      }
      
      .ant-color-picker-trigger {
        justify-content: flex-start;

        .ant-color-picker-trigger-text {
          color: ${token.colorText} !important;
        }
      }
      
      .ant-checkbox-wrapper {
        padding: ${token.paddingXXS}px;
        background: ${token.colorBgContainerDisabled} !important;
      }
      
      .consent-wrapper {
        background: ${token.colorBgContainerDisabled} !important;
        
        .ant-checkbox-wrapper {
          width: initial !important;
          background: none !important;
        }
      }
    `,

    objectSectionFieldItemWrapperHighlight: css`
      .ant-input,
      .ant-input-number,
      .ant-picker,
      .ant-color-picker-trigger,
      .ant-checkbox-wrapper,
      .consent-wrapper {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        border-color: ${token.colorBorder} !important;
      }

      .ant-select.ant-select-disabled {
        .ant-select-selector {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
          border-color: ${token.colorBorder} !important;
        }
      }
    `
  }
})
