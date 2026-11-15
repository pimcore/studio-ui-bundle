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
import { Tag } from '@Pimcore/components/tag/tag'
import { type DormancyStatus, getDormancyStatus } from '../utils/dormancy'

interface ServiceUserStatusTagsProps {
  active: boolean
  lastLogin: number | null
  now: number
}

const DORMANCY_COLORS: Partial<Record<DormancyStatus, string>> = {
  'never-used': 'default',
  warning: 'warning',
  dormant: 'error'
}

export const ServiceUserStatusTags = ({ active, lastLogin, now }: ServiceUserStatusTagsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dormancy = getDormancyStatus(lastLogin, now)
  const dormancyColor = DORMANCY_COLORS[dormancy]

  return (
    <>
      {!active && <Tag color="default">{t('service-users.status.inactive')}</Tag>}
      {dormancyColor !== undefined && <Tag color={ dormancyColor }>{t(`service-users.dormancy.${dormancy}`)}</Tag>}
    </>
  )
}
