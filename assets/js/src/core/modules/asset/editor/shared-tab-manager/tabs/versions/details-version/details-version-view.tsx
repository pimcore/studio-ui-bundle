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
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-view.style'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'

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
  const { styles } = useStyles()

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor(i18n.t('field'), { size: 162, meta: { type: 'version-preview-field-label' } }),
    columnHelper.accessor(i18n.t('version.version') + ' ' + versionId.count, { size: 180 })
  ]

  return (
    <div className={ styles['right-side'] }>
      <div className={ 'image-slider' }>
        <Button
          disabled={ firstVersion }
          icon={ <Icon name={ 'left-outlined' } /> }
          onClick={ onClickPrevious }
          type={ 'text' }
        />
        {imgSrc !== null
          ? (
            <PimcoreImage
              className={ 'image-slider__image' }
              src={ imgSrc }
            />
            )
          : null}

        <Button
          disabled={ lastVersion }
          icon={ <Icon name={ 'right-outlined' } /> }
          onClick={ onClickNext }
          type={ 'text' }
        />

      </div>
      <Grid
        columns={ columns }
        data={ data }
      />
    </div>
  )
}
