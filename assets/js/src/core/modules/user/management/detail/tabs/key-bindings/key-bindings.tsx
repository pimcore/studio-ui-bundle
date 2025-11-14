/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Col, Row, Alert, Flex } from 'antd'
import { isEmpty, startCase } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Button } from '@Pimcore/components/button/button'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import type { KeyBindingForAUser } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { renderKeyCombination } from '@Pimcore/modules/user/management/detail/tabs/key-bindings/helpers'
import {
  ALL_FIELDS,
  GENERAL_FIELDS,
  NAVIGATION_FIELDS,
  SEARCH_FIELDS,
  SEO_FIELDS,
  SYSTEM_FIELDS
} from '@Pimcore/modules/user/management/detail/tabs/key-bindings/constants'

const BUNDLES = 'bundles'

export interface KeyBinding {
  action: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  key?: number
}
interface IKeyBindings {
  values?: KeyBindingForAUser[]
  modified?: boolean
  onResetKeyBindings: (items) => void
  onChange: (name: string, code: object) => void
}

const KeyBindings = ({ values, modified, onChange, onResetKeyBindings, ...props }: IKeyBindings): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { getDefaultKeyBindings } = useUserManagementHelper()

  const handleInputChange = (evt: any, name: string): object | boolean => {
    const key = evt.keyCode
    evt.preventDefault()

    const code = {
      action: name,
      ctrl: false,
      alt: false,
      shift: false,
      key
    }

    if (key === 9 || key === 8 || key === 27 || key === 46) {
      return false
    }
    code.ctrl = evt.ctrlKey
    code.alt = evt.altKey
    code.shift = evt.shiftKey

    form.setFieldsValue({
      [name]: renderKeyCombination(code)
    })
    onChange(name, code)
    return code
  }

  useEffect(() => {
    if (isEmpty(values)) {
      return
    }

    values?.forEach((keyBinding: any) => {
      form.setFieldsValue({
        [keyBinding.action]: renderKeyCombination(keyBinding)
      })
    })
  }, [values, modified])

  const bundleFields = !isEmpty(values)
    ? values?.map((v) => v.action)?.filter((action) => !ALL_FIELDS.includes(action))
    : []

  const getAccordionItem = (title: string, fields: string[]): {
    key: string
    title: React.ReactElement
    children: React.ReactElement
  } => ({
    key: title,
    title: <>{t(`key-bindings.${title}`)}</>,
    children: (
      <Row gutter={ [40, 0] }>
        {fields.map((field) => {
          const label = title !== BUNDLES ? t(`key-bindings.${field}`) : startCase(field)

          return (
            <Col
              key={ field }
              span={ 12 }
            >
              <Form.Item
                label={ label }
                name={ field as any }
              >
                <Input onKeyDown={ (evt) => handleInputChange(evt, field) } />
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    )
  })

  const accordions = [
    getAccordionItem('general', GENERAL_FIELDS),
    getAccordionItem('navigation', NAVIGATION_FIELDS),
    getAccordionItem('search', SEARCH_FIELDS),
    getAccordionItem('system', SYSTEM_FIELDS),
    getAccordionItem('seo', SEO_FIELDS),
    ...(!isEmpty(bundleFields) ? [getAccordionItem(BUNDLES, bundleFields!)] : [])
  ]

  const setKeyBindingsToDefault = (): void => {
    getDefaultKeyBindings().then((data) => {
      onResetKeyBindings(data.items)

      data.items.forEach((keyBinding: any) => {
        form.setFieldsValue({
          [keyBinding.action]: renderKeyCombination(keyBinding)
        })
      })
    }).catch((error) => {
      console.error('Error fetching default key bindings:', error)
    })
  }

  return (
    <Form
      form={ form }
      layout="vertical"
    >
      <Row gutter={ [10, 10] }>
        <Col span={ 14 }>
          <Flex
            align={ 'center' }
            justify={ 'space-between' }
          >
            <Alert
              message={ t('key-bindings.info') }
              showIcon
              type={ 'info' }
            />

            <Button onClick={ setKeyBindingsToDefault }>{ t('key-bindings.reset') }</Button>
          </Flex>
        </Col>
        {accordions.map((item) => (
          <Col
            key={ item.key }
            span={ 14 }
          >
            <Accordion
              activeKey={ accordions.map(item => item.key) }
              bordered
              items={ [item] }
              size={ 'small' }
            />
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export { KeyBindings }
