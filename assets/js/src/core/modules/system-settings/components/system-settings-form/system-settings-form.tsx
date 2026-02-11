import { FormKit } from "@Pimcore/components/form/form-kit";
import { SettingsUpdateApiArg } from "@Pimcore/modules/app/settings/settings-slice-enhanced";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSystemSettingsContext } from "../../context/hooks/use-system-settings-context";
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
  const initialValues = getInitialFormValues()

  console.log(initialValues)

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        onFinish: (values: SystemSettingsForm) => {
          /*const transformedValues = {
            ...initalValues,
            ...values,
            general: {
              ...values.general,
              fallback_languages: transformFallbackLanguagesForSubmit(values.general?.fallback_languages)
            }
          }*/
          console.log('form submitted', values)
        }
      }}
    >
      <LocalizationCollapse />
      <DebugCollapse />
      <WebsiteCollapse />
      <VersionCollapse dataType="objects" />
      <VersionCollapse dataType="assets" />
      <VersionCollapse dataType="documents" />
    </FormKit >
  )
}