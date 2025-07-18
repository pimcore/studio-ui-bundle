/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/reports/components/pagination/pagination'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

interface IReportToolbarProps {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  totalItems: number
}

export const ReportToolbar = ({ page, setPage, pageSize, setPageSize, totalItems }: IReportToolbarProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const renderDropdownLabel = (translationKey: string): React.JSX.Element => (
    <Flex
      align={ 'center' }
      className={ styles.dropdownLabel }
      gap="extra-small"
    >
      <Icon value={ 'export' } />
      {t(translationKey)}
    </Flex>
  )

  const dropdownItems = [
    {
      key: 'csv-export-with-headers',
      label: renderDropdownLabel('reports.csv-export-with-headers'),
      onClick: () => {
        console.log('Item 1 clicked')
      }
    }
  ]

  return (
    <Toolbar
      justify="space-between"
      theme="secondary"
    >
      <Dropdown menu={ { items: dropdownItems } }>
        <DropdownButton>
          {renderDropdownLabel('reports.csv-export')}
        </DropdownButton>
      </Dropdown>
      <Pagination
        page={ page }
        pageSize={ pageSize }
        setPage={ setPage }
        setPageSize={ setPageSize }
        totalItems={ totalItems }
      />
    </Toolbar>
  )
}
