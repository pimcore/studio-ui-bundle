/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import Search from 'antd/es/input/Search'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { Box } from '@Pimcore/components/box/box'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTranslation } from 'react-i18next'
import { UploadModalButton } from '@Pimcore/components/modal/upload-modal/upload-modal-button'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'
import { createElementSelectorAreas, type IRelationAllowedTypesDataComponent } from '../../../../helpers/relations/allowed-types'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { type SelectedItem } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

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
      <UploadModalButton
        maxItems={ props.uploadMaxItems }
        onSuccess={ props.addAssets }
        showMaxItemsError={ props.uploadShowMaxItemsError }
        targetFolderPath={ props.assetUploadPath ?? undefined }
      />
    )
  }

  return (
    <Box padding="extra-small">
      <Flex
        align="center"
        gap="extra-small"
        justify="space-between"
      >
        { buttons.length > 0 ? <ButtonGroup items={ buttons } /> : <div></div> }

        <div>
          <Search
            onInput={
            (e: React.ChangeEvent<HTMLInputElement>) => {
              props.onSearch(e.target.value)
            } }
            placeholder={ t('search') }
          />
        </div>
      </Flex>

    </Box>
  )
}
