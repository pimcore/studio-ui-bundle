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
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import {
  type SavedSearchSaveConfigurationApiArg,
  type SavedSearchDetailedConfiguration
} from '@Pimcore/modules/search/search-api-slice.gen'
import { useStyles } from './saved-search-panel.styles'
import { SavedSearchForm, type SavedSearchFormValues, defaultValues } from './saved-search-form'
import { useSavedSearchMutations } from './use-saved-search-mutations'

interface SavedSearchPanelProps {
  elementType?: ElementType
  supportsLoadedState: boolean
}

interface LiveArgs { classId?: string, body?: { filters?: unknown } }
type SaveColumns = SavedSearchSaveConfigurationApiArg['body']['columns']

const SEARCH_TERM_FILTER_TYPE = 'system.fulltext'

const elementTypeOf = (configuration: SavedSearchDetailedConfiguration): ElementType =>
  isString(configuration.classId) && !isEmpty(configuration.classId) ? elementTypes.dataObject : elementTypes.asset

const toNumberArray = (value: unknown): number[] => (isArray(value) ? value as number[] : [])

const sortedNumbers = (value: unknown): number[] => toNumberArray(value).slice().sort((a, b) => a - b)

// Compare only the user-controllable column attributes (presence, order and width).
const normaliseColumns = (columns: unknown): Array<{ key?: string, width: number | null }> =>
  (isArray(columns) ? columns : []).map((column) => ({
    key: (column as { key?: string })?.key,
    width: (column as { width?: number | null })?.width ?? null
  }))

const getSearchTerm = (filter: unknown): string => {
  const single = isArray(filter) ? filter[0] : filter
  const entries = (single as { columnFilters?: unknown })?.columnFilters
  const entry = isArray(entries)
    ? (entries as Array<{ type?: string, filterValue?: unknown }>).find((item) => item.type === SEARCH_TERM_FILTER_TYPE)
    : undefined
  return isString(entry?.filterValue) ? entry.filterValue : ''
}

export const SavedSearchPanel = ({ elementType, supportsLoadedState }: SavedSearchPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const user = useUser()
  const [form] = Form.useForm()

  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { selectedColumns } = useSelectedColumns()
  const { loadedSavedSearch } = useSearch()

  const [isSharedGlobally, setIsSharedGlobally] = useState(defaultValues.shareGlobally ?? true)
  const [sharedUsers, setSharedUsers] = useState<number[]>([])
  const [sharedRoles, setSharedRoles] = useState<number[]>([])
  const [formValues, setFormValues] = useState<SavedSearchFormValues>(defaultValues)

  // The saved search loaded into this listing, if it belongs to this tab's element type.
  const loaded = supportsLoadedState && !isNil(loadedSavedSearch) && elementTypeOf(loadedSavedSearch) === elementType
    ? loadedSavedSearch
    : undefined
  const isOwner = !isNil(loaded) && loaded.ownerId === user?.id

  // Persist the user's selected columns with their widths — the same data grid configs save.
  const liveColumns = selectedColumns.map((column) => ({
    key: column.key,
    locale: column.locale ?? null,
    group: (column.group ?? []) as string[],
    width: column.width ?? null
  })) as SaveColumns
  const liveArgs = (getArgs() ?? {}) as LiveArgs
  const liveFilter = liveArgs.body?.filters as SavedSearchSaveConfigurationApiArg['body']['filter']

  // Dirty state compared against the persisted saved search (so it survives the sidebar collapsing).
  // Scope intentionally matches what `useApplySavedSearch` restores on open — columns, the fulltext
  // search term and the metadata. Field filters, sorting and the type filter are not restored yet,
  // so they are deliberately excluded here: diffing them would make every opened search read as
  // permanently dirty and an Update would then persist a state that was never actually restored.
  // When restore is extended to cover them, extend this comparison in lockstep.
  const liveUsers = isSharedGlobally ? [] : sharedUsers
  const liveRoles = isSharedGlobally ? [] : sharedRoles
  const isDirty = !isNil(loaded) && (
    !isEqual(normaliseColumns(liveColumns), normaliseColumns(loaded.columns)) ||
    getSearchTerm(liveFilter) !== getSearchTerm(loaded.filter) ||
    (formValues.name ?? '') !== (loaded.name ?? '') ||
    (formValues.description ?? '') !== (loaded.description ?? '') ||
    (formValues.createMenuShortcut ?? false) !== loaded.createMenuShortcut ||
    (formValues.menuShortcutGroup ?? '') !== (loaded.menuShortcutGroup ?? '') ||
    isSharedGlobally !== loaded.shareGlobal ||
    !isEqual(sortedNumbers(liveUsers), sortedNumbers(loaded.shareGlobal ? [] : loaded.sharedUsers)) ||
    !isEqual(sortedNumbers(liveRoles), sortedNumbers(loaded.shareGlobal ? [] : loaded.sharedRoles))
  )

  useEffect(() => {
    if (isNil(loaded)) {
      form.setFieldsValue(defaultValues)
      setFormValues(defaultValues)
      setIsSharedGlobally(defaultValues.shareGlobally ?? true)
      setSharedUsers([])
      setSharedRoles([])
      return
    }
    const values: SavedSearchFormValues = {
      name: loaded.name,
      description: loaded.description ?? '',
      createMenuShortcut: loaded.createMenuShortcut,
      menuShortcutGroup: loaded.menuShortcutGroup ?? '',
      shareGlobally: loaded.shareGlobal
    }
    form.setFieldsValue(values)
    setFormValues(values)
    setIsSharedGlobally(loaded.shareGlobal)
    setSharedUsers(toNumberArray(loaded.sharedUsers))
    setSharedRoles(toNumberArray(loaded.sharedRoles))
  }, [loaded?.id])

  const reset = (): void => {
    form.resetFields()
    setFormValues(defaultValues)
    setIsSharedGlobally(defaultValues.shareGlobally ?? true)
    setSharedUsers([])
    setSharedRoles([])
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
            onValuesChange={ setFormValues }
            sharedRoles={ sharedRoles }
            sharedUsers={ sharedUsers }
          />
        </Flex>
      </Content>
    </ContentLayout>
  )
}
