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
import { Flex, Space } from 'antd'
import {
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'

interface ComparisonViewUiProps {
  versions: any[]
  versionIds: VersionComparisonViewProps['versionIds']
}

export const ComparisonViewUi = ({
  versions,
  versionIds
}: ComparisonViewUiProps): React.JSX.Element => {
  return (
    <div>

      <Space
        direction="vertical"
        size="large"
        style={ { maxWidth: versions.length > 1 ? 1200 : 600 } }
      >
        <Flex
          align="center"
          gap="small"
          justify="center"
          style={ { minHeight: 100 } }
        >
          Content
        </Flex>
      </Space>
    </div>
  )
}
