import { Flex } from "@Pimcore/components/flex/flex"
import { ManyToOneRelation } from "@Pimcore/components/many-to-one-relation/many-to-one-relation"
import { useSystemSettingsContext } from "@Pimcore/modules/system-settings/context/hooks/use-system-settings-context"
import { CollapseItem, Form, Input, Switch } from "@sdk/components"
import { isNil } from "lodash"
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ErrorPageCard } from "./components/error-page-card/error-page-card"

export const WebsiteCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useSystemSettingsContext()
  const validLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true })

  const languageErrorPageCards = useMemo(() => {
    if (isNil(validLanguages)) {
      return []
    }

    return validLanguages.map((locale: string) => (
      <ErrorPageCard
        key={locale}
        locale={locale}
      />
    ))
  }, [validLanguages])

  return (
    <CollapseItem
      label={t('system-settings.collapse.website')}
      forceRender
    >
      <Flex
        vertical
        gap="small"
      >
        <Flex
          vertical
          gap="extra-small"
        >
          <Form.Item
            label={t('system-settings.form.field.main-domain')}
            name={['general', 'domain']}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('system-settings.form.field.redirect-to-maindomain')}
            name={['general', 'redirect_to_maindomain']}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={t('system-settings.form.field.default-error-page')}
            name={['documents', 'error_pages', 'default']}
          >
            <ManyToOneRelation
              allowToClearRelation
              documentsAllowed
            />
          </Form.Item>
        </Flex>

        <Flex
          vertical
          gap="extra-small"
        >
          {languageErrorPageCards}
        </Flex>
      </Flex>
    </CollapseItem>
  )
}
