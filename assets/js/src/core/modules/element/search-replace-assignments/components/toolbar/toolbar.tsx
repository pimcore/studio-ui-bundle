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
import { t } from 'i18next'
import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Split } from '@Pimcore/components/split/split'
import { useSearchReplace } from '../../providers/search-replace/search-replace-provider'

export const Toolbar = (): React.JSX.Element => {
  const {
    hasSelection,
    selectedRowsCount,
    handleClearSelection,
    handleApplyToSelection,
    handleRefresh,
    currentPage,
    handlePageChange,
    totalItems,
    defaultPageSize,
    isFormValid,
    isFetching,
    isLoading
  } = useSearchReplace()
  return (
    <BaseToolbar
      justify="space-between"
      theme="secondary"
    >
      {hasSelection && (
        <Flex
          align="center"
          gap="small"
        >
          <Checkbox
            checked
            onClick={ (e) => {
              e.stopPropagation()
              handleClearSelection()
            } }
          >
            {t('listing.selection.total', { total: selectedRowsCount })}
          </Checkbox>
          <Button
            disabled={ !isFormValid }
            onClick={ handleApplyToSelection }
            type="primary"
          >
            {t('search-replace-assignments.apply-to-selection')}
          </Button>
        </Flex>
      )}
      {!hasSelection && <div />}
      <Split size='extra-small'>
        <IconButton
          disabled={ isFetching || isLoading }
          icon={ { value: 'refresh' } }
          onClick={ handleRefresh }
        />
        <Pagination
          current={ currentPage }
          defaultPageSize={ defaultPageSize }
          onChange={ handlePageChange }
          showSizeChanger
          showTotal={ (total) => t('pagination.show-total', { total }) }
          total={ totalItems }
        />
      </Split>
    </BaseToolbar>
  )
}
