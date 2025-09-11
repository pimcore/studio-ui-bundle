/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState, useEffect } from 'react'
import { Modal, IconButton, SearchInput, Pagination, Tabs, ModalFooter, Space } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './icon-selector.styles'
import { isUndefined } from 'lodash'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DynamicTypeIconSetRegistry } from './dynamic-types/registry/dynamic-type-icon-set-registry'
import { CustomIconTab } from './components/custom-icon-tab/custom-icon-tab'
import { IconCard } from './components/icon-card'
import { IconPreview } from './components/icon-preview'

export interface IconSelectorProps {
  value?: ElementIcon
  onChange?: (icon: ElementIcon | undefined) => void
}

export const IconSelector = ({
  value,
  onChange
}: IconSelectorProps): React.JSX.Element => {
  const iconSetRegistry = useInjection<DynamicTypeIconSetRegistry>(serviceIds['DynamicTypes/IconSetRegistry'])

  const { styles } = useStyles()

  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(40)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [previewSelectedIcon, setPreviewSelectedIcon] = useState<ElementIcon | undefined>(value)

  useEffect(() => {
    setPreviewSelectedIcon(value)
  }, [value])

  const openModal = (): void => {
    setOpen(true)
  }

  const resetSelector = (): void => {
    setSearchValue('')
    setCurrentPage(1)
    setPageSize(40)
    setActiveTab('all')
    setPreviewSelectedIcon(value)
  }

  const closeModal = (): void => {
    setOpen(false)
    resetSelector()
  }

  const tabItems = [
    {
      key: 'all',
      label: t('icon-selector.all-icons'),
      children: null
    },
    ...iconSetRegistry.getDynamicTypes().map((iconSet) => ({
      key: iconSet.id,
      label: iconSet.name,
      children: null
    })),
    {
      key: 'custom',
      label: t('icon-selector.custom-icon'),
      children: null
    }
  ]

  const getAllIcons = (): ElementIcon[] => {
    const allIconSets = iconSetRegistry.getDynamicTypes()
    return allIconSets.flatMap(iconSet => iconSet.getIcons())
  }

  const getIconsForTab = (tabId: string): ElementIcon[] => {
    if (tabId === 'all') {
      return getAllIcons()
    }

    const iconSet = iconSetRegistry.getDynamicTypes().find(set => set.id === tabId)
    return !isUndefined(iconSet) ? iconSet.getIcons() : []
  }

  const filteredIcons = useMemo(() => {
    const iconsToFilter = getIconsForTab(activeTab)
    return iconsToFilter.filter(icon =>
      icon.value.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue, activeTab, iconSetRegistry])

  const paginatedIcons = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredIcons.slice(startIndex, endIndex)
  }, [filteredIcons, currentPage, pageSize])

  const handleIconClick = (icon: ElementIcon): void => {
    setPreviewSelectedIcon(icon)
  }

  const handleSave = (): void => {
    onChange?.(previewSelectedIcon)
    closeModal()
  }

  const handleCancel = (): void => {
    closeModal()
  }

  const handleClearSelection = (): void => {
    setPreviewSelectedIcon(undefined)
  }

  const handleCustomIconChange = (icon: ElementIcon | undefined): void => {
    setPreviewSelectedIcon(icon)
  }

  const handleSearch = (value: string): void => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number, newPageSize?: number): void => {
    setCurrentPage(page)
    if (!isUndefined(newPageSize)) {
      setPageSize(newPageSize)
    }
  }

  return (
    <>
      <Flex gap={ 'extra-small' }>

        <Flex
          align='center'
          className={ styles.selectionPreview }
          justify='center'
        >
          <IconPreview icon={ previewSelectedIcon } />
        </Flex>
        <IconButton
          icon={ { value: 'folder-search' } }
          onClick={ openModal }
          type='default'
        />
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ handleClearSelection }
          title={ t('icon-selector.clear-selection') }
          type='default'
        />
      </Flex>

      <Modal
        className={ styles.iconSelectorModal }
        footer={ <ModalFooter divider>
          <Button
            disabled={ isUndefined(previewSelectedIcon) }
            onClick={ handleSave }
            type="primary"
          >
            {t('icon-selector.save')}
          </Button>
        </ModalFooter>
        }
        onCancel={ handleCancel }
        open={ open }
        size="ML"
      >
        <Flex
          vertical
        >
          <Tabs
            activeKey={ activeTab }
            items={ tabItems }
            onChange={ setActiveTab }
          />

          <SearchInput
            maxWidth={ '1000px' }
            onChange={ (e) => { setSearchValue(e.target.value) } }
            onSearch={ handleSearch }
            placeholder={ t('icon-selector.search-placeholder') }
            value={ searchValue }
            withPrefix={ false }
            withoutAddon={ false }
          />

          {activeTab !== 'custom' && (
            <div className={ styles.iconGrid }>
              {paginatedIcons.map((icon) => (
                <IconCard
                  icon={ icon }
                  isSelected={ previewSelectedIcon?.value === icon.value && previewSelectedIcon?.type === icon.type }
                  key={ icon.value }
                  onClick={ () => { handleIconClick(icon) } }
                />
              ))}
            </div>
          )}

          {activeTab === 'custom' && (
            <CustomIconTab
              customIconPath={ previewSelectedIcon?.type === 'path' ? previewSelectedIcon.value : '' }
              onCustomIconPathChange={ handleCustomIconChange }
            />
          )}
          <Flex
            justify="space-between"
          >
            <Flex
              align="center"
              gap="small"
            >
              <span className={ styles.selectionLabel }>{t('icon-selector.current-selection')}</span>
              <Flex
                align='center'
                className={ styles.selectionPreview }
                justify='center'
              >
                <IconPreview icon={ previewSelectedIcon } />
              </Flex>
              {!isUndefined(previewSelectedIcon) && (
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ handleClearSelection }
                title={ t('icon-selector.clear-selection') }
                type='default'
              />
              )}
            </Flex>

            {activeTab !== 'custom' && (
              <Flex
                align="center"
                gap="small"
                justify="flex-end"
              >
                <Pagination
                  current={ currentPage }
                  defaultPageSize={ pageSize }
                  onChange={ handlePageChange }
                  pageSizeOptions={ [40, 80, 120] }
                  showSizeChanger
                  showTotal={ (total) => t('pagination.show-total', { total }) }
                  total={ filteredIcons.length }
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}
