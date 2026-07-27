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
import { isNil } from 'lodash'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useUserCollection } from '@Pimcore/modules/user/user-collection/user-collection-provider'

export interface UserCellProps extends DefaultCellProps {}

export const UserCell = (props: UserCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { isFetched, getUsernameById } = useUserCollection()

  const getLabel = (): string => {
    const userId = props.getValue() as number | null | undefined

    if (isNil(userId)) {
      return ''
    }

    if (userId === 0) {
      return t('system-information.system')
    }

    // While the collection is still loading, stay blank rather than claiming the user is unknown.
    if (!isFetched) {
      return ''
    }

    return getUsernameById(userId) ?? t('system-information.user-unknown')
  }

  return (
    <div className="default-cell__content default-cell__content--padded">
      { getLabel() }
    </div>
  )
}
