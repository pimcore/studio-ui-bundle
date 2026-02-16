/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Content, FormKit, type FormProps } from '@sdk/components'
import { useDebounce } from '@sdk/utils'
import { isNil } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const PADDING = { x: 'small', bottom: 'small', top: 'none' } as const

export const GeneralSettingsForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { generalSettings, setGeneralSettings } = useGeneralSettings()
  const { GeneralSettingsFormFields } = useSettings()
  const [formValues, setFormValues] = useState(generalSettings)
  const debouncedValues = useDebounce(formValues, 300)

  const handleValuesChange: FormProps['onValuesChange'] = useCallback((changedValues, allValues) => {
    setFormValues(allValues as typeof generalSettings)
  }, [])

  useEffect(() => {
    if (debouncedValues !== generalSettings) {
      setGeneralSettings(debouncedValues)
    }
  }, [debouncedValues])

  const formProps = useMemo(() => ({
    initialValues: generalSettings,
    onValuesChange: handleValuesChange
  }), [generalSettings])

  return useMemo(() => {
    if (isNil(generalSettings)) {
      return (
        <Content
          centered
          padded
        >
          {t('field-definitions.loading-general-settings')}
        </Content>
      )
    }

    return (
      <Content
        padded
        padding={ PADDING }
      >
        <FormKit formProps={ formProps }>
          <GeneralSettingsFormFields />
        </FormKit>
      </Content>
    )
  }, [generalSettings])
}
