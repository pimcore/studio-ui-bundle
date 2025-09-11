import { FormKit } from "@Pimcore/components/form/form-kit"
import { useTranslation } from "react-i18next"
import React from 'react'
import { useClassDefinitions } from "@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions"
import { Form } from "@Pimcore/components/form/form"
import { useStyles } from './allowed-objects-panel.styles'
import { Switch } from "@Pimcore/components/switch/switch"
import { uniqueId } from "lodash"

export const AllowedObjectsPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { getClassDefinitionsForCurrentUser } = useClassDefinitions()
  const { styles } = useStyles()

  return (
    <FormKit.Panel
      title={t('widget-editor.widget-form.allowed-objects.title')}
      collapsible
      collapsed={false}
    >
      <div className={styles.allowedObjectsGrid}>
        <Form.Group
          name={'classes'}
        >
          {getClassDefinitionsForCurrentUser().map(classDefinition => (
            <Form.Item
              key={uniqueId()}
              name={classDefinition.id}
            >
              <Switch
                labelRight={classDefinition.name}
              />
            </Form.Item>
          ))}
        </Form.Group>
      </div>
    </FormKit.Panel>
  )
}