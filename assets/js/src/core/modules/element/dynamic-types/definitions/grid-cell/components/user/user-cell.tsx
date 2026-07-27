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
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'

export interface UserCellProps extends DefaultCellProps {}

export const UserCell = (props: UserCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data: userList } = useUserGetCollectionQuery()

  const getLabel = (): string => {
    const userId = props.getValue() as number | null | undefined

    if (isNil(userId)) {
      return ''
    }

    if (userId === 0) {
      return t('system-information.system')
    }

    const user = userList?.items.find((item) => item.id === userId)

    return user?.username ?? t('system-information.user-unknown')
  }

  return (
    <div className="default-cell__content default-cell__content--padded">
      { getLabel() }
    </div>
  )
}
