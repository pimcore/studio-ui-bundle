/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

export const addColumnConfig = (props: DefaultCellProps, config: object): DefaultCellProps => {
  return addColumnMeta(props, { config })
}

export const addColumnMeta = (props: DefaultCellProps, meta: object): DefaultCellProps => {
  return {
    ...props,
    column: {
      ...props.column,
      columnDef: {
        ...props.column.columnDef,
        meta: {
          ...props.column.columnDef.meta,
          ...meta
        }
      }
    }
  }


}
