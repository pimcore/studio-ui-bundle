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
import { Content, FormKit } from '@sdk/components'
import { useDebounce } from '@sdk/utils'
import { isNil } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PADDING = { x: 'small', bottom: 'small', top: 'none' } as const

export const GeneralSettingsForm = (): React.JSX.Element => {
  const { generalSettings, setGeneralSettings } = useGeneralSettings()
  const { GeneralSettingsFormFields } = useSettings()
  const [formValues, setFormValues] = useState(generalSettings)
  const debouncedValues = useDebounce(formValues, 300)
  const isUpdatingFromFormRef = useRef(false)

  useEffect(() => {
    if (!isNil(debouncedValues) && debouncedValues !== generalSettings) {
      isUpdatingFromFormRef.current = true
      setGeneralSettings(debouncedValues)
    }
  }, [debouncedValues, generalSettings, setGeneralSettings])

  useEffect(() => {
    if (!isUpdatingFromFormRef.current && generalSettings !== formValues) {
      setFormValues(generalSettings)
    }
    isUpdatingFromFormRef.current = false
  }, [generalSettings])

  const handleValuesChange = useCallback((_, changedValues) => {
    setFormValues(changedValues)
  }, [])

  const formProps = useMemo(() => ({
    initialValues: formValues,
    onValuesChange: handleValuesChange
  }), [formValues, handleValuesChange])

  if (isNil(generalSettings)) {
    return (
      <Content
        centered
        padded
      >
        Loading general settings...
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
}
