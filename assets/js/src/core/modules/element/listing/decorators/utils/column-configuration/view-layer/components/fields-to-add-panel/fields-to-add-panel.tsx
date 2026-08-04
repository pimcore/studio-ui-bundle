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
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { Header } from '@Pimcore/components/header/header'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ColumnPicker } from '@Pimcore/components/column-picker/column-picker'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '../../../context-layer/provider/available-columns/available-columns-provider'
import { useStyles } from './fields-to-add-panel.styles'

export interface FieldsToAddPanelProps {
  /** Grouped, selectable columns offered for adding. */
  groups: Array<ColumnPickerGroup<AvailableColumn>>
  /** Invoked when a column is chosen from the picker. */
  onColumnSelect: (column: AvailableColumn) => void
  /** Invoked when the panel's collapse control is clicked. */
  onClose: () => void
  /** Stretch the picker to fill the available height (use when the host has a fixed height). */
  fillHeight?: boolean
  'data-testid'?: string
}

/**
 * Embeddable "Fields to add" sidebar panel: a header (with a collapse control)
 * over the searchable {@link ColumnPicker} tree. Shared by the expanded grid
 * config modal and the batch edit modal so they offer columns the same way.
 */
export const FieldsToAddPanel = ({
  groups,
  onColumnSelect,
  onClose,
  fillHeight = false,
  'data-testid': dataTestId
}: FieldsToAddPanelProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  return (
    <div
      className={ cn(styles.panel, { [styles.panelFill]: fillHeight }) }
      data-testid={ dataTestId }
    >
      <Header
        className={ styles.panelHeader }
        fullWidth
        title={ t('listing.column-picker.fields-to-add') }
      >
        <Flex
          className="w-full"
          justify="flex-end"
        >
          <IconButton
            data-testid={ dataTestId !== undefined ? `${dataTestId}-close` : undefined }
            icon={ { value: 'collapse-sidebar', colorToken: 'colorPrimary' } }
            onClick={ onClose }
            tooltip={ { title: t('listing.fields-to-add.collapse-simple-fields') } }
            type='text'
          />
        </Flex>
      </Header>

      <ColumnPicker<AvailableColumn>
        data-testid={ dataTestId !== undefined ? `${dataTestId}-picker` : undefined }
        fillHeight={ fillHeight }
        groups={ groups }
        onSelect={ (item) => { onColumnSelect(item.meta!) } }
      />
    </div>
  )
}
