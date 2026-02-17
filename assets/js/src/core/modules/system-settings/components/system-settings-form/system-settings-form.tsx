import { FormKit } from "@Pimcore/components/form/form-kit";
import { SettingsUpdateApiArg } from "@Pimcore/modules/app/settings/settings-slice-enhanced";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSystemSettingsContext } from "../../context/hooks/use-system-settings-context";
import { useSystemSettings } from "../../hooks/use-system-settings";
import { getInitialFormValues } from "../../util/format-helper";
import { DebugCollapse } from "./components/debug-collapse/debug-collapse";
import { LocalizationCollapse } from "./components/localization-collapse/localization-collapse";
import { VersionCollapse } from "./components/version-collapse/version-collapse";
import { WebsiteCollapse } from "./components/website-collapse/website-collapse";

export type SystemSettingsForm = SettingsUpdateApiArg['body'] & {
  email: object
}

export const SystemSettingsForm = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { form, isLoading, setIsLoading } = useSystemSettingsContext()
  const { updateSettings } = useSystemSettings()
  const initialValues = getInitialFormValues()

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        onFinish: (values: SystemSettingsForm) => {
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
      }}
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