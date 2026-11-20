/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import React, { useMemo } from 'react'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useTranslation } from 'react-i18next'
import { useKeyedListContext } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { sortByLabel } from './utils/sort-by-label'

export interface ObjectBrickAddButtonProps {
  allowedTypes: string[]
  objectBrick: any[]
}

export const ObjectBrickAddButton = (props: ObjectBrickAddButtonProps): React.JSX.Element => {
  const { allowedTypes, objectBrick } = props
  const { t, i18n } = useTranslation()
  const { operations } = useKeyedListContext()

  const dropdownItems: DropdownMenuProps['items'] = useMemo(() => {
    const getLabel = (type: string): string => {
      const title = objectBrick?.find(item => item.key === type)?.title
      return title === '' || title === undefined ? type : t(title as string)
    }

    return sortByLabel(allowedTypes.map((type) => ({ type, label: getLabel(type) })), i18n.language)
      .map(({ type, label }) => {
        return {
          key: type,
          label,
          onClick: (e: any) => {
            e.domEvent.stopPropagation()
            operations.add(type, {})
          }
        }
      })
  }, [allowedTypes, objectBrick, t, i18n.language])

  return (
    <Dropdown
      menu={ { items: dropdownItems } }
    >
      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ (e) => { e.stopPropagation() } }
      >{t('add')}</IconTextButton>
    </Dropdown>
  )
}
