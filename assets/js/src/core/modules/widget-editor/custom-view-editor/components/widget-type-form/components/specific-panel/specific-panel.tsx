import { FormKit } from "@Pimcore/components/form/form-kit"
import { ElementTypeSelect } from "../../../element-type-select/element-type-select"
import { Form } from "@Pimcore/components/form/form"
import React from "react"
import { useTranslation } from "react-i18next"
import { useWidgetFormContext } from "../../context/hooks/use-widget-form-context"
import { ManyToOneRelation, ManyToOneRelationValueType } from "@Pimcore/components/many-to-one-relation/many-to-one-relation"
import { Switch } from "@Pimcore/components/switch/switch"

export const SpecificPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useWidgetFormContext()

  return (
    <FormKit.Panel
      collapsible
      collapsed={false}
      title={t('widget-editor.widget-form.specific.title')}
    >
      <Form.Item
        label={t('widget-editor.widget-form.specific.element-type')}
        name="elementType"
      >
        <ElementTypeSelect />
      </Form.Item>

      <Form.Item
        label={t('widget-editor.widget-form.specific.root-folder')}
        name="rootFolder"
      >
        <ManyToOneRelation
          onChange={(value: ManyToOneRelationValueType) => {
            form.setFieldValue('rootFolder', value?.fullPath || null)
          }}
          allowToClearRelation
          assetInlineDownloadAllowed
          assetsAllowed
          dataObjectsAllowed
          documentsAllowed
        />
      </Form.Item>

      <Form.Item
        name="showRoot"
      >
        <Switch labelRight={t('widget-editor.widget-form.specific.show-root')} />
      </Form.Item>
    </FormKit.Panel>
  )
}