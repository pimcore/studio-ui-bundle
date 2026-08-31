/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { Content } from '@Pimcore/components/content/content'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { ParentSelector, type ParentSelectorValue } from './parent-selector'
import { useStyles } from './create-object-form.styles'

export interface CreateObjectFormValues {
  classId: string
  key: string
  parent: ParentSelectorValue
}

export interface CreateObjectFormProps extends FormProps {
  classes: ClassDefinitionListItem[]
  isLoading: boolean
}

export const CreateObjectForm = ({ classes, isLoading, ...props }: CreateObjectFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  if (isLoading) {
    return <Content loading />
  }

  return (
    <Form
      className={ styles.form }
      layout="vertical"
      { ...props }
    >
      { classes.length > 1 && (
        <Form.Item
          label={ t('relations.create-object.class') }
          name="classId"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Select
            options={ classes.map(({ id, name }) => ({ value: id, label: t(name) })) }
            placeholder={ t('select') }
          />
        </Form.Item>
      ) }

      <Form.Item
        label={ t('relations.create-object.name') }
        name="key"
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('relations.create-object.parent') }
        name="parent"
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <ParentSelector />
      </Form.Item>
    </Form>
  )
}
