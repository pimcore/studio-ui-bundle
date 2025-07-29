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
import { Flex } from 'antd'
import { type VersionIdentifiers } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { DocumentVersionsView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view'

interface SingleVersionViewUiProps {
  versionId: VersionIdentifiers
  versionUrl: string | null
}

export const SingleViewUi = ({
  versionId,
  versionUrl
}: SingleVersionViewUiProps): React.JSX.Element => {
  const versionsIdList: number[] = [versionId.count]

  return (
    <Flex
      gap="small"
      style={ { minWidth: '100%' } }
      vertical
    >

      <DocumentVersionsView
        versionUrl={ versionUrl }
        versionsIdList={ versionsIdList }
      />
    </Flex>
  )
}
