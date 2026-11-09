/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { isArray } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { BaseView } from '../../../layout-related/views/base-view'
import {
  type ClassificationStoreCollection2,
  type ClassificationStoreGroupLayout2
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { buildSubGroupSections } from '@Pimcore/modules/data-object/classification-store/utils/sub-group-sections'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { Icon } from '@Pimcore/components/icon/icon'
import { Title } from '@Pimcore/components/title/title'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useKeyedListContext } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Panel } from '@Pimcore/components/panel/panel'
import {
  RestoreInheritanceLocaleContext
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/hooks/restore-inheritance-locale-context'
import { useClassificationStore } from './provider'
import { useLanguageEditPermission } from './hooks/use-language-edit-permission'
import { getHiddenKeyIds } from './utils/hide-empty-data'
import { getKeyLabel } from './utils/key-label'
import { useStyles } from './classification-store-item.styles'

/** The language independent slot every key that is not localized is bound to. */
const LANGUAGE_INDEPENDENT = 'default'

export interface ClassificationStoreItemProps {
  groupLayout?: ClassificationStoreGroupLayout2
  currentLayoutData: ClassificationStoreGroupLayout2[]
  updateCurrentLayoutData: (value: ClassificationStoreGroupLayout2[]) => void
  /** Hide the keys of this group that carry no data. */
  hideEmptyData?: boolean
  /** Changes whenever hiding is switched back on, to re-evaluate the empty keys. */
  hideEmptyDataRevision?: number
  /** Localization the group is currently edited in ('default' or a language). */
  localizationGroup?: string
  /** Localized flag of the class definition field, which every key without its own inherits. */
  fieldLocalized?: boolean
  /** Hides the delete button, e.g. when the store is not editable. */
  disallowDelete?: boolean
}

export const ClassificationStoreItem = (props: ClassificationStoreItemProps): React.JSX.Element => {
  const {
    groupLayout,
    currentLayoutData,
    updateCurrentLayoutData,
    hideEmptyData = false,
    hideEmptyDataRevision = 0,
    localizationGroup = LANGUAGE_INDEPENDENT,
    fieldLocalized = false,
    disallowDelete = false
  } = props

  const { name } = useItem()
  const { operations } = useKeyedListContext()
  const { id } = useElementContext()
  const { isNewGroup } = useClassificationStore()
  const canEditLanguage = useLanguageEditPermission()

  const modal = useFormModal()
  const { styles } = useStyles()
  const { t } = useTranslation()

  const fieldName: string = isArray(name) ? name[name.length - 1] : name

  // True and false are the key's own decision; a null or absent flag inherits the field's.
  const isKeyLocalized = (key: ClassificationStoreCollection2): boolean => {
    if (key.localized === true) return true
    if (key.localized === false) return false

    return fieldLocalized
  }

  const slotOf = (key: ClassificationStoreCollection2): string =>
    isKeyLocalized(key) ? localizationGroup : LANGUAGE_INDEPENDENT

  // A key bound to a language slot is edited in that language, so it follows the same
  // localizedEdit permission the localized control follows - whether the key resolves to
  // localized through its own flag or through the field's. The language independent slot carries
  // no language for the permission to answer, and the keys bound to it are unaffected.
  const isLocalizationGroupEditable = localizationGroup === LANGUAGE_INDEPENDENT ||
    canEditLanguage(localizationGroup)

  const handleItemDelete = (): void => {
    const updatedLayout = currentLayoutData.filter(item => item.id !== groupLayout?.id)
    updateCurrentLayoutData(updatedLayout)

    operations.remove(String(groupLayout?.id))
  }

  // The group values are read through the keyed-list operations instead of a
  // subscription on purpose: subscribing would re-render the whole group on every
  // keystroke, and a field must not disappear while its value is being cleared.
  // Re-evaluated only when the group, its localization or the hide revision changes.
  const visibleKeys = useMemo(() => {
    const keys = groupLayout?.keys ?? []
    const groupId = groupLayout?.id

    if (!hideEmptyData || groupId === undefined || isNewGroup(String(groupId))) {
      return keys
    }

    // Keys of one group can sit in two slots at once, so each is checked against the values of
    // the slot it is bound to: reading one slot for all of them hid the keys of the other.
    const hiddenKeyIds = new Set(
      [LANGUAGE_INDEPENDENT, localizationGroup].flatMap((slot) => [...getHiddenKeyIds({
        keys: keys.filter((key) => slotOf(key) === slot),
        groupValue: operations.getValue([String(groupId), slot])
      })])
    )

    return keys.filter((key) => !hiddenKeyIds.has(key.id))
  }, [groupLayout, hideEmptyData, hideEmptyDataRevision, localizationGroup, fieldLocalized, operations, isNewGroup])

  // The layout lists its sub groups in the order the backend put them in, which is the order
  // their first key appears in; it is never re-sorted here. A group layout that carries none
  // keeps rendering its keys as one flat list.
  const subGroupSections = useMemo(() => {
    const subGroups = groupLayout?.subGroups ?? []

    if (subGroups.length === 0) {
      return undefined
    }

    return buildSubGroupSections({
      items: visibleKeys,
      getSubGroup: (key) => key.subGroup,
      order: subGroups.map((subGroup) => subGroup.identifier)
    })
  }, [groupLayout, visibleKeys])

  const subGroupNames = useMemo(
    () => new Map((groupLayout?.subGroups ?? []).map((subGroup) => [subGroup.identifier, subGroup.name])),
    [groupLayout]
  )

  const headingOf = (identifier: string | null): string => {
    if (identifier === null) {
      return t('classification-store.no-sub-group')
    }

    return subGroupNames.get(identifier) ?? identifier
  }

  /**
   * Read-only marker that this key holds a value per language; it cannot change the flag.
   * The status is carried by an image role rather than by a bare labelled span, which a screen
   * reader does not reliably announce.
   */
  const localizedIndicator = (
    <Tooltip title={ t('classification-store.key-localized-tooltip') }>
      <span
        aria-label={ t('classification-store.key-localized') }
        role='img'
      >
        <Icon value='translate' />
      </span>
    </Tooltip>
  )

  const labelOf = (item: ClassificationStoreCollection2): React.ReactNode => {
    if (!isKeyLocalized(item)) {
      return getKeyLabel(item)
    }

    // Translated here: the field label only translates a plain string, so a node would render raw.
    return (
      <Flex
        align='center'
        gap='extra-small'
      >
        { t(getKeyLabel(item)) }
        { localizedIndicator }
      </Flex>
    )
  }

  // Each key carries its own slot, so a key that is not localized stays on the language
  // independent one whichever localization the field level control shows.
  const renderKey = (item: ClassificationStoreCollection2): React.JSX.Element => {
    const slot = slotOf(item)
    const definition = item.definition as { noteditable?: boolean | null } | undefined
    // Whatever the definition itself forbids stays forbidden; the language permission only adds to it.
    const isReadOnly = definition?.noteditable === true ||
      (slot !== LANGUAGE_INDEPENDENT && !isLocalizationGroupEditable)

    return (
      <Form.Group
        key={ item.id }
        name={ [slot] }
      >
        {/* the restore permission check reads the locale of the key it is offered for */}
        <RestoreInheritanceLocaleContext.Provider value={ slot === LANGUAGE_INDEPENDENT ? undefined : slot }>
          <ObjectComponent
            { ...item.definition }
            name={ item.id }
            noteditable={ isReadOnly }
            technicalName={ item.name }
            title={ labelOf(item) }
          />
        </RestoreInheritanceLocaleContext.Provider>
      </Form.Group>
    )
  }

  const handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    e.stopPropagation()

    modal.confirm({
      content: (
        <span>{t('element.delete.confirmation.text')}</span>
      ),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: () => { handleItemDelete() }
    })
  }

  return useMemo(() => {
    return (
      <BaseView
        border={ false }
        collapsed={ false }
        collapsible
        extra={ disallowDelete
          ? undefined
          : (
            <Flex className='w-full'>
              <IconButton
                aria-label={ t('delete') }
                className={ styles.deleteButton }
                icon={ { value: 'trash' } }
                onClick={ handleClose }
                tooltip={ { title: t('delete') } }
                type='action'
              />
            </Flex>
            ) }
        extraPosition="start"
        theme='border-highlight'
        title={ groupLayout?.name }
      >
        <Panel>
          { subGroupSections === undefined
            ? visibleKeys.map(renderKey)
            : subGroupSections.map((section) => (
              <React.Fragment key={ section.identifier ?? '' }>
                <Title level={ 5 }>{ headingOf(section.identifier) }</Title>
                { section.items.map(renderKey) }
              </React.Fragment>
              )) }
        </Panel>
      </BaseView>
    )
  }, [groupLayout, id, fieldName, currentLayoutData, visibleKeys, subGroupSections, disallowDelete, localizationGroup, fieldLocalized, isLocalizationGroupEditable])
}
