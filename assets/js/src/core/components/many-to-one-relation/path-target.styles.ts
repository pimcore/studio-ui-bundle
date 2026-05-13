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
import { type SerializedStyles } from '@emotion/react'

interface UseStylesProps {
  isDragActive: boolean
  isOver: boolean
  isValid: boolean
  hasSearch: boolean
}

export const useStyles = createStyles(({ token, css }, { isDragActive, isOver, isValid, hasSearch }: UseStylesProps) => {
  const getDragStyle = (): SerializedStyles => {
    const target = hasSearch ? '& .ant-input-affix-wrapper' : '&'

    if (isOver && !isValid) {
      return css`
        ${target} {
          background: ${token.colorErrorBg};
          border: 1px dashed ${token.colorErrorActive};
        }
      `
    }

    if (isOver && isValid) {
      return css`
        ${target} {
          background: ${token.colorBgTextActive};
          border: 1px dashed ${token.colorInfoBorderHover};
        }
      `
    }

    if (isDragActive) {
      return css`
        ${target} {
          background: ${token.colorBgContainerDisabled};
          border: 1px dashed ${token.colorBorder};
        }
      `
    }

    return css``
  }

  return {
    input: getDragStyle(),
    dropTargetIcon: css`
      color: ${token.colorIcon};
    `
  }
})
