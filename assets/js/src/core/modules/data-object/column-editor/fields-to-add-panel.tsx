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
import { ColumnPicker } from '@Pimcore/components/column-picker/column-picker'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { Flex } from '@Pimcore/components/flex/flex'
import { Header } from '@Pimcore/components/header/header'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useStyles } from './base-column-editor.styles'

export interface FieldsToAddPanelProps {
  groups: Array<ColumnPickerGroup<GridColumnConfiguration>>
  onColumnSelect: (column: GridColumnConfiguration) => void
  onClose: () => void
}

/**
 * Embedded "Fields to add" panel shown inside the column editor: the
 * searchable ColumnPicker tree with a collapsible header.
 */
export const FieldsToAddPanel = ({ groups, onColumnSelect, onClose }: FieldsToAddPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <div className={ styles.fieldsPanel }>
      <Header
        fullWidth
        title={ t('column-editor.fields-to-add') }
      >
        <Flex
          className='w-full'
          justify='flex-end'
        >
          <IconButton
            aria-label={ t('close') }
            icon={ { value: 'collapse-sidebar', colorToken: 'colorPrimary' } }
            onClick={ onClose }
          />
        </Flex>
      </Header>

      <ColumnPicker
        fillHeight
        groups={ groups }
        onSelect={ (item: { meta?: GridColumnConfiguration }) => {
          if (item.meta !== undefined) {
            onColumnSelect(item.meta)
          }
        } }
      />
    </div>
  )
}
