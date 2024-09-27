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
import {
  api, type AssetVersion
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import {
  ComparisonViewUi
} from './comparison-view-ui'
import {
  type AssetVersionData,
  hydrateVersionData, loadPreviewImage,
  versionsDataToTableData
} from '../details-functions'
import { store } from '@Pimcore/app/store'
import { Content } from '@Pimcore/components/content/content'
import {
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-details-props'

export const ComparisonView = ({
  versionIds
}: VersionComparisonViewProps): React.JSX.Element => {
  const [gridData, setGridData] = useState([] as object[])
  const [versions, setVersions] = useState<AssetVersionData[]>([])

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
        const versions: AssetVersionData[] = []
        const imagePromises: Array<Promise<string | null>> = []
        responses.forEach((response, versionIndex) => {
          const dataRaw = response.data as AssetVersion
          versions.push(hydrateVersionData(dataRaw, versionIds[versionIndex].id, versionIds[versionIndex].count))
          imagePromises.push(loadPreviewImage(dataRaw, versionIds[versionIndex].id))
        })

        Promise.all(imagePromises)
          .then((imageUrls): void => {
            versions.forEach((version, versionIndex) => {
              version.previewImageUrl = imageUrls[versionIndex]
            })

            setVersions(versions)
            setGridData(versionsDataToTableData(versions))
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => { console.log(err) })
  }, [versionIds])

  if (gridData.length === 0) {
    return <Content loading />
  }

  return (
    <ComparisonViewUi
      gridData={ gridData }
      versions={ versions }
    />
  )
}