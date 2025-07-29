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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface SingleVersionViewUiProps {
  versionId: VersionIdentifiers
  data: any[]
  firstVersion: boolean
  lastVersion?: boolean
  onClickPrevious: () => void
  onClickNext: () => void
}

export const SingleViewUi = ({
  versionId,
  data,
  firstVersion,
  lastVersion,
  onClickPrevious,
  onClickNext
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

        <IconButton
          disabled={ lastVersion }
          icon={ { value: 'chevron-right' } }
          onClick={ onClickNext }
          type={ 'text' }
        />
      </Flex>

      Content
    </Flex>
  )
}
