import { ManyToOneRelation } from "@Pimcore/components/many-to-one-relation/many-to-one-relation"
import { getLanguageName } from "@Pimcore/utils/language"
import { Card, Form } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"

interface ErrorPageCardProps {
  locale: string
}

export const ErrorPageCard = ({ locale }: ErrorPageCardProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Card
      title={getLanguageName({ locale }) + ` (${locale})`}
    >
      <Form.Item
        label={t('system-settings.form.field.default-error-page')}
        name={['documents', 'error_pages', 'localized', locale]}
      >
        <ManyToOneRelation
          allowToClearRelation
          documentsAllowed
        />
      </Form.Item>
    </Card>
  )
}
