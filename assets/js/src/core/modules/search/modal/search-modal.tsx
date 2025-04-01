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

import { Modal } from '@Pimcore/components/modal/modal'
import { Tabs, type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React from 'react'
import { GeneralTab } from './tabs/general/general-tab'
import { useSearch } from '../provider/use-search'
import { AssetTab } from './tabs/asset/asset-tab'

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
      children: <>@todo</>
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
