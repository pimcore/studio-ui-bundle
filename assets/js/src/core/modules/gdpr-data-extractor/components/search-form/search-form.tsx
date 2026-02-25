/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnFilter, type NumberColumnFilter, type StringColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { Button, Flex, Form, FormKit, Input } from '@sdk/components'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle } from './search-form.styles'

interface GdprSearchFormValues {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
}

interface SearchFormProps {
  onSearch?: (filters: ColumnFilter[]) => void
  onValueChange?: (filters: ColumnFilter[]) => void
  isLoading?: boolean
}

export const SearchForm = ({ onSearch, onValueChange, isLoading }: SearchFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [form] = Form.useForm()
  const initialValues: GdprSearchFormValues = {}

  const createSearchFilters = (values: GdprSearchFormValues): ColumnFilter[] => {
    const newSearchFilters: ColumnFilter[] = []
    Object.entries(values).forEach(([key, value]) => {
      if (!isNil(value) && value.length > 0) {
        const columnFilter: ColumnFilter = key === 'id'
          ? { type: key, filterValue: Number(value) } satisfies NumberColumnFilter
          : { type: key, filterValue: value } satisfies StringColumnFilter

        newSearchFilters.push(columnFilter)
      }
    })

    return newSearchFilters
  }

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        layout: 'horizontal',
        className: styles.form,
        onValuesChange: (_, values) => {
          onValueChange?.(createSearchFilters(values as GdprSearchFormValues))
        },
        onFinish: (values: GdprSearchFormValues) => {
          onSearch?.(createSearchFilters(values))
        }
      } }
    >
      <Form.Item
        label={ t('gdpr-extractor.search-form.field.id') }
        name={ ['id'] }
      >
        <Input data-testid="gdpr-search-id-input" />
      </Form.Item>

      <Form.Item
        label={ t('gdpr-extractor.search-form.field.firstname') }
        name={ ['firstname'] }
      >
        <Input data-testid="gdpr-search-firstname-input" />
      </Form.Item>

      <Form.Item
        label={ t('gdpr-extractor.search-form.field.lastname') }
        name={ ['lastname'] }
      >
        <Input data-testid="gdpr-search-lastname-input" />
      </Form.Item>

      <Flex
        align="end"
        gap={ 'extra-small' }
      >
        <Form.Item
          label={ t('gdpr-extractor.search-form.field.email') }
          name={ ['email'] }
        >
          <Input data-testid="gdpr-search-email-input" />
        </Form.Item>

        <Button
          data-testid="gdpr-search-submit-button"
          htmlType="submit"
          loading={ isLoading }
          type="primary"
        >
          {t('gdpr-extractor.search-form.submit')}
        </Button>
      </Flex>
    </FormKit>
  )
}
