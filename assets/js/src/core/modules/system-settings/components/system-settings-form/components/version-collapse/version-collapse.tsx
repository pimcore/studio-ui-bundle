import { CollapseItem, Form, Input } from "@sdk/components"
import { capitalize } from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"

interface VersionCollapseProps {
  dataType: string
}

export const VersionCollapse = ({ dataType }: VersionCollapseProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <CollapseItem
      label={capitalize(dataType)}
      forceRender
    >
      <Form.Item
        label={t('system-settings.form.field.version-days')}
        name={[dataType, 'versions', 'days']}
      >
        <Input
          type="number"
        />
      </Form.Item>

      <Form.Item
        label={t('system-settings.form.field.version-count')}
        name={[dataType, 'versions', 'steps']}
      >
        <Input
          type="number"
        />
      </Form.Item>
    </CollapseItem >
  )
}
