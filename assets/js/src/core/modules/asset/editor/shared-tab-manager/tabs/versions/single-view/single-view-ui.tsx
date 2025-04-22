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
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Flex } from 'antd'
import { type VersionIdentifiers } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { EmptyState } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/components/empty-state/empty-state'
import { VersionsFieldsList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list'

interface SingleVersionViewUiProps {
  versionId: VersionIdentifiers
  data: any[]
  imgSrc: string | null
  firstVersion: boolean
  lastVersion: boolean
  onClickPrevious: () => void
  onClickNext: () => void
  isImageVersion: boolean
  fileName?: string
}

export const SingleViewUi = ({
  versionId,
  data,
  imgSrc,
  firstVersion,
  lastVersion,
  onClickPrevious,
  onClickNext,
  isImageVersion,
  fileName
}: SingleVersionViewUiProps): React.JSX.Element => {
  return (
    <Flex
      gap="small"
      style={ { minWidth: '100%' } }
      vertical
    >
      <Flex
        align="center"
        gap="small"
        justify="center"
        style={ { minHeight: 100 } }
      >
        <IconButton
          disabled={ firstVersion }
          icon={ { value: 'chevron-left' } }
          onClick={ onClickPrevious }
          type={ 'text' }
        />
        {imgSrc !== null && isImageVersion
          ? (
            <PimcoreImage
              className={ 'image-slider__image' }
              src={ imgSrc }
              style={ { maxHeight: 500, maxWidth: 500 } }
            />
            )
          : (
            <EmptyState
              fileName={ fileName }
              id={ versionId.id }
            />
            )}

        <IconButton
          disabled={ lastVersion }
          icon={ { value: 'chevron-right' } }
          onClick={ onClickNext }
          type={ 'text' }
        />
      </Flex>

      <VersionsFieldsList data={ data } />
    </Flex>
  )
}
