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
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton, Pagination, Split } from '@sdk/components'
import { t } from 'i18next'

interface RedirectsToolbarProps {
  redirectRowsLength: number
  cleanupLoading: boolean
  redirectsFetching: boolean
  exportLoading: boolean
  importLoading: boolean
  currentPage: number
  totalItems: number
  onCleanup: () => Promise<void>
  onExport: () => Promise<void>
  onImport: () => void
  onRefresh: () => void
  onPageChange: (page: number, pageSize: number) => void
}

export const RedirectsToolbar = ({
  redirectRowsLength,
  cleanupLoading,
  redirectsFetching,
  exportLoading,
  importLoading,
  currentPage,
  totalItems,
  onCleanup,
  onExport,
  onImport,
  onRefresh,
  onPageChange
}: RedirectsToolbarProps): React.JSX.Element => {
  return (
    <Toolbar theme="secondary">
      <Split>
      <Flex
        justify='space-between'
        style={ { width: '100%' } }
      >
        <div>
          <IconTextButton
            disabled={ redirectRowsLength < 1 || cleanupLoading || redirectsFetching }
            icon={ { value: 'trash' } }
            loading={ cleanupLoading }
            onClick={ onCleanup }
            type={ 'link' }
          >
            {t('redirects.clean-up')}
          </IconTextButton>
          <IconTextButton
            disabled={ redirectsFetching || exportLoading }
            icon={ { value: 'download' } }
            loading={ exportLoading }
            onClick={ onExport }
            type={ 'link' }
          >
            {t('redirects.csv-export')}
          </IconTextButton>
          <IconTextButton
            disabled={ redirectsFetching || importLoading }
            icon={ { value: 'import-csv' } }
            loading={ importLoading }
            onClick={ onImport }
            type={ 'link' }
          >
            {t('redirects.csv-import')}
          </IconTextButton>
        </div>
        <IconButton
          disabled={ redirectsFetching }
          icon={ { value: 'refresh' } }
          onClick={ onRefresh }
        />
      </Flex>
      <Pagination
        current={ currentPage }
        onChange={ onPageChange }
        showSizeChanger
        showTotal={ (total) => t('pagination.show-total', { total }) }
        total={ totalItems }
      />
      </Split>
    </Toolbar>
  )
}
