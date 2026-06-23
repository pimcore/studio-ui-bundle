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
import { useTranslation } from 'react-i18next'
import { type PopoverProps } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '../../../context-layer/provider/available-columns/available-columns-provider'

export interface AddColumnControlsProps {
  /** Grouped, selectable columns for the "Simple" picker. */
  groups: Array<ColumnPickerGroup<AvailableColumn>>
  /** Invoked when a column is chosen from the picker. */
  onColumnSelect: (column: AvailableColumn) => void
  /** Invoked when the "Advanced" button is clicked. Omit to hide the button. */
  onAddAdvancedColumn?: () => void
  /** Placement of the picker panel relative to its trigger. Defaults to `leftTop`. */
  placement?: PopoverProps['placement']
  /**
   * When provided, "Simple" becomes a toggle button that calls this handler
   * (e.g. to show/hide an embedded picker panel) instead of opening the popover.
   */
  onToggleSimple?: () => void
}

/**
 * Renders the "Simple" and "Advanced" actions used to add columns to a grid
 * configuration. By default "Simple" opens the column picker in a popover; pass
 * {@link AddColumnControlsProps.onToggleSimple} to instead toggle an embedded
 * panel (used by the expanded grid-config modal). Shared across asset and data
 * object listings and reusable by any future grid that exposes available columns.
 */
export const AddColumnControls = ({
  groups,
  onColumnSelect,
  onAddAdvancedColumn,
  placement = 'leftTop',
  onToggleSimple
}: AddColumnControlsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const simpleButton = (
    <IconTextButton
      data-testid="listing-grid-config-add-simple-button"
      icon={ { value: 'new' } }
      onClick={ onToggleSimple }
      type="default"
    >
      { t('listing.add-column.simple') }
    </IconTextButton>
  )

  return (
    <Flex gap="mini">
      { onToggleSimple !== undefined
        ? simpleButton
        : (
          <ColumnPickerPopover<AvailableColumn>
            data-testid="listing-grid-config-add-simple"
            groups={ groups }
            onSelect={ (item) => { onColumnSelect(item.meta!) } }
            placement={ placement }
          >
            { simpleButton }
          </ColumnPickerPopover>
          ) }

      { onAddAdvancedColumn !== undefined && (
        <IconTextButton
          data-testid="listing-grid-config-add-advanced-button"
          icon={ { value: 'new' } }
          onClick={ onAddAdvancedColumn }
          type="default"
        >
          { t('listing.add-column.advanced') }
        </IconTextButton>
      ) }
    </Flex>
  )
}
