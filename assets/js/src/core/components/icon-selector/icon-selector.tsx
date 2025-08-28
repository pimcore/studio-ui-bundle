/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState, useCallback } from 'react'
import { Modal, IconButton, SearchInput, Pagination, Tabs, ModalFooter, Space } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './icon-selector.styles'
import { isUndefined } from 'lodash'

export interface IconSelectorProps {
  open: boolean
  onCancel: () => void
  onSelect: (iconName: string) => void
  selectedIcon?: string
}

export const IconSelector = ({
  open,
  onCancel,
  onSelect,
  selectedIcon
}: IconSelectorProps): React.JSX.Element => {
  const { styles } = useStyles()
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const allIcons = iconLibrary.getIcons()

  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(40)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [currentSelectedIcon, setCurrentSelectedIcon] = useState<string | undefined>(selectedIcon)

  const filteredIcons = useMemo(() => {
    const iconsArray = Array.from(allIcons)

    let filtered = iconsArray.filter(([name]) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (activeTab === 'pimcore') {
      // FOR DEMO - delete when implementing tab
      filtered = filtered.filter(([name]) =>
        name.startsWith('pimcore') ||
        name.includes('data-object') ||
        name.includes('document') ||
        name.includes('asset') ||
        name.includes('folder') ||
        name.includes('user') ||
        name.includes('workflow')
      )
    }

    return filtered
  }, [allIcons, searchValue, activeTab])

  const paginatedIcons = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredIcons.slice(startIndex, endIndex)
  }, [filteredIcons, currentPage, pageSize])

  const handleIconClick = useCallback((iconName: string) => {
    setCurrentSelectedIcon(iconName)
  }, [])

  const handleSave = useCallback(() => {
    if (!isUndefined(currentSelectedIcon)) {
      onSelect(currentSelectedIcon)
    }
    onCancel()
  }, [currentSelectedIcon, onSelect, onCancel])

  const handleCancel = useCallback(() => {
    setCurrentSelectedIcon(selectedIcon)
    setSearchValue('')
    setCurrentPage(1)
    onCancel()
  }, [selectedIcon, onCancel])

  const handleClearSelection = useCallback(() => {
    setCurrentSelectedIcon(undefined)
  }, [])

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }, [])

  const handleRefresh = useCallback(() => {
    setSearchValue('')
    setCurrentPage(1)
    setCurrentSelectedIcon(selectedIcon)
  }, [selectedIcon])

  const handlePageChange = useCallback((page: number, newPageSize?: number) => {
    setCurrentPage(page)
    if (!isUndefined(newPageSize)) {
      setPageSize(newPageSize)
    }
  }, [])

  const tabItems = [
    {
      key: 'all',
      label: t('icon-selector.all-icons'),
      children: null
    },
    {
      key: 'pimcore',
      label: t('icon-selector.pimcore-library'),
      children: null
    }
  ]

  return (
    <Modal
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
      title={ t('icon-selector.title') }
    >
      <Flex
        gap="small"
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
          {paginatedIcons.map(([iconName]) => (
            <Space
              className={ `${styles.iconCard} ${currentSelectedIcon === iconName ? styles.selectedCard : ''}` }
              key={ iconName }
              onClick={ () => { handleIconClick(iconName) } }
              size='mini'
            >
              <Icon
                options={ { height: 24, width: 24 } }
                value={ iconName }
              />
              <span className={ styles.iconName }>{iconName}</span>
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
            <span>{t('icon-selector.current-selection')}</span>
            <Flex
              align='center'
              className={ styles.selectionPreview }
              justify='center'
            >
              {!isUndefined(currentSelectedIcon)
                ? (
                  <Icon
                    options={ { height: 16, width: 16 } }
                    value={ currentSelectedIcon }
                  />
                  )
                : (
                  <span className={ styles.noSelection }>{t('icon-selector.no-selection')}</span>
                  )}
            </Flex>
            {!isUndefined(currentSelectedIcon) && (
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
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ handleRefresh }
              title={ t('refresh') }
            />
            <Pagination
              current={ currentPage }
              defaultPageSize={ pageSize }
              onChange={ handlePageChange }
              pageSizeOptions={ [20, 40, 80, 120] }
              showSizeChanger
              showTotal={ (total) => t('pagination.show-total', { total }) }
              total={ filteredIcons.length }
            />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}
