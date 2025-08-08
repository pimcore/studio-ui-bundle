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
import { useVersionUrl } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl'

export const ComparisonView = ({ versionIds }: VersionComparisonViewProps): React.JSX.Element => {
  const [versionUrl, setVersionUrl] = useState<string | null>(null)
  const versionsIdList = versionIds.map((version) => version.count)

  const mainVersionId = versionIds?.[0]?.id
  const comparedVersionId = versionIds?.[1]?.id

  const { url: mainVersionUrl } = useVersionUrl({ versionId: mainVersionId })

  useEffect(() => {
    if (!isEmptyValue(comparedVersionId)) {
      const comparisonVersionUrl = `${currentDomain}/pimcore-studio/api/documents/diff-versions/from/${mainVersionId}/to/${comparedVersionId}`

      setVersionUrl(comparisonVersionUrl)
    } else {
      setVersionUrl(mainVersionUrl)
    }
  }, [versionIds, mainVersionUrl])

  return (
    <DocumentVersionsView
      versionUrl={ versionUrl }
      versionsIdList={ versionsIdList }
    />
  )
}
