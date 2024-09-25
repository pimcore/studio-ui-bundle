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
import i18n from '@Pimcore/app/i18n'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Flex, Space } from 'antd'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface DetailsVersionViewProps {
  versionId: VersionIdentifiers
  data: any[]
  imgSrc: string | null
  firstVersion: boolean
  lastVersion: boolean
  onClickPrevious: () => void
  onClickNext: () => void
}

export const DetailsVersionView = ({
  versionId,
  data,
  imgSrc,
  firstVersion,
  lastVersion,
  onClickPrevious,
  onClickNext
}: DetailsVersionViewProps): React.JSX.Element => {
  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor(i18n.t('field'), { size: 162, meta: { type: 'version-preview-field-label' } }),
    columnHelper.accessor(i18n.t('version.version') + ' ' + versionId.count, { size: 180 })
  ]

  return (
    <Space
      align="center"
      direction="vertical"
      size="large"
      style={ { maxWidth: 600 } }
    >
      <Flex
        align="center"
        gap="small"
        justify="center"
        style={ { minHeight: 100 } }
      >
        <IconButton
          disabled={ firstVersion }
          icon={ 'left-outlined' }
          onClick={ onClickPrevious }
          type={ 'text' }
        />
        {imgSrc !== null
          ? (
            <PimcoreImage
              className={ 'image-slider__image' }
              src={ imgSrc }
              style={ { maxHeight: 500, maxWidth: 500 } }
            />
            )
          : null}

        <IconButton
          disabled={ lastVersion }
          icon={ 'right-outlined' }
          onClick={ onClickNext }
          type={ 'text' }
        />
      </Flex>

      <Flex
        className="w-full"
        justify='center'
      >
        <Grid
          autoWidth
          columns={ columns }
          data={ data }
        />
      </Flex>
    </Space>
  )
}
