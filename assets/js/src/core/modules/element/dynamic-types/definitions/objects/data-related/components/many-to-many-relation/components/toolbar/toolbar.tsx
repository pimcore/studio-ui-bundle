/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
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
import { createElementSelectorAreas, type IRelationAllowedTypesDataComponent } from '../../../../helpers/relations/allowed-types'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { type SelectedItem } from '@sdk/modules/element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { debounce } from 'lodash'

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
}

export const ManyToManyRelationToolbar = (props: ManyToManyRelationToolbarProps): React.JSX.Element => {
  const { confirm } = useFormModal()
  const { t } = useTranslation()

  const buttons: React.JSX.Element[] = []

  if (props.disabled !== true) {
    buttons.push(
      <ElementSelectorButton
        elementSelectorConfig={ {
          selectionType: SelectionType.Multiple,
          areas: createElementSelectorAreas(props),
          config: {
            assets: {
              allowedTypes: props.allowedAssetTypes
            },
            documents: {
              allowedTypes: props.allowedAssetTypes
            },
            objects: {
              allowedTypes: props.allowedClasses
            }
          },
          onFinish: (event) => {
            const getSubType = (item: SelectedItem): string | null => {
              if (item.elementType === 'data-object') {
                return item.data.classname ?? 'folder'
              }
              return item.data.type ?? null
            }

            const items: ManyToManyRelationValueItem[] = event.items.map((item) => ({
              id: item.data.id,
              type: item.elementType,
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

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      props.onSearch(value)
    }, 200),
    [props.onSearch]
  )

  return (
    <Box padding="extra-small">
      <Flex
        align="center"
        gap="extra-small"
        justify="space-between"
      >
        { buttons.length > 0 ? <ButtonGroup items={ buttons } /> : <div></div> }

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

    </Box>
  )
}
