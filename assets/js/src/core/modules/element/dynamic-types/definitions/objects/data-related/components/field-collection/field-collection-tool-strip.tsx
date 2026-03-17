/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import React from 'react'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Space } from '@Pimcore/components/space/space'
import { type FieldCollectionProps } from './field-collection'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { useFieldCollection } from './providers/use-field-collection'
import { useTranslation } from 'react-i18next'

export interface FieldCollectionToolStripProps {
  field: number
  allowedTypes: FieldCollectionProps['allowedTypes']
  disallowAdd: boolean
  disallowDelete: boolean
  disallowReorder: boolean
  layoutDefinition: FieldCollectionProps
}

export const FieldCollectionToolStrip = ({ field, allowedTypes, disallowAdd, disallowDelete, disallowReorder, layoutDefinition }: FieldCollectionToolStripProps): React.JSX.Element => {
  const { operations } = useNumberedList()
  const fieldCollection = useFieldCollection()
  const { t } = useTranslation()

  const type = operations.getValue([field, 'type'])

  const dropDownItems: DropdownMenuProps['items'] = allowedTypes.map((type, index) => {
    return {
      key: index,
      label: fieldCollection?.data?.items?.find(item => item.key === type)?.title === '' ? type : t(fieldCollection?.data?.items?.find(item => item.key === type)?.title as string),
      onClick: (e) => { e.domEvent.stopPropagation(); operations.add({ type }) }
    }
  })

  return (
    <ToolStrip title={ layoutDefinition.title === '' || layoutDefinition.title === undefined ? type : t(layoutDefinition.title as string) }>
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size="mini">
          <Dropdown
            disabled={ disallowAdd }
            menu={ { items: dropDownItems } }
          >
            <IconButton
              icon={ { value: 'new' } }
              size='small'
            />
          </Dropdown>

          <IconButton
            disabled={ disallowReorder }
            icon={ { value: 'chevron-down' } }
            onClick={ () => { operations.move(field, field + 1) } }
            size='small'
          />
          <IconButton
            disabled={ disallowReorder }
            icon={ { value: 'chevron-up' } }
            onClick={ () => { operations.move(field, field - 1) } }
            size='small'
          />
        </Space>

        <IconButton
          disabled={ disallowDelete }
          icon={ { value: 'trash' } }
          onClick={ () => { operations.remove(field) } }
          size='small'
        />
      </Split>
    </ToolStrip>
  )
}
