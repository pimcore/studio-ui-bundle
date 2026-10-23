/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '@Pimcore/components/title/title'
import { Content } from '@sdk/components'
import { usePropertiesInitialization } from '@Pimcore/modules/element/hooks/use-properties-initialization'
import { isUndefined } from 'lodash'
import { NavigationForm } from './navigation-form'

export const NavigationSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { data: propertiesData, isLoading: isLoadingProperties } = usePropertiesInitialization()

  const initialValues = useMemo(() => {
    const getPropertyData = (key: string): any => {
      const property = propertiesData?.items?.find(prop => prop.key === key)
      return property?.data
    }

    return {
      navigation_name: getPropertyData('navigation_name') ?? '',
      navigation_title: getPropertyData('navigation_title') ?? '',
      navigation_target: getPropertyData('navigation_target') ?? '',
      navigation_exclude: getPropertyData('navigation_exclude') ?? false,
      navigation_relation: getPropertyData('navigation_relation') ?? '',
      navigation_class: getPropertyData('navigation_class') ?? '',
      navigation_anchor: getPropertyData('navigation_anchor') ?? '',
      navigation_parameters: getPropertyData('navigation_parameters') ?? '',
      navigation_accesskey: getPropertyData('navigation_accesskey') ?? '',
      navigation_tabindex: getPropertyData('navigation_tabindex') ?? ''
    }
  }, [propertiesData?.items])

  const isDataReady = !isLoadingProperties && !isUndefined(propertiesData)

  return (
    <Content
      loading={ !isDataReady }
      padded
      padding={ { top: 'extra-small', x: 'small', bottom: 'small' } }
    >
      <Title>{t('navigation.sidebar-title')}</Title>

      <NavigationForm
        initialValues={ initialValues }
      />
    </Content>
  )
}
