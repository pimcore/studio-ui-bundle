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
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { Form, Popconfirm } from 'antd'
import { Box } from '@sdk/components'
import { ManyToOneRelationInput } from '@Pimcore/components/many-to-one-relation/many-to-one-relation-input'
import { useSearchReplaceAssignments } from '../../providers/search-replace-assignments/search-replace-assignments-provider'
import { Alert } from '@Pimcore/components/alert/alert'

export const SearchReplaceForm = (): React.JSX.Element => {
  const {
    searchFor,
    replaceWith,
    handleSearchForChange,
    handleReplaceWithChange,
    handleSearch,
    handleApplyToAll,
    isFormValid,
    hasHidden
  } = useSearchReplaceAssignments()
  const [form] = Form.useForm()

  return (
    <>
      <Toolbar
        justify="space-between"
        padding={ {
          left: 'small',
          right: 'extra-small'
        } }
        theme="secondary"
      >
        <Title>{t('widget.search-replace-assignments')}</Title>
      </Toolbar>
      <Content>
        <Box margin={ { x: 'small', bottom: 'small' } }>

          <Form
            colon={ false }
            form={ form }
            labelAlign="left"
            labelCol={ { style: { width: '150px' } } }
            layout="horizontal"
            style={ { marginBottom: 0 } }
          >
            <Form.Item
              label={ <Title>{t('search-replace-assignments.search-for')}</Title> }
              name="searchFor"
            >
              <Flex gap="extra-small">
                <div style={ { width: '600px' } }>
                  <ManyToOneRelationInput
                    assetsAllowed
                    dataObjectsAllowed
                    documentsAllowed
                    enableSearch
                    onChange={ handleSearchForChange }
                    value={ searchFor }
                  />
                </div>
                <Button
                  disabled={ searchFor === null }
                  onClick={ handleSearch }
                  type="default"
                >{t('search-replace-assignments.search')}
                </Button>
              </Flex>
            </Form.Item>
            <Form.Item
              label={ <Title>{t('search-replace-assignments.replace-with')}</Title> }
              name="replaceWith"
              style={ { marginBottom: 0 } }
            >
              <Flex gap="extra-small">
                <div style={ { width: '600px' } }>
                  <ManyToOneRelationInput
                    assetsAllowed
                    dataObjectsAllowed
                    documentsAllowed
                    enableSearch
                    onChange={ handleReplaceWithChange }
                    value={ replaceWith }
                  />
                </div>
                <Popconfirm
                  cancelText={ t('cancel') }
                  description={ t('search-replace-assignments.confirm.description') }
                  okText={ t('button.confirm') }
                  onConfirm={ handleApplyToAll }
                  overlayStyle={ { maxWidth: '350px' } }
                  title={ t('search-replace-assignments.confirm.title') }
                >
                  <Button
                    disabled={ !isFormValid }
                    type="primary"
                  >
                    {t('search-replace-assignments.apply-to-all')}
                  </Button>
                </Popconfirm>
              </Flex>
            </Form.Item>
          </Form>

          {hasHidden && (
            <Box margin={ { top: 'small' } }>
              <Alert
                banner
                message={ t('hidden-dependencies-warning') }
                type="warning"
              />
            </Box>
          )}
        </Box>
      </Content>
    </>
  )
}
