/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import {
  useBundleSeoRedirectListTypesQuery,
  useBundleSeoRedirectListStatusesQuery,
  useBundleSeoRedirectListPrioritiesQuery
} from '../seo-api-slice-enhanced'
import { type SelectOptionType } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'

interface OptionsHookResult {
  isLoading: boolean
  options: SelectOptionType[]
}

export const useRedirectTypeOptions = (): OptionsHookResult => {
  const { t } = useTranslation()
  const { data, isLoading } = useBundleSeoRedirectListTypesQuery()

  return {
    isLoading,
    options: data?.types?.map(type => ({ label: t(type), value: type })) ?? []
  }
}

export const useRedirectStatusOptions = (): OptionsHookResult => {
  const { data, isLoading } = useBundleSeoRedirectListStatusesQuery()

  return {
    isLoading,
    options: data?.statuses?.map(status => ({
      label: `${status.code} - ${status.label}`,
      value: status.code
    })) ?? []
  }
}

export const useRedirectPriorityOptions = (): OptionsHookResult => {
  const { data, isLoading } = useBundleSeoRedirectListPrioritiesQuery()

  return {
    isLoading,
    options: data?.priorities?.map(priority => ({
      label: priority.toString(),
      value: priority
    })) ?? []
  }
}
