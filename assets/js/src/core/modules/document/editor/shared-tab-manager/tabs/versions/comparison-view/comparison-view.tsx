/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { ComparisonViewUi } from './comparison-view-ui'
import { Content } from '@Pimcore/components/content/content'
import { type VersionComparisonViewProps } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

export const ComparisonView = ({
  versionIds
}: VersionComparisonViewProps): React.JSX.Element => {
  useEffect(() => {
    console.log('----- versionIds: ', versionIds)
  }, [versionIds])

  if ([].length === 0) {
    return (
      <Content
        fullPage
        loading
      />
    )
  }

  return (
    <ComparisonViewUi
      versionIds={ versionIds }
      versions={ [] }
    />
  )
}
