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
  iconViewer: {
    boxSizing: 'border-box',
    margin: 0,
    padding: '5px 11px',
    color: 'rgba(0, 0, 0, 0.88)',
    fontSize: '12px',
    lineHeight: '1.6666666666666667',
    listStyle: 'none',
    width: '50px',
    minWidth: '50px',
    borderRadius: '6px',
    transition: 'all 0.2s',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d9d9d9'
  }
}))
