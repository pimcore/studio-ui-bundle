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
import { type Sizings } from '@Pimcore/utils/sizing'

interface StyleProps {
  marginBottom: Sizings
}

const getMarginBottomValue = (token: any, size: Sizings): number => {
  const mapping = {
    none: 0,
    mini: token.marginXXS,
    'extra-small': token.marginXS,
    small: token.marginSM,
    normal: token.margin,
    medium: token.marginMD,
    large: token.marginLG,
    'extra-large': token.marginXL,
    maxi: token.marginXXL
  }
  return mapping[size] ?? mapping.normal
}

export const useStyles = createStyles(({ token, css }, { marginBottom }: StyleProps) => {
  const marginBottomValue = getMarginBottomValue(token, marginBottom)

  return {
    container: css`
      padding: ${token.paddingXS}px;
      margin-bottom: ${marginBottomValue}px;
    `,

    containerWithBorder: css`
      padding: ${token.paddingXS}px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      margin-bottom: ${marginBottomValue}px;
    `,

    containerAsFormLabel: css`
      padding: ${token.paddingXS}px;
      margin-bottom: ${marginBottomValue}px;
    `,

    containerAsFormLabelWithBorder: css`
      padding: ${token.paddingXS}px;
      margin-bottom: ${marginBottomValue}px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        background: ${token.colorBorderSecondary};
        width: 100vw;
        margin-left: -50vw;
        left: 50%;
      }
    `,

    title: css`
      margin: 0 !important;
      line-height: 20px !important;
    `
  }
})
