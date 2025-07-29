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
import { isEmpty } from 'lodash'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { currentDomain } from '@Pimcore/app/config/app-config'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { type SingleVersionViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { useDocumentGetByIdQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { DocumentVersionsView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view'

export const SingleView = ({ versionId }: SingleVersionViewProps): React.JSX.Element => {
  const { id } = useElementContext()
  const { data, isLoading } = useDocumentGetByIdQuery({ id })

  const [versionUrl, setVersionUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isEmpty(data)) {
      const url = `${currentDomain}${data?.fullPath}?pimcore_version=${versionId.id}`

      setVersionUrl(url)
    }
  }, [versionId, data])

  if (isLoading) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <DocumentVersionsView
      versionUrl={ versionUrl }
      versionsIdList={ [versionId.count] }
    />
  )
}
