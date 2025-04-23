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

import React, { useEffect, useState } from 'react'
import { store } from '@Pimcore/app/store'
import { api, type AssetVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { ComparisonViewUi } from './comparison-view-ui'
import {
  type AssetVersionData,
  checkIsImageVersion,
  hydrateVersionData,
  loadPreviewImage,
  versionsDataToTableData
} from '../details-functions'
import { Content } from '@Pimcore/components/content/content'
import {
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

export const ComparisonView = ({
  versionIds
}: VersionComparisonViewProps): React.JSX.Element => {
  const [gridData, setGridData] = useState([] as object[])
  const [versions, setVersions] = useState<AssetVersionData[]>([])
  const [isImageVersion, setIsImageVersion] = useState(false)

  const handleImageVersions = (currentVersions: AssetVersionData[], imageUrls: Array<string | null>): void => {
    const imageVersions = currentVersions

    imageVersions.forEach((version, versionIndex) => {
      version.previewImageUrl = imageUrls[versionIndex]
    })

    setVersions(imageVersions)
    setGridData(versionsDataToTableData(imageVersions))
  }

  useEffect(() => {
    const versionPromises: Array<Promise<any>> = []

    setVersions([])
    setGridData([])

    versionIds.forEach(async vId => {
      const id = vId.id
      versionPromises.push(store.dispatch(api.endpoints.versionGetById.initiate({ id })))
    })

    Promise.all(versionPromises)
      .then((responses): void => {
        const currentVersions: AssetVersionData[] = []

        const imagePromises: Array<Promise<string | null>> = []

        responses.forEach((response, versionIndex) => {
          const dataRaw = response.data as AssetVersion

          if (checkIsImageVersion(dataRaw)) {
            setIsImageVersion(true)
          }

          currentVersions.push(hydrateVersionData(dataRaw, versionIds[versionIndex].id, versionIds[versionIndex].count))
          imagePromises.push(loadPreviewImage(dataRaw, versionIds[versionIndex].id))
        })

        Promise.all(imagePromises)
          .then((imageUrls): void => {
            handleImageVersions(currentVersions, imageUrls)
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => { console.log(err) })
  }, [versionIds])

  if (gridData.length === 0) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <ComparisonViewUi
      gridData={ gridData }
      isImageVersion={ isImageVersion }
      versionIds={ versionIds }
      versions={ versions }
    />
  )
}
