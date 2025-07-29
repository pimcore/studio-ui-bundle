/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { SingleViewUi } from './single-view-ui'
import { Content } from '@Pimcore/components/content/content'
import {
  type SingleVersionViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

export const SingleView = ({
  versions,
  versionId,
  setDetailedVersions
}: SingleVersionViewProps): React.JSX.Element => {
  const [vId, setVId] = useState(versionId)
  const [versionData, setVersionData] = useState([] as object[])

  useEffect(() => {
    if (versionId.id !== vId.id) {
      setVersionData([])
      setVId(versionId)
    }
  }, [versionId])

  useEffect(() => {
    console.log('----->>>> vId: ', vId)
  }, [vId])

  function onClickNext (): void {
    setVersionData([])
  }

  function onClickPrevious (): void {
    setVersionData([])
  }

  if (versionData.length === 0) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <SingleViewUi
      data={ versionData }
      firstVersion={ versions[0].id === vId.id }
      onClickNext={ onClickNext }
      onClickPrevious={ onClickPrevious }
      versionId={ vId }
    />
  )
}
