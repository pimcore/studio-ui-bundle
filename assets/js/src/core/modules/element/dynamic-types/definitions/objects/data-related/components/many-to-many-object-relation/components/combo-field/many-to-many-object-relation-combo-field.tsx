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
import { Select } from '@Pimcore/components/select/select'
import { type ManyToManyObjectRelationProps } from '../../many-to-many-object-relation'
import { useComboFieldData } from './hooks/use-combo-field-data'
import { DropdownFooter, LoadingRows } from './combo-field-ui'

export const ManyToManyObjectRelationComboField = (props: ManyToManyObjectRelationProps): React.JSX.Element => {
  const { t } = useTranslation()
  const {
    options,
    selectedIds,
    isFetching,
    allItemsLoaded,
    accumulatedOptions,
    unfilteredTotal,
    backgroundLoadEnabled,
    isLoadingInitialLabels,
    searchTerm,
    isDisabled,
    handleSearch,
    handleDropdownVisibleChange,
    handlePopupScroll,
    handleSelect,
    handleDeselect,
    localFilterOption
  } = useComboFieldData(props)

  return (
    <Select
      className={ props.className }
      disabled={ isDisabled }
      dropdownRender={ (menu) => (
        <>
          { menu }
          { isFetching && !allItemsLoaded && options.length > 0 && <LoadingRows /> }
          { searchTerm === '' && (
            <DropdownFooter
              allLoaded={ allItemsLoaded }
              backgroundMode={ backgroundLoadEnabled }
              loaded={ accumulatedOptions.length }
              total={ unfilteredTotal }
            />
          ) }
        </>
      ) }
      filterOption={ allItemsLoaded ? localFilterOption : false }
      loading={ isFetching }
      loadingSkeleton={ isLoadingInitialLabels }
      maxCount={ props.maxItems ?? undefined }
      mode="multiple"
      notFoundContent={ isFetching ? <LoadingRows /> : undefined }
      onDeselect={ handleDeselect }
      onDropdownVisibleChange={ handleDropdownVisibleChange }
      onPopupScroll={ handlePopupScroll }
      onSearch={ handleSearch }
      onSelect={ handleSelect }
      options={ options }
      placeholder={ t('search') }
      showSearch
      value={ selectedIds }
    />
  )
}
