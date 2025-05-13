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

interface StylesProps {
  isLoaded: boolean
}

export const useStyle = createStyles(({ css }, props: StylesProps) => {
  return {
    imageIframeContainer: css`
      width: 100%;
      height: 100%;
    `,

    imageIframe: css`
      width: 100%;
      height: 100%;
      display: ${props.isLoaded ? 'block' : 'none'};
    `
  }
})
