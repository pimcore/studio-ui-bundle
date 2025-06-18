/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {useEffect} from 'react'
import { Input, Col, Row, Alert, Flex } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import {useUserHelper} from "@Pimcore/modules/user/hooks/use-user-helper";

interface IKeyBindings {
    values?: any
  modified?: boolean
  onResetKeyBindings: (items) => void
  onChange: (name: string, code: object) => void
}

const KeyBindings = ({ values, modified, onChange, onResetKeyBindings, ...props }:IKeyBindings): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { getDefaultKeyBindings } = useUserHelper()

  const getKeyName = (key: number): string => {
    let name = ''
    if (key >= 112 && key <= 123) {
      name = 'F' + (key - 111)
    } else if (key === 32) {
      name = 'Space'
    } else {
      name = String.fromCharCode(key)
    }
    return name
  }

  const renderKeyCombination = (keyBinding: any): string => {
    return `${keyBinding.ctrl !== false ? 'Ctrl + ' : ''}${keyBinding.alt !== false ? 'Alt + ' : ''}${keyBinding.shift !== false ? 'Shift + ' : ''}${getKeyName(keyBinding.key as number)}`
  }

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
    if (!values || values.length === 0) {
      return
    }

    values.forEach((keyBinding: any) => {
      form.setFieldsValue({
        [keyBinding.action]: renderKeyCombination(keyBinding)
      })
    })
  }, [values, modified]);

  const generalFields = ['save', 'publish', 'unpublish', 'rename', 'refresh']
  const generalAccordion = [
    {
      key: '1',
      title: <>{ t('key-bindings.general') }</>,
      children: <Row gutter={ [40, 0] }>
        {generalFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`key-bindings.${field}`) }
              name={ field as any }
            >
              <Input
                onKeyDown={ (evt) => handleInputChange(evt, field) }
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    }
  ]

  const navigationFields = ['openDocument', 'openAsset', 'openObject', 'openClassEditor', 'openInTree', 'closeAllTabs']
  const navigationAccordion = [
    {
      key: '1',
      title: <>{ t('key-bindings.navigation') }</>,
      children: <Row gutter={ [40, 0] }>
        {navigationFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`key-bindings.${field}`) }
              name={ field as any }
            >
              <Input
                onKeyDown={ (evt) => handleInputChange(evt, field) }
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    }
  ]

  const seoFields = ['redirects', 'tagManager', 'tagConfiguration', 'seoDocumentEditor', 'robots']
  const seoAccordion = [
    {
      key: '1',
      title: <>{ t('key-bindings.seo') }</>,
      children: <Row gutter={ [40, 0] }>
        {seoFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`key-bindings.${field}`) }
              name={ field as any }
            >
              <Input
                onKeyDown={ (evt) => handleInputChange(evt, field) }
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    }
  ]

  const systemFields = ['showMetaInfo', 'showElementHistory', 'sharedTranslations', 'recycleBin', 'notesEvents', 'users', 'roles', 'clearAllCaches', 'clearDataCache', 'customReports', 'reports', 'applicationLogger', 'glossary', 'httpErrorLog']
  const systemAccordion = [
    {
      key: '1',
      title: <>{ t('key-bindings.system') }</>,
      children: <Row gutter={ [40, 0] }>
        {systemFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`key-bindings.${field}`) }
              name={ field as any }
            >
              <Input
                onKeyDown={ (evt) => handleInputChange(evt, field) }
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    }
  ]

  const searchFields = ['searchDocument', 'searchAsset', 'searchObject', 'searchAndReplaceAssignments', 'quickSearch']
  const searchAccordion = [
    {
      key: '1',
      title: <>{ t('key-bindings.search') }</>,
      children: <Row gutter={ [40, 0] }>
        {searchFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`key-bindings.${field}`) }
              name={ field as any }
            >
              <Input
                onKeyDown={ (evt) => handleInputChange(evt, field) }
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    }
  ]

  const setKeyBindingsToDefault = (): void => {
    getDefaultKeyBindings().then((data) => {
      onResetKeyBindings(data.items)

      data.items.forEach((keyBinding: any) => {
        form.setFieldsValue({
          [keyBinding.action]: renderKeyCombination(keyBinding)
        })
      })

    })
  }

  return (
      <Form form={ form } layout="vertical">
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
          <Col span={ 14 }>
            <Accordion
                activeKey={ '1' }
                bordered
                items={ generalAccordion }
                size={ 'small' }
            >
            </Accordion>
          </Col>
          <Col span={ 14 }>
            <Accordion
                activeKey={ '1' }
                bordered
                items={ navigationAccordion }
                size={ 'small' }
            >
            </Accordion>
          </Col>
          <Col span={ 14 }>
            <Accordion
                activeKey={ '1' }
                bordered
                items={ searchAccordion }
                size={ 'small' }
            >
            </Accordion>
          </Col>
          <Col span={ 14 }>
            <Accordion
                activeKey={ '1' }
                bordered
                items={ systemAccordion }
                size={ 'small' }
            >
            </Accordion>
          </Col>
          <Col span={ 14 }>
            <Accordion
                activeKey={ '1' }
                bordered
                items={ seoAccordion }
                size={ 'small' }
            >
            </Accordion>
          </Col>
        </Row>
      </Form>
  )
}

export { KeyBindings }
