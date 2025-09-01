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

export const useStyles = createStyles(({ token }) => ({

  areablockToolstrip: {
    display: 'inline-block',
    width: 'fit-content',
    marginTop: token.marginXS,
    marginBottom: token.marginXS
  },

  areaEntry: {
    '&[data-hidden="true"] .pimcore_area_content': {
      filter: 'blur(1px)',
      opacity: 0.5
    }
  }
}))
