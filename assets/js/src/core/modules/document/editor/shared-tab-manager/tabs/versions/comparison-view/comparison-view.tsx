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
import { type VersionComparisonViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { DocumentVersionsView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { currentDomain } from '@Pimcore/app/config/app-config'

export const ComparisonView = ({ versionIds }: VersionComparisonViewProps): React.JSX.Element => {
  const [versionUrl, setVersionUrl] = useState<string | null>(null)
  const versionsIdList = versionIds.map((version) => version.count)

  useEffect(() => {
    const mainVersionId = versionIds[0].id
    const comparedVersionId = versionIds?.[1]?.id

    if (!isEmptyValue(mainVersionId) && !isEmptyValue(comparedVersionId)) {
      const url = `${currentDomain}/admin/document/diff-versions/from/${mainVersionId}/to/${comparedVersionId}`

      setVersionUrl(url)
    }
  }, [versionIds])

  return (
    <DocumentVersionsView
      versionUrl={ versionUrl }
      versionsIdList={ versionsIdList }
    />
  )
}
