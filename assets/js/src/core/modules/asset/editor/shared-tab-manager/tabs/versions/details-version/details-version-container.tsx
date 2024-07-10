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
  api, type Version
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import i18n from '@Pimcore/app/i18n'
import { store } from '@Pimcore/app/store'
import { formatVersionData } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-functions'
import {
  DetailsVersionView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-view'

export interface DetailsVersionsContainerProps {
  versions: Version[]
  versionId: number
}

export const DetailsVersionContainer = ({
  versions,
  versionId
}: DetailsVersionsContainerProps): React.JSX.Element => {
  const [id, setId] = useState(versionId)
  const [versionData, setVersionData] = useState([] as object[])
  const [imageUrls, setImageUrls] = useState({})

  useEffect(() => {
    setId(versionId)
  }, [versionId])

  useEffect(() => {
    const versionPromise = store.dispatch(api.endpoints.getVersionById.initiate({ id }))

    if (!Object.keys(imageUrls).includes(id.toString())) {
      fetch(`http://localhost/studio/api/versions/${id}/image/stream`)
        .then(async (response) => await response.blob())
        .then((imageBlob) => {
          const imageURL = URL.createObjectURL(imageBlob)
          setImageUrls({ [id]: imageURL, ...imageUrls })
        })
        .catch((err) => {
          console.error(err)
        })
    }

    Promise.resolve(versionPromise)
      .then((responses): void => {
        const tempVersionData: any[] = []
        const data = responses.data
        for (const key in data) {
          tempVersionData.push({
            [i18n.t('field')]: i18n.t(`version.${key}`)
          })
        }

        let index = 0
        for (const key in data) {
          tempVersionData[index++][`${i18n.t('version.version')} ${id}`] =
            formatVersionData(key, data[key])
        }

        if (JSON.stringify(tempVersionData) !== JSON.stringify(versionData)) {
          setVersionData(tempVersionData)
        }
      })
      .catch(err => { console.log(err) })
  }, [imageUrls, id])

  if (versionData.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <DetailsVersionView
      data={ versionData }
      firstVersion={ versions[0].id === id }
      imgSrc={ imageUrls[id] }
      lastVersion={ versions[versions.length - 1].id === id }
      onClickNext={ onClickNext }
      onClickPrevious={ onClickPrevious }
      versionId={ id }
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
      if (versions[i].id === id) {
        if ((i + offset) >= 0 && (i + offset) < versions.length) {
          setId(versions[i + offset].id)
        }
        break
      }
    }
  }
}
