import { Button } from "@Pimcore/components/button/button"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { Form } from "@Pimcore/components/form/form"
import { FormKit } from "@Pimcore/components/form/form-kit"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { IconSelector } from "@Pimcore/components/icon-selector/icon-selector"
import { Input } from "@Pimcore/components/input/input"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { CreatePerspectiveConfig, PerspectiveConfigDetail } from "@sdk/api/perspectives"
import React from "react"
import { useTranslation } from "react-i18next"
import { usePerspectiveEditorContext } from "../../context/hooks/use-perspective-editor-context"
import { usePerspectiveEditor } from "../../hooks/use-perspective-editor"
import { AllowedMenuEntriesPanel } from "./components/allowed-menu-entries-panel/allowed-menu-entries-panel"
import { SpecificPanel } from "./components/specific-panel/specific-panel"
import { ExtendedWidgetConfig } from "./components/widget-configurator/context/widget-configurator-provider"

interface PerspectiveForm {
  perspective: PerspectiveConfigDetail
}

interface OptimizedPerspectiveConfigDetail extends Omit<PerspectiveConfigDetail, 'widgetsLeft' | 'widgetsRight' | 'widgetsBottom'> {
  widgetsLeft: ExtendedWidgetConfig
  widgetsRight: ExtendedWidgetConfig
  widgetsBottom: ExtendedWidgetConfig
}

export const PerspectiveForm = ({ perspective }: PerspectiveForm): React.JSX.Element => {
  const { t } = useTranslation()
  const { updatePerspective, removeWithConfirmation } = usePerspectiveEditor()
  const { isLoading, setIsLoading, setPerspectives } = usePerspectiveEditorContext()
  const [form] = Form.useForm<PerspectiveForm>()
  const initialValues = {
    ...perspective,
    widgetsLeft: {
      widgets: perspective.widgetsLeft,
      expanded: perspective.expandedLeft
    },
    widgetsRight: {
      widgets: perspective.widgetsRight,
      expanded: perspective.expandedRight
    },
    widgetsBottom: {
      widgets: perspective.widgetsBottom
    }
  }

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        onFinish: async (values: OptimizedPerspectiveConfigDetail) => {
          setIsLoading(true)

          const { widgetsLeft, widgetsRight, widgetsBottom, ...rest } = values

          const formattedValues: CreatePerspectiveConfig = {
            ...rest,
            widgetsLeft: Object.fromEntries(widgetsLeft.widgets.map(w => [w.id, w.widgetType])),
            expandedLeft: widgetsLeft.expanded,
            widgetsRight: Object.fromEntries(widgetsRight.widgets.map(w => [w.id, w.widgetType])),
            expandedRight: widgetsRight.expanded,
            widgetsBottom: Object.fromEntries(widgetsBottom.widgets.map(w => [w.id, w.widgetType])),
          }

          console.table(values)
          console.log(values)

          await updatePerspective(perspective.id, formattedValues, () => {
            setIsLoading(false)
          })
        }
      }}
    >
      <Flex
        className='makeTabsGreatAgain'
        justify='space-between'
        vertical
      >
        <Content
          padded
          padding={{
            x: 'small',
            y: 'none'
          }}
        >
          <FormKit.Panel
            collapsed={false}
            collapsible
            title={t('perspective-editor.form.general.title')}
          >
            <Form.Item
              label="Name"
              name="name"
              required
            >
              <Input
                placeholder={t('perspective-editor.form.name.placeholder')}
              />
            </Form.Item>

            <Form.Item
              label="Icon"
              name="icon"
            >
              <IconSelector />
            </Form.Item>
          </FormKit.Panel>

          <SpecificPanel />
          <AllowedMenuEntriesPanel />
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              disabled={isLoading}
              icon={{ value: 'refresh' }}
              onClick={() => {
                form.resetFields()
                form.setFieldsValue(initialValues)
              }}
              title={t('refresh')}
            />

            <IconButton
              disabled={isLoading}
              icon={{ value: 'trash' }}
              onClick={() => {
                removeWithConfirmation(perspective.id, () => {
                  setPerspectives((prev) => prev.filter((p) => p.id !== perspective.id))
                })
              }}
              title={t('delete')}
            />
          </div>

          <Button
            htmlType='submit'
            loading={isLoading}
            type='primary'
          >
            {t('save')}
          </Button>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}