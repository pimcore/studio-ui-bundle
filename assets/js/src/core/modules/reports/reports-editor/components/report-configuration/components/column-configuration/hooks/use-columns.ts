/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'

export const useColumns = (): Array<AccessorKeyColumnDef<unknown, never>> => {
  const columnHelper = createColumnHelper()

  return [
    columnHelper.accessor('name', {
      header: 'Name',
      meta: { type: 'text-cell' }
    }),
    columnHelper.accessor('display', {
      header: 'Display',
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor('export', {
      header: 'Export',
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor('order', {
      header: 'Order',
      meta: { type: 'checkbox', editable: true }
    }),
    columnHelper.accessor('filterType', {
      header: 'Filter Type',
      meta: {
        type: 'select',
        editable: true,
        config: {
          options: [
            { label: 'Empty', value: '' },
            { label: 'Text', value: 'string' },
            { label: 'Number', value: 'numeric' },
            { label: 'Date', value: 'date' },
            { label: 'Bool', value: 'boolean' }
          ]
        }
      }
    }),
    columnHelper.accessor('displayType', {
      header: 'Display Type',
      meta: {
        type: 'select',
        editable: true,
        config: {
          options: [
            { label: 'None', value: '' },
            { label: 'Text', value: 'text' },
            { label: 'Date', value: 'date' },
            { label: 'Hide', value: 'hide' }
          ]
        }
      }
    })
  ]
}
