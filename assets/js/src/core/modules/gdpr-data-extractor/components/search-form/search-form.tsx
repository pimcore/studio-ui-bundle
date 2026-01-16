import { ColumnFilter, StringColumnFilter } from "@Pimcore/modules/app/types/column-filter"
import { Button, Flex, Form, FormKit, Input } from "@sdk/components"
import { isNil } from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"
import { useStyle } from "./search-form.styles"

interface GdprSearchFormValues {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
}

interface SearchFormProps {
  onSearch?: (filters: ColumnFilter[]) => void
}

export const SearchForm = ({ onSearch }: SearchFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [form] = Form.useForm()
  const initialValues: GdprSearchFormValues = {}

  return (
    <FormKit
      formProps={{
        form,
        initialValues,
        layout: 'horizontal',
        className: styles.form,
        onFinish: (values: GdprSearchFormValues) => {
          const newSearchFilters: ColumnFilter[] = []
          Object.entries(values).forEach(([key, value]) => {
            if (!isNil(value)) {
              const stringFilter: StringColumnFilter = {
                type: key,
                filterValue: value
              }
              newSearchFilters.push(stringFilter)
            }
          })

          onSearch?.(newSearchFilters)
        }
      }}
    >
      <Form.Item
        label={t('gdpr-extractor.search-form.field.id')}
        name={['id']}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('gdpr-extractor.search-form.field.firstname')}
        name={['firstname']}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('gdpr-extractor.search-form.field.lastname')}
        name={['lastname']}
      >
        <Input />
      </Form.Item>

      <Flex
        gap={'extra-small'}
        align="end"
      >
        <Form.Item
          label={t('gdpr-extractor.search-form.field.email')}
          name={['email']}
        >
          <Input />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
        >
          {t('gdpr-extractor.search-form.submit')}
        </Button>
      </Flex>
    </FormKit>
  )
}