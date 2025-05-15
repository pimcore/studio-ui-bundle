/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal } from '@Pimcore/components/modal/modal'
import { Tabs, type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React from 'react'
import { GeneralTab } from './tabs/general/general-tab'
import { useSearch } from '../provider/use-search'
import { AssetTab } from './tabs/asset/asset-tab'
import { ObjectTab } from './tabs/object/object-tab'

export const SearchModal = (): React.JSX.Element => {
  const { isOpen, close } = useSearch()

  const tabItems: ITabsProps['items'] = [
    {
      label: 'All',
      key: 'all',
      children: <GeneralTab />
    },
    /* {
      label: 'Documents',
      key: elementTypes.document,
      children: <>@todo</>
    }, */
    {
      label: 'Assets',
      key: elementTypes.asset,
      children: <AssetTab />
    },
    {
      label: 'Data Objects',
      key: elementTypes.dataObject,
      children: <ObjectTab />
    }
  ]

  return (
    <>
      {isOpen && (
        <Modal
          closable
          footer={ null }
          onCancel={ () => { close() } }
          open={ isOpen }
          size={ 'XL' }
        >
          <Tabs
            items={ tabItems }
            noTabBarMargin
          />
        </Modal>
      )}
    </>
  )
}
