import { Button } from "@Pimcore/components/button/button";
import { Content } from "@Pimcore/components/content/content";
import { Flex } from "@Pimcore/components/flex/flex";
import { FormKit } from "@Pimcore/components/form/form-kit";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import { Toolbar } from "@Pimcore/components/toolbar/toolbar";
import React from "react";
import { useTranslation } from "react-i18next";
import { useWidgetEditorContext } from "../../context/hooks/use-widget-editor-context";
import { useWidgetEditor } from "../../hooks/use-widget-editor";
import { GeneralTab } from "./components/general-tab/general-tab";
import { useWidgetFormContext } from "./context/hooks/use-widget-form-context";

interface WidgetFormProps {
  form: React.ComponentType
}

export const WidgetForm = ({ form: TypeSpecificForm }: WidgetFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { form, widget } = useWidgetFormContext()  //Todo: check if its better to use formData.id
  const { isLoading, setWidgets, setIsLoading } = useWidgetEditorContext()
  const { removeWithConfirmation, updateWidget } = useWidgetEditor()

  return (
    <FormKit
      formProps={{
        form,
        layout: "vertical",
        initialValues: {
          ...widget
        },
        onFinish: async (values: any) => {
          setIsLoading(true)
          console.table(values)
          updateWidget(widget.id, widget.widgetType, values, () => {
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
          <GeneralTab />
          <TypeSpecificForm />
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              disabled={isLoading}
              icon={{ value: 'refresh' }}
              onClick={() => {
                form.resetFields()
              }}
              title={t('refresh')}
            />

            <IconButton
              disabled={isLoading}
              icon={{ value: 'trash' }}
              onClick={() => {
                removeWithConfirmation(widget.id, widget.widgetType, () => {
                  setWidgets((prev) => prev.filter((w) => w.id !== widget.id))
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