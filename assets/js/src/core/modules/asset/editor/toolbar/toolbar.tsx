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

import React, { useContext } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { useAssetDraft } from '../../hooks/use-asset-draft'
import { AssetContext } from '../../asset-provider'
import { type UpdateAssetByIdApiArg, useUpdateAssetByIdMutation } from '../../asset-api-slice.gen'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { asset, properties } = useAssetDraft(id!)
  const hasChanges = asset?.modified === true
  const [saveAsset, { isLoading }] = useUpdateAssetByIdMutation()

  return (
    <ToolbarView
      pinnableToolbarElements={
    [
      {
        iconName: 'refresh',
        label: t('toolbar.reload'),
        pinning: true
      }
    ]
  }
      renderSaveButton={
        <Button
          disabled={ !hasChanges || isLoading }
          onClick={ onSaveClick }
          type="primary"
        >
          {t('toolbar.save-and-publish')}

          {isLoading && '...'}
        </Button>
      }
    />
  )

  function onSaveClick (): void {
    if (asset?.changes === undefined) return

    const update: UpdateAssetByIdApiArg['body']['data'] = {}
    if (asset.changes.properties === true) {
      update.properties = properties
    }

    update.parentId = asset.parentId

    const savePromise = saveAsset({
      id: id!,
      body: {
        data: {
          ...update
        }
      }
    })

    savePromise.catch((error) => {
      console.error(error)
    })
  }
}
