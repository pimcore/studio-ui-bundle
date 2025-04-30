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
  const overlay = css`
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${token.colorBgContainerDisabled};
    backdrop-filter: grayscale(70%);
    pointer-events: none;
    opacity: 1;
  `

  return {
    inheritedFormItemContainer: css`
      .ant-form-item-control-input-content > * {
        filter: opacity(0.5);
      }
      .ant-form-item-control-input-content:after {
        ${overlay};
      }
    `,
    inheritedFormElement: css`
      .ant-form-item-control-input-content > * > * {
        opacity: 0.7;
      }
        
      .ant-form-item-control-input-content > *:after {
        ${overlay};
      }
    `,
    inheritedManual: css`
      .studio-inherited-overlay {
        position: relative;
      }
      .studio-inherited-overlay > * {
        filter: opacity(0.5);
      }
      .studio-inherited-overlay:after {
        ${overlay};
      }
    `,
    inheritedWrapper: css`
      & {
        position: relative;
      }
      & > * {
        filter: opacity(0.5);
      }
      &:after {
        ${overlay};
      }
    `,
    inheritedGridCell: css`
      padding-right: 20px;
      
      & > * {
        filter: opacity(0.5);
      }
      &:after {
        ${overlay};
        backdrop-filter: none;
      }
    `
  }
})
