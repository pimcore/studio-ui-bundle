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
import { isEmpty, isUndefined } from 'lodash'
import {
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { useAppDispatch } from '@Pimcore/app/store'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import {
  api,
  type DataObjectVersion
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { useDataObjectGetLayoutByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  getFormattedDataStructure,
  versionsDataToTableData
} from '../details-functions'
import { Content } from '@Pimcore/components/content/content'
import { ComparisonViewUI } from './comparison-view-ui'
import type { IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { useInjection } from '@Pimcore/app/depency-injection'
import type {
  DynamicTypeObjectDataRegistry
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import {
  type IFormattedDataStructureData,
  type ILayoutItem
} from '../types'

interface IVersionData extends IObjectVersionField {}

export const ComparisonView = ({
  versionIds
}: VersionComparisonViewProps): React.JSX.Element => {
  const [versionsData, setVersionsData] = useState<IVersionData[]>([])
  const [layoutsList, setLayoutsList] = useState<ILayoutItem[]>([])

  const dispatch = useAppDispatch()

  const { id } = useElementContext()
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { data: layoutData } = useDataObjectGetLayoutByIdQuery({ id })

  useEffect(() => {
    const versionPromises: Array<Promise<any>> = []

    setVersionsData([])

    versionIds.forEach(vId => {
      const currentVersionId = vId.id

      versionPromises.push(dispatch(api.endpoints.versionGetById.initiate({ id: currentVersionId })))
    })

    Promise.all(versionPromises)
      .then((responses): void => {
        const formattedDataList: IFormattedDataStructureData[][] = []

        responses.forEach(async (response, versionIndex) => {
          const dataRaw = response.data as DataObjectVersion

          if (!isUndefined(layoutData?.children) && !isUndefined(dataRaw)) {
            formattedDataList.push(await getFormattedDataStructure({
              objectId: id,
              layout: layoutData.children,
              versionData: dataRaw,
              versionId: versionIds[versionIndex].id,
              versionCount: versionIds[versionIndex].count,
              objectDataRegistry,
              layoutsList,
              setLayoutsList
            }))

            setVersionsData(versionsDataToTableData({ data: formattedDataList }))
          }
        })
      })
      .catch(err => { console.log(err) })
  }, [versionIds, layoutData])

  if (isEmpty(versionsData)) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <ComparisonViewUI data={ versionsData } />
  )
}
