/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isObject, find, isEmpty, isArray } from 'lodash'
import { type ClassificationStoreProps } from './classification-store'
import { useKeyedListSelector } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { BaseView } from '../../../layout-related/views/base-view'
import { ClassificationStoreItem } from './classification-store-item'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { isLanguageIndependentValueAllowed } from '@Pimcore/components/language-selection/helpers'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { LocalizationSwitch } from './components/localization-switch/localization-switch'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

// Project the keyed-list value to the bits this view actually depends on: the
// group keys and the two bookkeeping maps. None of these change when a field
// value is edited, so (combined with the content-equality cache in
// useKeyedListSelector) typing in a field no longer re-renders the whole store.
const selectStructure = (values: Record<string, any>): {
  groupKeys: string[]
  activeGroups: any
  groupCollectionMapping: any
} => {
  const { activeGroups, groupCollectionMapping, ...groups } = values ?? {}
  return {
    groupKeys: Object.keys(isObject(groups) ? groups : {}),
    activeGroups,
    groupCollectionMapping
  }
}

export const ClassificationStoreContent = (props: ClassificationStoreProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { openModal, currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  const { groupKeys, activeGroups, groupCollectionMapping } = useKeyedListSelector(selectStructure)
  const { currentLanguage } = useLanguageSelection()

  const element = useElementContext()
  const elementDraft = useElementDraft(element.id, element.elementType)

  const isLocalizable = props.localized ?? false
  const viewableLanguages = 'permissions' in elementDraft
    ? (elementDraft.permissions as { localizedView?: string | null } | undefined)?.localizedView
    : undefined
  // A non localized store only ever has the language independent column, so no language
  // permission applies to it.
  const allowLanguageIndependentValue = !isLocalizable || isLanguageIndependentValueAllowed(viewableLanguages)

  const [localizationMode, setLocalizationMode] = useState<string>(
    allowLanguageIndependentValue ? 'default' : 'current-language'
  )

  let localizationGroup = 'default'

  useEffect(() => {
    const initialLayout = props.activeGroupDefinitions ?? []
    const activeGroupLayout = !isEmpty(currentLayoutData) ? currentLayoutData : initialLayout

    const isGroupType = isObject(activeGroupLayout) && !isArray(activeGroupLayout)
    const activeGroupLayoutData: ClassificationStoreGroupLayout2[] = isGroupType ? Object.values(activeGroupLayout) : activeGroupLayout

    updateCurrentLayoutData(activeGroupLayoutData)
  }, [])

  const handleLocalizationChange = (value: string): void => {
    setLocalizationMode(value)
  }

  if (localizationMode === 'current-language') {
    localizationGroup = currentLanguage
  }

  return useMemo(() => (
    <BaseView
      border
      collapsed={ false }
      collapsible
      extra={
        <Flex
          align='center'
          className='w-full'
          justify='space-between'
        >
          <Button
            color="default"
            icon={ <Icon value="folder-search" /> }
            onClick={ (e) => {
              e.stopPropagation()

              openModal()
            } }
            variant="filled"
          >
            {t('add')}
          </Button>

          {isLocalizable
            ? (
              <LocalizationSwitch
                allowLanguageIndependentValue={ allowLanguageIndependentValue }
                initialValue={ localizationMode }
                onChange={ handleLocalizationChange }
              />
              )
            : <></>}
        </Flex>
      }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      <Space
        className='w-full'
        direction='vertical'
        size='small'
      >
        {groupKeys.map((key) => {
          return (
            <Form.Group
              key={ `${key}` }
              name={ [key, localizationGroup] }
            >
              <ClassificationStoreItem
                currentLayoutData={ currentLayoutData }
                groupLayout={ find(currentLayoutData, { id: parseInt(key) }) }
                updateCurrentLayoutData={ updateCurrentLayoutData }
              />
            </Form.Group>
          )
        })}
      </Space>

      <Form.Item
        name={ ['activeGroups'] }
        style={ { display: 'none' } }
      >
        <Input
          type='hidden'
          value={ activeGroups ?? {} }
        />
      </Form.Item>

      <Form.Item
        name={ ['groupCollectionMapping'] }
        style={ { display: 'none' } }
      >
        <Input
          type='hidden'
          value={ groupCollectionMapping ?? {} }
        />
      </Form.Item>
    </BaseView>
  ), [
    groupKeys,
    activeGroups,
    groupCollectionMapping,
    localizationGroup,
    localizationMode,
    allowLanguageIndependentValue,
    currentLayoutData
  ])
}
