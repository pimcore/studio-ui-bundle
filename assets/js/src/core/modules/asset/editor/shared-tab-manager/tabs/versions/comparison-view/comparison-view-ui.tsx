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

import React from 'react'
import { useStyles } from './comparison-view-ui.style'
import { type AssetVersionData } from '../details-functions'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Flex, Space } from 'antd'
import { EmptyState } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/components/empty-state/empty-state'
import {
  type VersionComparisonViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { VersionsFieldsList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list'

interface ComparisonViewUiProps {
  versions: AssetVersionData[]
  gridData: any[]
  isImageVersion: boolean
  versionIds: VersionComparisonViewProps['versionIds']
}

export const ComparisonViewUi = ({
  versions,
  gridData,
  isImageVersion,
  versionIds
}: ComparisonViewUiProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ styles['right-side'] }>

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
          {versions.map((version, index) => {
            const currentVersion = versionIds.find(item => item.count === version?.versionCount)

            return (
              <div key={ index }>
                { version.previewImageUrl !== null && isImageVersion
                  ? (
                    <PimcoreImage
                      src={ version.previewImageUrl }
                      style={ { maxHeight: 500, maxWidth: 500 } }
                    />
                    )
                  : (
                    <EmptyState
                      fileName={ version?.dataRaw?.fileName }
                      id={ currentVersion?.id }
                    />
                    )
                }
              </div>
            )
          })}
        </Flex>

        <VersionsFieldsList data={ gridData } />
      </Space>
    </div>
  )
}
