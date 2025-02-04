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
import { useAppDispatch } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { type SingleVersionViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { useDataObjectGetLayoutByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const SingleView = ({
  versions,
  versionId,
  setDetailedVersions
}: SingleVersionViewProps): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const { id } = useElementContext()

  const [vId, setVId] = useState(versionId)
  const [versionData, setVersionData] = useState([] as object[])

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
      .then((response): void => {
        console.log('------->>>>> response: ', response)
      })
      .catch(err => { console.log(err) })
  }, [vId])

  console.log('------->>>>> versionData: ', versionData)
  console.log('------->>>>> layoutData: ', layoutData)

  return (
    <div>
      <p><strong>TODO: implement data object single version view for:</strong></p>
      ID: {versionId.id}
      <hr />
      Jump to other versions:
      {versions.map((version) => (
        <div key={ version.id }>
          <p>
            <button onClick={ () => {
              setDetailedVersions([{
                id: version.id,
                count: version.versionCount
              }])
            } }
            > Version: {version.versionCount}</button>
          </p>
        </div>
      ))}
    </div>
  )
}
