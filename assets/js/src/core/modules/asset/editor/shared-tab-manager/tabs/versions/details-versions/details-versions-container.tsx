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
  api
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import {
  DetailsVersionsView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-view'
import i18n from '@Pimcore/app/i18n'
import { store } from '@Pimcore/app/store'
import { formatDateTime } from '@Pimcore/utils/helpers'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

export interface DetailsVersionsContainerProps {
  versionIds: number[]
}

export const DetailsVersionsContainer = ({
  versionIds
}: DetailsVersionsContainerProps): React.JSX.Element => {
  const [versionData, setVersionData] = useState([{}])
  const [imageUrls, setImageUrls] = useState({})

  const formatMap: any = {
    dimensions: (data: any): string => {
      return data.width + ' x ' + data.height
    },
    creationDate: (data: number): string => {
      return formatDateTime(data)
    },
    modificationDate: (data: number): string => {
      return formatDateTime(data)
    },
    fileSize: (data: number): string => {
      return (data / 1000) + ' KB'
    }
  }
  const formatData = (key: string, data: any): string => {
    return formatMap[key] as boolean ? formatMap[key](data) : data.toString()
  }

  useEffect(() => {
    const versionPromises: Array<Promise<any>> = []
    versionIds.forEach(async id => {
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
        const data = responses[0].data
        for (const key in data) {
          tempVersionData.push({
            [i18n.t('field')]: i18n.t(`version.${key}`)
          })
        }

        tempVersionData.push({
          [i18n.t('field')]: i18n.t('version.image')
        })

        responses.forEach((response, versionIndex): void => {
          const data = response.data
          let index = 0
          for (const key in data) {
            tempVersionData[index++][`${i18n.t('version.version')} ${versionIds[versionIndex]}`] =
              formatData(key, data[key])
          }

          tempVersionData[index++][`${i18n.t('version.version')} ${versionIds[versionIndex]}`] = (
            <PimcoreImage
              key={ 'image' }
              src={ imageUrls[versionIds[versionIndex]] ?? '' }
            />
          )
        })

        if (JSON.stringify(tempVersionData) !== JSON.stringify(versionData)) {
          setVersionData(tempVersionData)
        }
      })
      .catch(err => { console.log(err) })
  })

  if (versionData.length === 1) {
    return <div>Loading ...</div>
  }

  return (
    <DetailsVersionsView
      data={ versionData }
      versionIds={ versionIds }
    />
  )
}
