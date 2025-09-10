import { Conditional } from "@Pimcore/components/form/conditional/conditional"
import { useWidgetTypeForm } from "../../hooks/use-widget-type-form"
import { useTranslation } from "react-i18next"
import React from "react"
import { FormKit } from "@Pimcore/components/form/form-kit"
import { Form } from "@Pimcore/components/form/form"
import { Switch } from "@Pimcore/components/switch/switch"
import { Spin } from "@Pimcore/components/spin/spin"
import { useStyles } from './allowed-context-menu.styles'
import { elementTypes } from "@Pimcore/types/enums/element/element-type"

export const DocumentContextMenuOptionsPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { documentContextMenuItems, isLoading } = useWidgetTypeForm()
  const { styles } = useStyles()

  if (isLoading) {
    return (
      <Conditional condition={(values) => values.elementType === elementTypes.document}>
        <FormKit.Panel
          title={t('widget-editor.widget-form.allowed-context-menu.title')}
          collapsible
          collapsed={false}
        >
          <Spin />
        </FormKit.Panel>
      </Conditional>
    )
  }

  return (
    <Conditional condition={(values) => values.elementType === elementTypes.document}>
      <FormKit.Panel
        title={t('widget-editor.widget-form.allowed-context-menu.title')}
        collapsible
        collapsed={false}
      >
        <div className={styles.allowedContextMenuOptions}>
          {documentContextMenuItems.map(permission => (
            <Form.Item
              key={permission}
              name={`contextPermissions[${permission}]`}
              valuePropName='checked'
            >
              <Switch
                labelRight={t('widget-editor.widget-form.allowed-context-menu.' + permission)}
              />
            </Form.Item>
          ))}
        </div>
      </FormKit.Panel>
    </Conditional >
  )
}