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
  api, type AssetVersion, type Version
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import { store } from '@Pimcore/app/store'
import {
  hydrateVersionData, versionsDataToTableData
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-functions'
import {
  DetailsVersionView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-view'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import { Content } from '@Pimcore/components/content/content'

export interface DetailsVersionsContainerProps {
  versions: Version[]
  versionId: VersionIdentifiers
  setDetailedVersions: (vIds: VersionIdentifiers[]) => void
}

export const DetailsVersionContainer = ({
  versions,
  versionId,
  setDetailedVersions
}: DetailsVersionsContainerProps): React.JSX.Element => {
  const [vId, setVId] = useState(versionId)
  const [versionData, setVersionData] = useState([] as object[])
  const [versionPreviewImageUrl, setVersionPreviewImageUrl] = useState<string | null>(null)

  useEffect(() => {
    setVersionData([])
    setVId(versionId)
  }, [versionId])

  useEffect(() => {
    const versionPromise = store.dispatch(api.endpoints.versionGetById.initiate({ id: vId.id }))
    Promise.resolve(versionPromise)
      .then((responses): void => {
        const dataRaw = responses.data as AssetVersion
        const tempVersionData = hydrateVersionData(dataRaw, vId.id, vId.count)
        setVersionData(versionsDataToTableData([tempVersionData]))
        setVersionPreviewImageUrl(tempVersionData.previewImageUrl)
      })
      .catch(err => { console.log(err) })
  }, [vId])

  if (versionData.length === 0) {
    return <Content loading />
  }

  return (
    <DetailsVersionView
      data={ versionData }
      firstVersion={ versions[0].id === vId.id }
      imgSrc={ versionPreviewImageUrl }
      lastVersion={ versions[versions.length - 1].id === vId.id }
      onClickNext={ onClickNext }
      onClickPrevious={ onClickPrevious }
      versionId={ vId }
    />
  )

  function onClickNext (): void {
    setVersionData([])
    setVersionIdByOffset(1)
  }

  function onClickPrevious (): void {
    setVersionData([])
    setVersionIdByOffset(-1)
  }

  function setVersionIdByOffset (offset: number): void {
    for (let i = 0; i < versions.length; i++) {
      if (versions[i].id === vId.id) {
        if ((i + offset) >= 0 && (i + offset) < versions.length) {
          setDetailedVersions([{
            id: versions[i + offset].id,
            count: versions[i + offset].versionCount
          }])
        }
        break
      }
    }
  }
}
