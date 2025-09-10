import { Form } from "@Pimcore/components/form/form"
import { FormKit } from "@Pimcore/components/form/form-kit"
import { ManyToOneRelation, ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation'
import React from 'react'
import { useTranslation } from "react-i18next"
import { ElementTypeSelect } from '../element-type-select/element-type-select'
import { AllowedObjectsPanel } from './components/allowed-objects-panel/allowed-objects-panel'
import { FilterPanel } from './components/filter-panel/filter-panel'
import { useWidgetFormContext } from './context/hooks/use-widget-form-context'
import { Checkbox } from "@Pimcore/components/checkbox/checkbox"
import { Switch } from "@Pimcore/components/switch/switch"
import { AllowedContextMenuPanel } from "./components/allowed-context-menu/allowed-context-menu"

export const ElementTreeWidgetTypeForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useWidgetFormContext()

  return (
    <>
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

      <AllowedObjectsPanel />
      <AllowedContextMenuPanel />
      <FilterPanel />
    </>
  )
}