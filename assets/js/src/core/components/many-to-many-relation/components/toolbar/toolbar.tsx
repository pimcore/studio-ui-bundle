/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { Box } from '@Pimcore/components/box/box'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTranslation } from 'react-i18next'
import { ModalUploadButton } from '@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { createElementSelectorAreas, createElementSelectorConfig, type IRelationAllowedTypesDataComponent } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { type SelectedItem } from '@sdk/modules/element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { debounce } from 'lodash'
import { RELATION_COLUMN_FILTERS_KEY, useRelationFiltersOptional } from '../../filters/filters'
import { CreateObjectModal } from '../create-object/create-object-modal'
import { useCreatableRelationClasses } from '../create-object/use-creatable-relation-classes'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

export interface ManyToManyRelationToolbarProps extends IRelationAllowedTypesDataComponent {
  empty: () => void
  onSearch: (value: string) => void
  allowClear: boolean
  enableUpload: boolean
  addItems: (items: ManyToManyRelationValueItem[]) => void
  addAssets: (assets: Asset[]) => Promise<void>
  assetUploadPath?: string | null
  disabled?: boolean
  uploadMaxItems?: number
  uploadShowMaxItemsError?: boolean
  allowToCreateNewObject?: boolean
  /** No slots left under `maxItems`; creating another object would overflow the relation. */
  itemLimitReached?: boolean
  maxItems?: number | null
}

export const ManyToManyRelationToolbar = (props: ManyToManyRelationToolbarProps): React.JSX.Element => {
  const { confirm } = useFormModal()
  const { t } = useTranslation()
  const alertModal = useAlertModal()

  const filtersStore = useRelationFiltersOptional()
  const [createObjectOpen, setCreateObjectOpen] = useState(false)

  // Gated on the class-definition flag, and on the relation explicitly accepting objects —
  // the flag only exists on the object relation types, but the toolbar is shared by all of
  // them, and an omitted `dataObjectsAllowed` means "not allowed" everywhere else too.
  const relationCanCreateObjects = props.allowToCreateNewObject === true &&
    props.disabled !== true &&
    props.dataObjectsAllowed === true

  // Skipped entirely for relations that cannot create objects, so asset/document relations
  // do not fetch the class collection.
  const { classes: creatableClasses, isLoading: isLoadingClasses } = useCreatableRelationClasses(
    props.allowedClasses,
    !relationCanCreateObjects
  )

  // Nothing creatable means no usable modal — the tree action hides itself the same way.
  const canCreateObject = relationCanCreateObjects && (isLoadingClasses || creatableClasses.length > 0)

  const appliedColumnFilters = filtersStore?.values[RELATION_COLUMN_FILTERS_KEY]
  const hasAppliedFilters = Array.isArray(appliedColumnFilters) && appliedColumnFilters.length > 0
  const clearFiltersLabel = t('sidebar.clear-all-filters')

  const buttons: React.JSX.Element[] = []

  if (canCreateObject) {
    buttons.push(
      <Tooltip title={ t('relations.create-object.title') }>
        <IconButton
          aria-label={ t('relations.create-object.title') }
          disabled={ isLoadingClasses }
          icon={ { value: 'new' } }
          onClick={ () => {
            // Creating first and rejecting afterwards would leave an orphaned object behind,
            // so the limit is checked before the modal opens.
            if (props.itemLimitReached === true) {
              alertModal.warn({ content: t('items-limit-reached', { maxItems: props.maxItems ?? 0 }) })
              return
            }

            setCreateObjectOpen(true)
          } }
          type="default"
        />
      </Tooltip>
    )
  }

  if (props.disabled !== true) {
    buttons.push(
      <ElementSelectorButton
        elementSelectorConfig={ {
          selectionType: SelectionType.Multiple,
          areas: createElementSelectorAreas(props),
          config: createElementSelectorConfig(props),
          onFinish: (event) => {
            const getSubType = (item: SelectedItem): string | null => {
              if (item.elementType === 'data-object') {
                return item.data.classname ?? 'folder'
              }
              return item.data.type ?? null
            }

            const items: ManyToManyRelationValueItem[] = event.items.map((item) => ({
              id: item.data.id,
              type: mapToLegacyElementType(item.elementType),
              subtype: getSubType(item),
              fullPath: item.data.fullpath,
              isPublished: item.data.published ?? null
            }))
            if (items.length > 0) {
              props.addItems(items)
            }
          }
        } }
        type="default"
      />
    )
  }

  if (props.enableUpload) {
    buttons.push(
      <ModalUploadButton
        maxItems={ props.uploadMaxItems }
        onSuccess={ props.addAssets }
        showMaxItemsError={ props.uploadShowMaxItemsError }
        targetFolderPath={ props.assetUploadPath ?? undefined }
      />
    )
  }

  if (props.allowClear) {
    buttons.push(
      <Tooltip title={ t('empty') }>
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ () => {
            confirm({
              title: t('remove'),
              content: t('relations.remove-all.confirm'),
              onOk: props.empty
            })
          } }
          type="default"
        />
      </Tooltip>
    )
  }

  if (hasAppliedFilters) {
    buttons.push(
      <Tooltip title={ clearFiltersLabel }>
        <IconButton
          aria-label={ clearFiltersLabel }
          icon={ { value: 'clear-filter' } }
          onClick={ () => {
            filtersStore?.reset()
          } }
          type="default"
        />
      </Tooltip>
    )
  }

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      props.onSearch(value)
    }, 200),
    [props.onSearch]
  )

  const withButton = buttons.length > 0

  return (
    <Box padding={ {
      top: 'extra-small',
      left: withButton ? 'extra-small' : 'none',
      bottom: 'extra-small',
      right: withButton ? 'extra-small' : 'none'
    } }
    >
      <Flex
        align="center"
        gap={ withButton ? 'extra-small' : undefined }
        justify={ withButton ? 'space-between' : 'start' }
      >
        { withButton ? <ButtonGroup items={ buttons } /> : <div></div> }

        <div>
          <SearchInput
            onClear={ () => {
              props.onSearch('')
            }
            }
            onInput={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              debouncedSearch(e.target.value)
            } }
            placeholder={ t('search') }
            withoutAddon
          />
        </div>
      </Flex>

      { canCreateObject && (
        <CreateObjectModal
          classes={ creatableClasses }
          isLoading={ isLoadingClasses }
          onCreated={ (item) => { props.addItems([item]) } }
          open={ createObjectOpen }
          setOpen={ setCreateObjectOpen }
        />
      ) }
    </Box>
  )
}
