/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@Pimcore/components/form/form-kit'
import { type SettingsUpdateApiArg } from '@Pimcore/modules/app/settings/settings-slice-enhanced'
import React from 'react'
import { useSystemSettingsContext } from '../../context/hooks/use-system-settings-context'
import { useSystemSettings } from '../../hooks/use-system-settings'
import { getInitialFormValues } from '../../util/format-helper'
import { DebugCollapse } from './components/debug-collapse/debug-collapse'
import { LocalizationCollapse } from './components/localization-collapse/localization-collapse'
import { VersionCollapse } from './components/version-collapse/version-collapse'
import { WebsiteCollapse } from './components/website-collapse/website-collapse'

export type SystemSettingsFormValues = SettingsUpdateApiArg['body'] & {
  email: object
}

export const SystemSettingsForm = (): React.JSX.Element => {
  const { form, setIsLoading } = useSystemSettingsContext()
  const { updateSettings } = useSystemSettings()
  const initialValues = getInitialFormValues()

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onFinish: (values: SystemSettingsFormValues) => {
          const requiredLanguages = form.getFieldValue(['general', 'required_languages']) ?? []
          const validLanguages = form.getFieldValue(['general', 'valid_languages']) ?? []

          const updatedValues = {
            ...values,
            general: {
              ...values.general,
              valid_languages: validLanguages,
              required_languages: requiredLanguages
            }
          }

          setIsLoading(true)
          void updateSettings(updatedValues, () => {
            setIsLoading(false)
          })
        }
      } }
    >
      <LocalizationCollapse />
      <DebugCollapse />
      <WebsiteCollapse />
      <VersionCollapse dataType="documents" />
      <VersionCollapse dataType="objects" />
      <VersionCollapse dataType="assets" />
    </FormKit>
  )
}
