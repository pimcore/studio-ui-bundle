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
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

interface IToolbarProps {
  isFetching: boolean
  refetch: () => void
}

export const Toolbar = ({ isFetching, refetch }: IToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ToolbarView>
      <Refetch
        isFetching={ isFetching }
        refetch={ refetch }
      />

      <IconTextButton
        icon={ { value: 'new' } }
        onClick={ () => { /* ToDo: Implement create new report functionality */ } }
        type="link"
      >
        {t('new')}
      </IconTextButton>
    </ToolbarView>
  )
}
