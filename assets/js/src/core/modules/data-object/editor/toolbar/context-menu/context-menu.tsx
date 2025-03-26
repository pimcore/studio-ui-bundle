/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import ButtonGroup from 'antd/es/button/button-group'
import React, { useContext } from 'react'
import {
  ReloadButton
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/components/reload-button/reload-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { useTranslation } from 'react-i18next'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'

export const EditorToolbarContextMenu = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const { unpublishContextMenuItem } = useUnpublish('data-object')

  const items: DropdownMenuProps['items'] = [
    unpublishContextMenuItem(dataObject as DataObject)
  ]

  const visibleItems = items.filter(item => (item !== null && 'hidden' in item) ? item?.hidden === false : false)

  return (
    <ButtonGroup>
      <ReloadButton />

      {visibleItems.length > 0 && (
        <Dropdown menu={ { items } }>
          <DropdownButton key={ 'dropdown-button' }>
            {t('toolbar.more')}
          </DropdownButton>
        </Dropdown>
      )}
    </ButtonGroup>
  )
}
