/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Content } from '@Pimcore/components/content/content'
import { type SingleVersionViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { DocumentVersionsView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view'
import { useVersionUrl } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl'

export const SingleView = ({ versionId }: SingleVersionViewProps): React.JSX.Element => {
  const { isLoading, url } = useVersionUrl({ versionId: versionId.id })

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
      versionUrl={ url }
      versionsIdList={ [versionId.count] }
    />
  )
}
