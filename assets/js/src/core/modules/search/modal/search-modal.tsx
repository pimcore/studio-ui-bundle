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
import { DocumentTab } from './tabs/document/document-tab'
import { SavedSearchesTab } from '../saved-search/components/saved-searches-tab/saved-searches-tab'
import { useTranslation } from 'react-i18next'

export const SearchModal = (): React.JSX.Element => {
  const { isOpen, setActiveKey, close, activeKey } = useSearch()
  const { t } = useTranslation()

  const tabItems: ITabsProps['items'] = [
    {
      label: 'All',
      key: 'all',
      children: <GeneralTab />
    },
    {
      label: 'Documents',
      key: elementTypes.document,
      children: <DocumentTab />
    },
    {
      label: 'Assets',
      key: elementTypes.asset,
      children: <AssetTab />
    },
    {
      label: 'Data Objects',
      key: elementTypes.dataObject,
      children: <ObjectTab />
    },
    {
      label: t('saved-search.saved-searches'),
      key: 'saved-searches',
      children: <SavedSearchesTab />
    }
  ]

  return (
    <>
      {isOpen && (
        <Modal
          closable
          data-testid="search-modal"
          footer={ null }
          onCancel={ () => { close() } }
          open={ isOpen }
          size={ 'XL' }
        >
          <div style={ { display: 'flex', flexDirection: 'column', height: 500 } }>
            <Tabs
              activeKey={ activeKey }
              data-testid="search-modal-tabs"
              fullHeight
              items={ tabItems }
              noTabBarMargin
              onChange={ (key) => {
                setActiveKey(key)
              } }
              style={ { flex: 1, minHeight: 0 } }
            />
          </div>
        </Modal>
      )}
    </>
  )
}
