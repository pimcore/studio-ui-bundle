/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Col, Flex, Row } from 'antd'
import { isArray, isEmpty, isEqual, isNil, isString } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { Text } from '@Pimcore/components/text/text'
import { Button } from '@Pimcore/components/button/button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import {
  type SavedSearchSaveConfigurationApiArg,
  type SavedSearchDetailedConfiguration
} from '@Pimcore/modules/search/search-api-slice.gen'
import { useStyles } from './saved-search-panel.styles'
import { SavedSearchForm, defaultValues } from './saved-search-form'
import { useSavedSearchMutations } from './use-saved-search-mutations'

interface SavedSearchPanelProps {
  elementType?: ElementType
  supportsLoadedState: boolean
}

interface LiveArgs { classId?: string, body: { columns: unknown, filters?: unknown } }

const elementTypeOf = (configuration: SavedSearchDetailedConfiguration): ElementType =>
  isString(configuration.classId) && !isEmpty(configuration.classId) ? elementTypes.dataObject : elementTypes.asset

const normaliseFilter = (filter: SavedSearchDetailedConfiguration['filter']): unknown =>
  isArray(filter) ? (filter[0] ?? null) : (filter ?? null)

export const SavedSearchPanel = ({ elementType, supportsLoadedState }: SavedSearchPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const user = useUser()
  const [form] = Form.useForm()

  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { loadedSavedSearch } = useSearch()

  const [isSharedGlobally, setIsSharedGlobally] = useState(defaultValues.shareGlobally ?? true)
  const [sharedUsers, setSharedUsers] = useState<number[]>([])
  const [sharedRoles, setSharedRoles] = useState<number[]>([])

  // The saved search loaded into this listing, if it belongs to this tab's element type.
  const loaded = supportsLoadedState && !isNil(loadedSavedSearch) && elementTypeOf(loadedSavedSearch) === elementType
    ? loadedSavedSearch
    : undefined
  const isOwner = !isNil(loaded) && loaded.ownerId === user?.id

  // Pre-fill the form whenever the loaded saved search changes.
  useEffect(() => {
    if (isNil(loaded)) {
      form.setFieldsValue(defaultValues)
      setIsSharedGlobally(defaultValues.shareGlobally ?? true)
      setSharedUsers([])
      setSharedRoles([])
      return
    }
    form.setFieldsValue({
      name: loaded.name,
      description: loaded.description ?? '',
      createMenuShortcut: loaded.createMenuShortcut,
      shareGlobally: loaded.shareGlobal
    })
    setIsSharedGlobally(loaded.shareGlobal)
    setSharedUsers((loaded.sharedUsers as number[]) ?? [])
    setSharedRoles((loaded.sharedRoles as number[]) ?? [])
  }, [loaded?.id])

  const liveArgs = getArgs() as LiveArgs
  const liveColumns = liveArgs.body.columns as SavedSearchSaveConfigurationApiArg['body']['columns']
  const liveFilters = liveArgs.body.filters as SavedSearchSaveConfigurationApiArg['body']['filters']

  // Dirty = the live search (columns + filters) differs from the loaded snapshot.
  const isDirty = !isNil(loaded) && !isEqual(
    { columns: liveArgs.body.columns, filter: liveArgs.body.filters ?? null },
    { columns: loaded.columns, filter: normaliseFilter(loaded.filter) }
  )

  const reset = (): void => {
    form.resetFields()
    setIsSharedGlobally(defaultValues.shareGlobally ?? true)
    setSharedUsers([])
    setSharedRoles([])
  }

  const { onSaveAsNew, onUpdate, onDelete, isSaving, isUpdating, isDeleting } = useSavedSearchMutations({
    form,
    loaded,
    classId: liveArgs.classId,
    columns: liveColumns,
    filters: liveFilters,
    isSharedGlobally,
    sharedUsers,
    sharedRoles,
    onReset: reset
  })

  const renderActions = (): React.JSX.Element => {
    if (isNil(loaded)) {
      return (
        <Button
          data-testid='saved-search-save-button'
          loading={ isSaving }
          onClick={ onSaveAsNew }
          type='primary'
        >
          { t('saved-search.save-as-new') }
        </Button>
      )
    }

    if (isOwner) {
      return (
        <Space size='mini'>
          <Button
            data-testid='saved-search-update-button'
            disabled={ !isDirty }
            loading={ isUpdating }
            onClick={ onUpdate }
            type='primary'
          >
            { t('saved-search.update') }
          </Button>
          <Dropdown
            menu={ {
              items: [
                { key: 'save-as-new', label: t('saved-search.save-as-new'), onClick: onSaveAsNew },
                { key: 'delete', label: t('delete'), danger: true, onClick: onDelete }
              ]
            } }
          >
            <IconButton
              data-testid='saved-search-more-button'
              icon={ { value: 'more' } }
              loading={ isDeleting }
              tooltip={ { title: t('more') } }
              type='default'
            />
          </Dropdown>
        </Space>
      )
    }

    // Loaded a saved search owned by someone else — offer to clone it.
    return (
      <Button
        data-testid='saved-search-clone-button'
        loading={ isSaving }
        onClick={ onSaveAsNew }
        type='primary'
      >
        { t('saved-search.clone') }
      </Button>
    )
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <div />
          {renderActions()}
        </Toolbar>
      }
    >
      <Content padded>
        <Flex
          gap='small'
          vertical
        >
          <Flex
            align='center'
            gap='mini'
          >
            <Header title={ t('saved-search.title') } />
            {isDirty && <span className={ styles.dirtyDot } />}
          </Flex>

          { !isNil(loaded) && (
            <Row>
              <Col span={ 24 }>
                <Text>{t('common.owner')}:</Text> <Text type='secondary'>{user?.username}</Text>
              </Col>
              { !isNil(loaded.modificationDate) && (
                <Col span={ 24 }>
                  <Text>{t('common.modification-date')}: </Text>
                  <Text type='secondary'>
                    {formatDateTime({ timestamp: loaded.modificationDate, dateStyle: 'short', timeStyle: 'short' })}
                  </Text>
                </Col>
              )}
            </Row>
          )}

          { !isNil(loaded) && !isOwner && (
            <Alert
              description={ t('saved-search.shared-modified.info') }
              showIcon
              type='info'
            />
          )}

          <SavedSearchForm
            form={ form }
            isSharedGlobally={ isSharedGlobally }
            onSharedGloballyChange={ setIsSharedGlobally }
            onUsersRolesChange={ (changes) => {
              setSharedUsers(changes.sharedUsers)
              setSharedRoles(changes.sharedRoles)
            } }
            sharedRoles={ sharedRoles }
            sharedUsers={ sharedUsers }
          />
        </Flex>
      </Content>
    </ContentLayout>
  )
}
