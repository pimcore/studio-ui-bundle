/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { Table, type TableProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/table/table'
import { toCssDimension } from '@Pimcore/utils/css'

export interface TableEditableProps extends Omit<TableProps, 'disabled'> {
  inherited?: boolean
}

export const TableEditable = ({
  inherited = false,
  value,
  onChange,
  width,
  ...tableProps
}: TableEditableProps): React.JSX.Element => {
  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  return (
    <InheritanceOverlay
      display="block"
      isInherited={inherited}
      onOverwrite={handleOverwrite}
      hideButtons
      style={{ maxWidth: toCssDimension(width) }}
    >
      <Table
        disabled={inherited}
        width={width}
        value={value}
        onChange={onChange}
        {...tableProps}
      />
    </InheritanceOverlay>
  )
}
