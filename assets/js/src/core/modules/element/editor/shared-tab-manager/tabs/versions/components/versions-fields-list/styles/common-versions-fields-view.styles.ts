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
      min-width: 50%;
      width: 100%;
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
      min-width: 50%;
      max-width: 900px;
      width: 100%;
    `,

    objectSectionFieldItem: css`
      justify-content: flex-start;
      width: 100% !important;
      max-width: 100% !important;
      border-radius: ${token.borderRadius}px !important;
      border-color: transparent !important;
      color: ${token.colorText} !important;
    `,

    objectSectionFieldItemHighlight: css`
      &.versionFieldItem {
        border-color: ${token.colorBorder} !important;
      }
    `,

    objectSectionEmptyState: css`
      justify-content: center !important;
      width: 100%;
      min-width: 100px;
      height: 100%;
      border: 1px solid transparent !important;
    `,

    objectSectionEmptyStateDisabled: css`
      background-color: ${token.colorBgContainerDisabled} !important;
    `,

    objectSectionEmptyStateHighlight: css`
      background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      border-color: ${token.colorBorder} !important;
    `
  }
})
