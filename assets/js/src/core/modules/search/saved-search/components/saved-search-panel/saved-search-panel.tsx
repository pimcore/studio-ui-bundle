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
import { isArray, isEmpty, isNil, isString } from 'lodash'
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
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
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

interface LiveArgs { classId?: string, body?: { columns?: unknown, filters?: unknown } }

const elementTypeOf = (configuration: SavedSearchDetailedConfiguration): ElementType =>
  isString(configuration.classId) && !isEmpty(configuration.classId) ? elementTypes.dataObject : elementTypes.asset

const toNumberArray = (value: unknown): number[] => (isArray(value) ? value as number[] : [])

const signatureOf = (columns: unknown, filter: unknown): string => JSON.stringify({ columns: columns ?? null, filter: filter ?? null })

type SaveColumns = SavedSearchSaveConfigurationApiArg['body']['columns']

// The search request column shape omits width, so merge it in from the selected columns (by key) —
// the same data grid configs persist — so the saved search keeps the user's column widths.
const withColumnWidths = (columns: SaveColumns, selectedColumns: Array<{ key?: string, width?: number | null }>): SaveColumns => {
  const widthByKey = new Map(selectedColumns.map((column) => [column.key, column.width ?? null]))
  return columns.map((column) => ({ ...column, width: widthByKey.get((column as { key?: string }).key) ?? null })) as SaveColumns
}

export const SavedSearchPanel = ({ elementType, supportsLoadedState }: SavedSearchPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const user = useUser()
  const [form] = Form.useForm()

  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { dataLoadingState } = useData()
  const { selectedColumns } = useSelectedColumns()
  const { loadedSavedSearch, pendingRestore } = useSearch()

  const [isSharedGlobally, setIsSharedGlobally] = useState(defaultValues.shareGlobally ?? true)
  const [sharedUsers, setSharedUsers] = useState<number[]>([])
  const [sharedRoles, setSharedRoles] = useState<number[]>([])
  // Baseline signature of the search captured once its restored data has loaded; drives the dirty state.
  const [dirtyBaseline, setDirtyBaseline] = useState<string | undefined>(undefined)

  // The saved search loaded into this listing, if it belongs to this tab's element type.
  const loaded = supportsLoadedState && !isNil(loadedSavedSearch) && elementTypeOf(loadedSavedSearch) === elementType
    ? loadedSavedSearch
    : undefined
  const isOwner = !isNil(loaded) && loaded.ownerId === user?.id

  const liveArgs = (getArgs() ?? {}) as LiveArgs
  const liveColumns = withColumnWidths((liveArgs.body?.columns ?? []) as SaveColumns, selectedColumns)
  const liveFilter = liveArgs.body?.filters as SavedSearchSaveConfigurationApiArg['body']['filter']
  const currentSignature = signatureOf(liveColumns, liveFilter)

  // Live-vs-baseline comparison (both request-shaped). Treated as dirty until the baseline is captured.
  const isDirty = !isNil(loaded) && (isNil(dirtyBaseline) || currentSignature !== dirtyBaseline)

  useEffect(() => {
    setDirtyBaseline(undefined)
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
    setSharedUsers(toNumberArray(loaded.sharedUsers))
    setSharedRoles(toNumberArray(loaded.sharedRoles))
  }, [loaded?.id])

  // Capture the baseline only after the restore has been applied (pendingRestore cleared) and the
  // restored data has loaded — otherwise it would snapshot the pre-restore state.
  useEffect(() => {
    if (!isNil(loaded) && isNil(pendingRestore) && dataLoadingState === 'data-available') {
      setDirtyBaseline((previous) => previous ?? currentSignature)
    }
  }, [loaded?.id, pendingRestore, dataLoadingState])

  const reset = (): void => {
    form.resetFields()
    setIsSharedGlobally(defaultValues.shareGlobally ?? true)
    setSharedUsers([])
    setSharedRoles([])
    setDirtyBaseline(undefined)
  }

  const { onSaveAsNew, onUpdate, onDelete, isSaving, isUpdating, isDeleting } = useSavedSearchMutations({
    form,
    loaded,
    classId: liveArgs.classId,
    columns: liveColumns,
    filter: liveFilter,
    isSharedGlobally,
    sharedUsers,
    sharedRoles,
    onReset: reset,
    onUpdated: () => { setDirtyBaseline(currentSignature) }
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
