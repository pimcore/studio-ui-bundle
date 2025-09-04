/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { Modal, IconButton, SearchInput, Pagination, Tabs, ModalFooter, Space, Split } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './icon-selector.styles'
import { isUndefined } from 'lodash'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DynamicTypeIconSetRegistry } from './dynamic-types/registry/dynamic-type-icon-set-registry'

export interface IconSelectorProps {
  open: boolean
  onCancel: () => void
  onSelect: (icon: ElementIcon | undefined) => void
  selectedIcon?: ElementIcon
}

export const IconSelector = ({
  open,
  onCancel,
  onSelect,
  selectedIcon
}: IconSelectorProps): React.JSX.Element => {
  const iconSetRegistry = useInjection<DynamicTypeIconSetRegistry>(serviceIds['DynamicTypes/IconSetRegistry'])

  const { styles } = useStyles()

  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(40)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [previewSelectedIcon, setPreviewSelectedIcon] = useState<ElementIcon | undefined>(selectedIcon)

  const resetSelector = (): void => {
    setSearchValue('')
    setCurrentPage(1)
    setPageSize(40)
    setActiveTab('all')
    setPreviewSelectedIcon(selectedIcon)
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
    }))
  ]

  const filteredIcons = useMemo(() => {
    let iconsToFilter: ElementIcon[] = []

    if (activeTab === 'all') {
      iconSetRegistry.getDynamicTypes().forEach(iconSet => {
        iconsToFilter.push(...iconSet.getIcons())
      })
    } else {
      const iconSet = iconSetRegistry.getDynamicTypes().find(set => set.id === activeTab)
      if (!isUndefined(iconSet)) {
        iconsToFilter = iconSet.getIcons()
      }
    }

    const filtered = iconsToFilter
      .filter(icon => icon.value.toLowerCase().includes(searchValue.toLowerCase()))

    return filtered
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
    if (!isUndefined(previewSelectedIcon)) {
      onSelect(previewSelectedIcon)
    }
    resetSelector()
    onCancel()
  }

  const handleCancel = (): void => {
    resetSelector()
    onCancel()
  }

  const handleClearSelection = (): void => {
    setPreviewSelectedIcon(undefined)
  }

  const handleSearch = (value: string): void => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handleRefresh = (): void => {
    setSearchValue('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number, newPageSize?: number): void => {
    setCurrentPage(page)
    if (!isUndefined(newPageSize)) {
      setPageSize(newPageSize)
    }
  }

  return (
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

        <div className={ styles.iconGrid }>
          {paginatedIcons.map((icon) => (
            <Space
              className={ `${styles.iconCard} ${previewSelectedIcon?.value === icon.value && previewSelectedIcon?.type === icon.type ? styles.selectedCard : ''}` }
              key={ icon.value }
              onClick={ () => { handleIconClick(icon) } }
              size='mini'
            >
              <Icon
                options={ { height: 24, width: 24 } }
                type={ icon.type }
                value={ icon.value }
              />
              <span className={ styles.iconName }>
                {icon.type === 'path'
                  ? icon.value.split('/').pop()?.replace('.svg', '') ?? icon.value
                  : icon.value
                }
              </span>
            </Space>
          ))}
        </div>
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
              {!isUndefined(previewSelectedIcon)
                ? (
                  <Icon
                    options={ { height: 16, width: 16 } }
                    type={ previewSelectedIcon.type }
                    value={ previewSelectedIcon.value }
                  />
                  )
                : <div></div>}
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

          <Flex
            align="center"
            gap="small"
          >
            <Split>
              <Flex
                align="center"
              >
                <IconButton
                  icon={ { value: 'refresh' } }
                  onClick={ handleRefresh }
                  theme='secondary'
                  title={ t('refresh') }
                  variant='minimal'
                />
              </Flex>
              <Pagination
                current={ currentPage }
                defaultPageSize={ pageSize }
                onChange={ handlePageChange }
                pageSizeOptions={ [40, 80, 120] }
                showSizeChanger
                showTotal={ (total) => t('pagination.show-total', { total }) }
                total={ filteredIcons.length }
              />
            </Split>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}
