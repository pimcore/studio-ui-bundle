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
import { useAppDispatch } from '@Pimcore/app/store'
import {
  api,
  type DataObjectVersion
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { type SingleVersionViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { useDataObjectGetLayoutByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { getFormattedDataStructure, versionsDataToTableData } from '../details-functions'
import { Content } from '@Pimcore/components/content/content'
import { SingleViewUi } from './single-view-ui'
import { useInjection } from '@Pimcore/app/depency-injection'
import type {
  DynamicTypeObjectDataRegistry
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import {
  type IFormattedDataStructureData,
  type ILayoutItem
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'

interface IVersionData extends IObjectVersionField {}

export const SingleView = ({ versionId }: SingleVersionViewProps): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const { id } = useElementContext()
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  const [vId, setVId] = useState(versionId)
  const [versionData, setVersionData] = useState<IVersionData[]>([])
  const [layoutsList, setLayoutsList] = useState<ILayoutItem[]>([])

  const { data: layoutData } = useDataObjectGetLayoutByIdQuery({ id })

  useEffect(() => {
    if (versionId.id !== vId.id) {
      setVersionData([])
      setVId(versionId)
    }
  }, [versionId])

  useEffect(() => {
    const versionPromise = dispatch(api.endpoints.versionGetById.initiate({ id: vId.id }))

    Promise.resolve(versionPromise)
      .then(async (response): Promise<void> => {
        const formattedDataList: IFormattedDataStructureData[][] = []

        const dataRaw = response.data as DataObjectVersion

        if (!isUndefined(layoutData?.children) && !isUndefined(dataRaw)) {
          formattedDataList.push(await getFormattedDataStructure({
            objectId: id,
            layout: layoutData.children,
            versionData: dataRaw,
            versionId: vId.id,
            versionCount: vId.count,
            objectDataRegistry,
            layoutsList,
            setLayoutsList
          }))

          setVersionData(versionsDataToTableData({ data: formattedDataList }))
        }
      })
      .catch(err => { console.log(err) })
  }, [vId, layoutData])

  if (isEmpty(versionData)) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <SingleViewUi data={ versionData } />
  )
}
