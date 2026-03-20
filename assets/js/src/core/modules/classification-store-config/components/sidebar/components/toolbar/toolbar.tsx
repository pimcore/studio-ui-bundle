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
import { useTranslation } from 'react-i18next'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Spin } from '@Pimcore/components/spin/spin'
import { Box } from '@Pimcore/components/box/box'

interface IToolbarProps {
  isFetching: boolean
  refetch: () => void
  handleStoreAdd: () => void
}

export const Toolbar = ({ isFetching, refetch, handleStoreAdd }: IToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ToolbarView>
      {isFetching
        ? (
          <Box padding={ { x: 'extra-small', y: 'extra-small' } }>
            <Spin />
          </Box>
          )
        : (
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ () => { refetch() } }
          />
          )}

      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ handleStoreAdd }
        type="link"
      >
        {t('new')}
      </IconTextButton>
    </ToolbarView>
  )
}
