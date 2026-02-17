import { CollapseItem, Form, Input, InputNumber } from "@sdk/components"
import { capitalize, isNil } from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"

interface VersionCollapseProps {
  dataType: string
}

export const VersionCollapse = ({ dataType }: VersionCollapseProps): React.JSX.Element => {
  const { t } = useTranslation()
  const daysValue = Form.useWatch([dataType, 'versions', 'days'])
  const stepsValue = Form.useWatch([dataType, 'versions', 'steps'])
  const hasDays = !isNil(daysValue) && daysValue !== ''
  const hasSteps = !isNil(stepsValue) && stepsValue !== ''

  return (
    <CollapseItem
      label={capitalize(dataType)}
      forceRender
    >
      <Form.Item
        label={t('system-settings.form.field.version-days')}
        name={[dataType, 'versions', 'days']}
      >
        <InputNumber disabled={hasSteps} />
      </Form.Item>

      <Form.Item
        label={t('system-settings.form.field.version-count')}
        name={[dataType, 'versions', 'steps']}
      >
        <InputNumber disabled={hasDays} />
      </Form.Item>
    </CollapseItem>
  )
}
