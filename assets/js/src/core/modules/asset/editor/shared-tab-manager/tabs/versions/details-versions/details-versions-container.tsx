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
  api, type ImageVersion
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import {
  DetailsVersionsView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-view'
import i18n from '@Pimcore/app/i18n'
import { store } from '@Pimcore/app/store'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import {
  formatVersionData
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-functions'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'

export interface DetailsVersionsContainerProps {
  versionIds: VersionIdentifiers[]
}

export const DetailsVersionsContainer = ({
  versionIds
}: DetailsVersionsContainerProps): React.JSX.Element => {
  const [versionData, setVersionData] = useState([] as object[])
  const [imageUrls, setImageUrls] = useState({})

  useEffect(() => {
    const versionPromises: Array<Promise<any>> = []
    versionIds.forEach(async vId => {
      const id = vId.id
      versionPromises.push(store.dispatch(api.endpoints.getVersionById.initiate({ id })))

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
    })

    Promise.all(versionPromises)
      .then((responses): void => {
        const tempVersionData: any[] = []
        const dataRaw = responses[0].data as ImageVersion
        const metadata = dataRaw.metadata

        const data: Partial<ImageVersion> = { ...dataRaw }
        delete data.metadata

        for (const key in data) {
          tempVersionData.push({
            [i18n.t('field')]: i18n.t(`version.${key}`)
          })
        }

        for (const meta of metadata) {
          data[`${meta.name} (${meta.type})`] = meta.data
          tempVersionData.push({
            [i18n.t('field')]: `${meta.name} (${meta.type})`
          })
        }

        tempVersionData.push({
          [i18n.t('field')]: i18n.t('version.image')
        })

        responses.forEach((response, versionIndex): void => {
          const dataRaw = response.data as ImageVersion
          const metadata = dataRaw.metadata

          const data: Partial<ImageVersion> = { ...dataRaw }
          delete data.metadata
          let index = 0
          for (const key in data) {
            tempVersionData[index++][`${i18n.t('version.version')} ${versionIds[versionIndex].count}`] =
              formatVersionData(key, data[key])
          }

          for (const meta of metadata) {
            tempVersionData[index++][`${i18n.t('version.version')} ${versionIds[versionIndex].count}`] =
              meta.data
          }

          tempVersionData[index++][`${i18n.t('version.version')} ${versionIds[versionIndex].count}`] = (
            <PimcoreImage
              key={ 'image' }
              src={ imageUrls[versionIds[versionIndex].id] ?? '' }
            />
          )
        })

        if (JSON.stringify(tempVersionData) !== JSON.stringify(versionData)) {
          setVersionData(tempVersionData)
        }
      })
      .catch(err => { console.log(err) })
  }, [versionIds, imageUrls])

  if (versionData.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <DetailsVersionsView
      data={ versionData }
      versionIds={ versionIds }
    />
  )
}
