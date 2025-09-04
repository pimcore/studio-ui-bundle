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
import { DynamicTypeIconSetRegistry } from './dynamic-types/registry/dynamic-type-icon-set-registry'

export interface IconSelectorProps {
  open: boolean
  onCancel: () => void
  onSelect: (icon: ElementIcon) => void
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
  const [currentSelectedIcon, setCurrentSelectedIcon] = useState<ElementIcon | undefined>(selectedIcon)

  const tabItems = useMemo(() => {
    const items = [
      {
        key: 'all',
        label: t('icon-selector.all-icons'),
        children: null
      }
    ]

    iconSetRegistry.getDynamicTypes().forEach((iconSet) => {
      items.push({
        key: iconSet.id,
        label: iconSet.name,
        children: null
      })
    })

    return items
  }, [iconSetRegistry])

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

  const handleIconClick = (icon: ElementIcon) => {
    setCurrentSelectedIcon(icon)
  }

  const handleSave = () => {
    if (!isUndefined(currentSelectedIcon)) {
      onSelect(currentSelectedIcon)
    }
    onCancel()
  }

  const handleCancel = () => {    
    console.log("here");
    
    setCurrentSelectedIcon(undefined)
    setSearchValue('')
    setCurrentPage(1)
    setPageSize(40)
    setActiveTab('all')
    onCancel()
  }

  const handleClearSelection = () => {
    setCurrentSelectedIcon(undefined)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handleRefresh = () => {
    setSearchValue('')
    setCurrentPage(1)
    setCurrentSelectedIcon(selectedIcon)
  }

  const handlePageChange = (page: number, newPageSize?: number) => {
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
          disabled={ isUndefined(currentSelectedIcon) }
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
          onSearch={ handleSearch }
          placeholder={ t('icon-selector.search-placeholder') }
          withPrefix={ false }
          withoutAddon={ false }
        />

        <div className={ styles.iconGrid }>
          {paginatedIcons.map((icon) => (
            <Space
              className={ `${styles.iconCard} ${currentSelectedIcon?.value === icon.value ? styles.selectedCard : ''}` }
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
                  {!isUndefined(currentSelectedIcon) ? <Icon
                    options={ { height: 16, width: 16 } }
                    type={ currentSelectedIcon.type }
                    value={ currentSelectedIcon.value }
                  /> : <div></div>}
            </Flex>
            {!isUndefined(currentSelectedIcon) && <IconButton
              icon={ { value: 'trash' } }
              onClick={ handleClearSelection }
              title={ t('icon-selector.clear-selection') }
              type='default'
            />}
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
              title={ t('refresh') }
              variant='minimal'
              theme='secondary'
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
