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
import { formatVersionData } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-functions'
import {
  DetailsVersionView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-view'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import { useTranslation } from 'react-i18next'

export interface DetailsVersionsContainerProps {
  versions: Version[]
  versionId: VersionIdentifiers
}

export const DetailsVersionContainer = ({
  versions,
  versionId
}: DetailsVersionsContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [vId, setVId] = useState(versionId)
  const [versionData, setVersionData] = useState([] as object[])
  const [imageUrls, setImageUrls] = useState({})

  useEffect(() => {
    setVId(versionId)
  }, [versionId])

  useEffect(() => {
    const versionPromise = store.dispatch(api.endpoints.versionGetById.initiate({ id: vId.id }))

    if (!Object.keys(imageUrls).includes(vId.id.toString())) {
      fetch(`http://localhost/studio/api/versions/${vId.id}/image/stream`)
        .then(async (response) => await response.blob())
        .then((imageBlob) => {
          const imageURL = URL.createObjectURL(imageBlob)
          setImageUrls({ [vId.id]: imageURL, ...imageUrls })
        })
        .catch((err) => {
          console.error(err)
        })
    }

    Promise.resolve(versionPromise)
      .then((responses): void => {
        const tempVersionData: any[] = []
        const dataRaw = responses.data as AssetVersion
        const metadata = dataRaw.metadata

        const data: Partial<AssetVersion> = { ...dataRaw }
        delete data.metadata

        for (const key in data) {
          tempVersionData.push({
            [t('field')]: t(`version.${key}`)
          })
        }

        for (const meta of metadata) {
          data[`${meta.name} (${meta.type})`] = meta.data
          tempVersionData.push({
            [t('field')]: `${meta.name} (${meta.type})`
          })
        }

        let index = 0
        for (const key in data) {
          tempVersionData[index++][`${t('version.version')} ${vId.count}`] =
            formatVersionData(key, data[key])
        }

        if (JSON.stringify(tempVersionData) !== JSON.stringify(versionData)) {
          setVersionData(tempVersionData)
        }
      })
      .catch(err => { console.log(err) })
  }, [imageUrls, vId])

  if (versionData.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <DetailsVersionView
      data={ versionData }
      firstVersion={ versions[0].id === vId.id }
      imgSrc={ imageUrls[vId.id] }
      lastVersion={ versions[versions.length - 1].id === vId.id }
      onClickNext={ onClickNext }
      onClickPrevious={ onClickPrevious }
      versionId={ vId }
    />
  )

  function onClickNext (): void {
    setVersionIdByOffset(1)
  }

  function onClickPrevious (): void {
    setVersionIdByOffset(-1)
  }

  function setVersionIdByOffset (offset: number): void {
    for (let i = 0; i < versions.length; i++) {
      if (versions[i].id === vId.id) {
        if ((i + offset) >= 0 && (i + offset) < versions.length) {
          setVId({
            id: versions[i + offset].id,
            count: versions[i + offset].versionCount
          })
        }
        break
      }
    }
  }
}
