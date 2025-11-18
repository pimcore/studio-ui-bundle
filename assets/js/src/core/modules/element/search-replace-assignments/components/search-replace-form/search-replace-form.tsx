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
import { Form } from 'antd'
import { Box } from '@sdk/components'
import { ManyToOneRelationInput } from '@Pimcore/components/many-to-one-relation/many-to-one-relation-input'
import { useSearchReplace } from '../../providers/search-replace/search-replace-provider'

export const SearchReplaceForm = (): React.JSX.Element => {
  const {
    searchFor,
    replaceWith,
    handleSearchForChange,
    handleReplaceWithChange,
    handleApplyToAll,
    isFormValid
  } = useSearchReplace()
  const [form] = Form.useForm()

  return (
    <>
      <Toolbar
        justify="space-between"
        margin={ {
          x: 'mini',
          y: 'none'
        } }
        theme="secondary"
      >
        <Title>{t('widget.search-replace-assignments')}</Title>
      </Toolbar>
      <Content>
        <Box margin={ { x: 'small', bottom: 'small' } }>
          <Flex
            align="end"
            gap="small"
            justify="flex-start"
          >
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
                <ManyToOneRelationInput
                  assetsAllowed
                  dataObjectsAllowed
                  documentsAllowed
                  enableSearch
                  onChange={ handleSearchForChange }
                  value={ searchFor }
                />
              </Form.Item>
              <Form.Item
                label={ <Title>{t('search-replace-assignments.replace-with')}</Title> }
                name="replaceWith"
                style={ { marginBottom: 0, width: '600px' } }
              >
                <ManyToOneRelationInput
                  assetsAllowed
                  dataObjectsAllowed
                  documentsAllowed
                  enableSearch
                  onChange={ handleReplaceWithChange }
                  value={ replaceWith }
                />
              </Form.Item>
            </Form>
            <Button
              disabled={ !isFormValid }
              onClick={ handleApplyToAll }
              type="primary"
            >
              {t('search-replace-assignments.apply-to-all')}
            </Button>
          </Flex>
        </Box>
      </Content>
    </>
  )
}
