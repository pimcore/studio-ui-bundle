/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import type { SelectOptionDetail, SchemaUsedToUpdateSelectOptionConfigurations } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectOptionEditorContext } from '../../context/hooks/use-select-option-editor-context'
import { useSelectOptionEditor } from '../../hooks/use-select-option-editor'
import { SelectOptionGeneralSettingsFormFields } from '../select-option-editor/general-settings-form-fields'

export interface SelectOptionFormProps {
  selectOption: SelectOptionDetail
}

export const SelectOptionForm = ({ selectOption }: SelectOptionFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSelectOption, getSelectOptionById, removeWithConfirmation, isLoading } = useSelectOptionEditor()
  const { setSelectOptions, closeSelectOption } = useSelectOptionEditorContext()
  const [form] = Form.useForm<SelectOptionDetail>()
  const initialValues = {
    ...selectOption
  }
  const isWriteable = selectOption.isWriteable

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onFinish: async (values: SelectOptionDetail) => {
          const config: SchemaUsedToUpdateSelectOptionConfigurations = {
            group: values.group ?? null,
            adminOnly: values.adminOnly ?? false,
            useTraits: values.useTraits ?? '',
            implementsInterfaces: values.implementsInterfaces ?? '',
            selectOptions: values.selectOptions ?? []
          }

          await updateSelectOption(selectOption.id, config, async () => {
            const fresh = await getSelectOptionById(selectOption.id)
            if (fresh !== undefined) {
              setSelectOptions((prev) =>
                prev.map((s) => s.id === fresh.id ? fresh : s)
              )
              form.setFieldsValue(fresh)
            }
          })
        }
      } }
    >
      <Flex
        className='absolute-stretch'
        justify='space-between'
        vertical
      >
        <Content
          padded
          padding={ {
            x: 'small',
            y: 'none'
          } }
        >
          <SelectOptionGeneralSettingsFormFields />
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              disabled={ isLoading }
              icon={ { value: 'refresh' } }
              onClick={ async () => {
                const fresh = await getSelectOptionById(selectOption.id)
                if (fresh !== undefined) {
                  setSelectOptions((prev) =>
                    prev.map((s) => s.id === fresh.id ? fresh : s)
                  )
                  form.setFieldsValue(fresh)
                }
              } }
              title={ t('refresh') }
            />

            <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
              <IconButton
                disabled={ isLoading || !isWriteable }
                icon={ { value: 'trash' } }
                onClick={ () => {
                  removeWithConfirmation(selectOption.id, () => {
                    closeSelectOption(selectOption.id)
                    setSelectOptions((prev) => prev.filter((s) => s.id !== selectOption.id))
                  })
                } }
                title={ t('delete') }
              />
            </Tooltip>
          </div>

          <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
            <Button
              disabled={ !isWriteable }
              htmlType='submit'
              loading={ isLoading }
              type='primary'
            >
              {t('save')}
            </Button>
          </Tooltip>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}
