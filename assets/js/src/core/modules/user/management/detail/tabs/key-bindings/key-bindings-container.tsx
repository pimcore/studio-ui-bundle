/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Input, Col, Row, Alert, Flex } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'
import { Content } from '@Pimcore/components/content/content'
import { Button } from '@Pimcore/components/button/button'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'

const KeyBindingsContainer = ({ ...props }): React.JSX.Element => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { id } = useUserContext()
  const { user, isLoading, updateUserKeyBinding, changeUserInState } = useUserDraft(id)
  const { resetUserKeyBindings, getDefaultKeyBindings } = useUserHelper()

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

  const setDataToForm = (data: any): void => {
    data.forEach((keyBinding: any) => {
      form.setFieldsValue({
        [keyBinding.action]: renderKeyCombination(keyBinding)
      })
    })
  }

  if (!isLoading) {
    if (user?.keyBindings?.length === 0) {
      getDefaultKeyBindings().then((data) => {
        setDataToForm(data.items)
        changeUserInState({ keyBindings: data.items })
      }).catch((error) => {
        console.error('error setting default key bindings', error)
      })
    }
    setDataToForm(user?.keyBindings)
  }
  if (isLoading) {
    return <Content loading></Content>
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
    updateUserKeyBinding(name, code)
    return code
  }

  const generalFields = ['save', 'publish', 'unpublish', 'rename', 'refresh']
  const generalAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.key-bindings.general') }</>,
      children: <Row gutter={ [40, 0] }>
        {generalFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`user-management.key-bindings.${field}`) }
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
      title: <>{ t('user-management.key-bindings.navigation') }</>,
      children: <Row gutter={ [40, 0] }>
        {navigationFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`user-management.key-bindings.${field}`) }
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
      title: <>{ t('user-management.key-bindings.seo') }</>,
      children: <Row gutter={ [40, 0] }>
        {seoFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`user-management.key-bindings.${field}`) }
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
      title: <>{ t('user-management.key-bindings.system') }</>,
      children: <Row gutter={ [40, 0] }>
        {systemFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`user-management.key-bindings.${field}`) }
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
      title: <>{ t('user-management.key-bindings.search') }</>,
      children: <Row gutter={ [40, 0] }>
        {searchFields.map((field) => (
          <Col
            key={ field }
            span={ 12 }
          >
            <Form.Item
              label={ t(`user-management.key-bindings.${field}`) }
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
              message={ t('user-management.key-bindings.info') }
              showIcon
              type={ 'info' }
            />

            <Button onClick={ async () => await resetUserKeyBindings(id) }>{ t('user-management.key-bindings.reset') }</Button>
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

export { KeyBindingsContainer }
