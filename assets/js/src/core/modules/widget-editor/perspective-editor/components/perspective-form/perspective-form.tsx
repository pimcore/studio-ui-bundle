import { Button } from "@Pimcore/components/button/button"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { Form } from "@Pimcore/components/form/form"
import { FormKit } from "@Pimcore/components/form/form-kit"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { IconSelector } from "@Pimcore/components/icon-selector/icon-selector"
import { Input } from "@Pimcore/components/input/input"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { PerspectiveConfigDetail } from "@sdk/api/perspectives"
import React from "react"
import { useTranslation } from "react-i18next"
import { usePerspectiveEditorContext } from "../../context/hooks/use-perspective-editor-context"
import { usePerspectiveEditor } from "../../hooks/use-perspective-editor"
import { WidgetConfigurator } from "./widget-configurator/widget-configurator"

interface PerspectiveForm {
  perspective: PerspectiveConfigDetail
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
        onFinish: async (values: any) => {
          //setIsLoading(true)

          console.table(values)
          console.log(values)

          /*await updatePerspective(perspective.id, values, () => {
            setIsLoading(false)
          })*/
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
          <FormKit.Panel>
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

            <WidgetConfigurator />
          </FormKit.Panel>
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