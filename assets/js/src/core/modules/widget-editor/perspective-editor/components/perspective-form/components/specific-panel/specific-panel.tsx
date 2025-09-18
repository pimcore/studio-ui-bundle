import React from 'react'
import { FormKit } from "@Pimcore/components/form/form-kit"
import { useTranslation } from "react-i18next"
import { WidgetConfigurator } from '../widget-configurator/widget-configurator'

export const SpecificPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      collapsed={false}
      collapsible
      title={t('perspective-editor.form.specific.title')}
    >
      <WidgetConfigurator />
    </FormKit.Panel>
  )
}