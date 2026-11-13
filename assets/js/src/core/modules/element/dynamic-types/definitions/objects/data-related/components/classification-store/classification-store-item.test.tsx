/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A group offers its delete action unless deleting is disallowed by the store,
 * and labels its keys by the title the layout carries for them. When the layout carries sub
 * groups, its keys render under their sub-group heading in the order the layout lists them,
 * with the keys carrying none last.
 *
 * Each key carries its own language node: the key's own `localized` flag decides, a null or
 * absent one inherits the class definition field's, and a key that is not localized stays bound
 * to the language independent slot whichever localization the field level control shows.
 */

/* eslint-disable max-lines */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the markup asserted below matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { Form } from '@Pimcore/components/form/form'
// eslint-disable-next-line import/first
import { ClassificationStoreItem } from './classification-store-item'

const mockConfirm = jest.fn()
const mockObjectComponent = jest.fn()
const mockGetValue = jest.fn()

/**
 * The workspace language edit permission of the open data object, as a comma separated list.
 * Null is no restriction at all, which is what every case that is not about the permission uses.
 */
let mockLocalizedEdit: string | null = null

// A configured key title can be a translation key itself, so the label has to be looked up;
// everything without a translation comes back unchanged, as the other cases assert.
const mockTranslations: Record<string, string> = { 'classification-store.color.blue': 'Blue' }
const mockGermanTranslations: Record<string, string> = { 'classification-store.color.blue': 'Blau' }

/** The interface language. */
let mockLanguage = 'en'

/**
 * One `t` per language, held rather than built per call: i18next hands out a new `t` when the
 * interface language changes and the same one otherwise, and a fresh identity on every render
 * would recompute every memo of the component — hiding exactly what the language case pins down.
 */
const mockTranslators: Record<string, (key: string) => string> = {
  en: (key: string) => mockTranslations[key] ?? key,
  de: (key: string) => mockGermanTranslations[key] ?? mockTranslations[key] ?? key
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: mockTranslators[mockLanguage] })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItem: () => ({ name: ['store', '1', 'default'] })
}))
// The real context value is held by a provider and does not change identity per render, and the
// component's memos depend on it. A fresh object here recomputed them on every render, which is
// the one thing a test about a retained render tree must not do.
jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value', () => {
  const operations = { remove: jest.fn(), getValue: (...args: unknown[]) => mockGetValue(...args) }

  return { useKeyedListContext: () => ({ operations }) }
})
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' })
}))
// The permission is read off the loaded data object, the way useLanguageEditPermission does it;
// the helper that answers it is the real one.
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { id: 42, permissions: { localizedEdit: mockLocalizedEdit } } })
}))
// Stable for the same reason as the keyed-list context above: `isNewGroup` is a memo dependency.
jest.mock('./provider', () => {
  const isNewGroup = (): boolean => false

  return { useClassificationStore: () => ({ isNewGroup }) }
})
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: mockConfirm })
}))
// The group name the key is bound to is composed by the real provider, so what is asserted is
// the path the field would actually be registered under.
jest.mock('@Pimcore/components/form/form', () => ({
  Form: { Group: jest.requireActual('@Pimcore/components/form/group/group').Group }
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => {
  const { useFormGroupOptional } = jest.requireActual('@Pimcore/components/form/group/provider/use-form-group-optional')

  return {
    // The label is rendered: the real field renders the title as its form item label, and the
    // per-key localization indicator is part of that node.
    ObjectComponent: (props: Record<string, unknown>) => {
      mockObjectComponent({ ...props, groupName: useFormGroupOptional()?.name })

      return <>{props.title as React.ReactNode}</>
    }
  }
})
jest.mock('@Pimcore/components/panel/panel', () => ({
  Panel: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

const groupLayout = { id: 1, name: 'Dimensions', keys: [] } as any

// the shape the object layout delivers for a group that is already active when the object
// is reopened: a title on the key next to the one its definition carries. The two differ here
// only to pin down which one the component reads — on this path the backend still fills the
// key title from the definition, so today they arrive equal.
const keyedGroupLayout = {
  ...groupLayout,
  keys: [
    { id: 11, name: 'ef000001', title: 'Height', definition: { datatype: 'data', title: 'Legacy' } },
    { id: 12, name: 'ef000002', title: null, definition: { datatype: 'data' } }
  ]
}

// The layout orders its sub groups itself; 'Weights' comes before 'Dimensions' here although
// the first key belongs to 'Dimensions', so a client-side re-sort would be visible.
const subGroupedLayout = {
  id: 2,
  name: 'Specs',
  subGroups: [
    { identifier: 'sg000002', name: 'Weights', description: null },
    { identifier: 'sg000001', name: 'Dimensions', description: null }
  ],
  keys: [
    { id: 21, name: 'ef000021', title: 'Height', subGroup: 'sg000001', definition: { datatype: 'data' } },
    { id: 22, name: 'ef000022', title: 'Net weight', subGroup: 'sg000002', definition: { datatype: 'data' } },
    { id: 23, name: 'ef000023', title: 'Note', subGroup: null, definition: { datatype: 'data' } },
    { id: 24, name: 'ef000024', title: 'Width', subGroup: 'sg000001', definition: { datatype: 'data' } }
  ]
} as any

const GROUP_ID = 4
const LANGUAGE = 'en'
/** A second content language, for the cases where only one of the two may be edited. */
const OTHER_LANGUAGE = 'de'
const LANGUAGE_INDEPENDENT = 'default'
const LOCALIZED_INDICATOR = 'classification-store.key-localized'

// One fixture for every combination of the key's own flag: absent, an explicit null, true, false.
const MIXED_KEYS: Array<{ id: number, name: string, title: string, localized?: boolean | null }> = [
  { id: 41, name: 'ef000041', title: 'Absent' },
  { id: 42, name: 'ef000042', title: 'Null', localized: null },
  { id: 43, name: 'ef000043', title: 'True', localized: true },
  { id: 44, name: 'ef000044', title: 'False', localized: false }
]

const mixedLayout = {
  id: GROUP_ID,
  name: 'Mixed',
  keys: MIXED_KEYS.map((key) => ({ ...key, definition: { datatype: 'data' } }))
} as any

// Two localized keys, one of them read-only by its own definition: what the definition forbids
// must stay forbidden whatever the language permission allows.
const lockedKeyLayout = {
  id: 6,
  name: 'Locked',
  keys: [
    { id: 61, name: 'ef000061', title: 'Locked', localized: true, definition: { datatype: 'data', noteditable: true } },
    { id: 62, name: 'ef000062', title: 'Open', localized: true, definition: { datatype: 'data' } }
  ]
} as any

const TRANSLATED_TITLE = 'classification-store.color.blue'

// Two keys configured with the same title, which is a translation key: one resolves to localized
// and one does not, so the label of each is composed by a different branch.
const translatedTitleLayout = {
  id: 5,
  name: 'Colors',
  keys: [
    { id: 51, name: 'ef000051', title: TRANSLATED_TITLE, localized: true, definition: { datatype: 'data' } },
    { id: 52, name: 'ef000052', title: TRANSLATED_TITLE, localized: false, definition: { datatype: 'data' } }
  ]
} as any

/** A stable callback, for the cases that render the same props twice. */
const noop = (): void => {}

/**
 * Held at module level on purpose: the language case re-renders these props unchanged, so every
 * dependency of the component's memoized tree keeps its identity and the language is the only
 * input that moved.
 */
const LANGUAGE_CASE_PROPS = {
  classificationStoreName: 'store',
  currentLayoutData: [translatedTitleLayout],
  fieldLocalized: true,
  groupLayout: translatedTitleLayout,
  localizationGroup: LANGUAGE,
  updateCurrentLayoutData: noop
}

const headings = (): Array<string | null> => [...document.querySelectorAll('h5')].map((heading) => heading.textContent)

const renderedKeyIds = (): unknown[] => mockObjectComponent.mock.calls.map(([props]) => props.name)

/** The form path each rendered key is bound to, as the group provider composes it. */
const boundPaths = (): unknown[] => mockObjectComponent.mock.calls
  .map(([props]) => [...(props.groupName ?? []), props.name])

const propsOfKey = (keyId: number): Record<string, any> =>
  mockObjectComponent.mock.calls.map(([props]) => props).find((props) => props.name === keyId)

/**
 * The group as the content renders it: inside a form group named after the group id, which the
 * per-key language node composes with.
 */
const renderMixedGroup = (fieldLocalized: boolean, localizationGroup: string, hideEmptyData = false): void => {
  render(
    <Form.Group name={ [String(GROUP_ID)] }>
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [mixedLayout] }
        fieldLocalized={ fieldLocalized }
        groupLayout={ mixedLayout }
        hideEmptyData={ hideEmptyData }
        localizationGroup={ localizationGroup }
        updateCurrentLayoutData={ jest.fn() }
      />
    </Form.Group>
  )
}

describe('ClassificationStoreItem', () => {
  beforeEach(() => {
    mockConfirm.mockClear()
    mockObjectComponent.mockClear()
    mockGetValue.mockReset()
    mockLocalizedEdit = null
    mockLanguage = 'en'
  })

  it('asks for confirmation when the group is deleted', async () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='technicalAttributes'
        currentLayoutData={ [groupLayout] }
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'delete' }))

    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })

  it('hides the delete action when deleting is disallowed', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='technicalAttributes'
        currentLayoutData={ [groupLayout] }
        disallowDelete
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(screen.getByText('Dimensions')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
  })

  it('labels a key with its title, overriding the title of its definition', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [keyedGroupLayout] }
        groupLayout={ keyedGroupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(mockObjectComponent).toHaveBeenCalledWith(
      expect.objectContaining({ name: 11, title: 'Height' })
    )
  })

  it('labels a key without a title by its name', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [keyedGroupLayout] }
        groupLayout={ keyedGroupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(mockObjectComponent).toHaveBeenCalledWith(
      expect.objectContaining({ name: 12, title: 'ef000002' })
    )
  })

  it('renders the keys under their sub-group heading in the order of the layout', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [subGroupedLayout] }
        groupLayout={ subGroupedLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(headings()).toEqual(['Weights', 'Dimensions', 'classification-store.no-sub-group'])
    expect(renderedKeyIds()).toEqual([22, 21, 24, 23])
  })

  it('renders no heading for a sub group whose keys are all hidden as empty', () => {
    mockGetValue.mockReturnValue({ 22: 'heavy' })

    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [subGroupedLayout] }
        groupLayout={ subGroupedLayout }
        hideEmptyData
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(headings()).toEqual(['Weights'])
    expect(renderedKeyIds()).toEqual([22])
  })

  it('renders a group layout without sub groups as one flat list', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [keyedGroupLayout] }
        groupLayout={ keyedGroupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(headings()).toEqual([])
    expect(renderedKeyIds()).toEqual([11, 12])
  })

  // the combinations of the class definition field's flag and the key's own one, for the four keys
  // of the fixture in order: absent, an explicit null, true, false
  it.each([
    { field: 'a localized field', fieldLocalized: true, slots: [LANGUAGE, LANGUAGE, LANGUAGE, LANGUAGE_INDEPENDENT] },
    {
      field: 'a field that is not localized',
      fieldLocalized: false,
      slots: [LANGUAGE_INDEPENDENT, LANGUAGE_INDEPENDENT, LANGUAGE, LANGUAGE_INDEPENDENT]
    }
  ])('binds the keys of $field to the slot each of them resolves to', ({ fieldLocalized, slots }) => {
    renderMixedGroup(fieldLocalized, LANGUAGE)

    expect(boundPaths()).toEqual(
      slots.map((slot, index) => [String(GROUP_ID), slot, MIXED_KEYS[index].id])
    )
  })

  it('leaves the keys that are not localized where they are when the field level control moves', () => {
    renderMixedGroup(true, LANGUAGE_INDEPENDENT)

    expect(boundPaths()).toEqual(
      MIXED_KEYS.map((key) => [String(GROUP_ID), LANGUAGE_INDEPENDENT, key.id])
    )

    mockObjectComponent.mockClear()
    renderMixedGroup(true, LANGUAGE)

    // only the three that resolve to localized moved; the fourth stayed language independent
    expect(boundPaths()).toEqual([
      [String(GROUP_ID), LANGUAGE, 41],
      [String(GROUP_ID), LANGUAGE, 42],
      [String(GROUP_ID), LANGUAGE, 43],
      [String(GROUP_ID), LANGUAGE_INDEPENDENT, 44]
    ])
  })

  it.each([
    [LANGUAGE_INDEPENDENT],
    [LANGUAGE]
  ])('keeps every key of a mixed group editable with the control on %s', (mode) => {
    renderMixedGroup(true, mode)

    for (const key of MIXED_KEYS) {
      expect(propsOfKey(key.id).noteditable).not.toBe(true)
    }
  })

  // A key bound to a language slot is edited in that language, so it follows the same
  // localizedEdit permission the localized control and the restore of a localized field follow.
  it('makes the keys of the slot read-only in a language the permission leaves out', () => {
    mockLocalizedEdit = LANGUAGE

    renderMixedGroup(true, OTHER_LANGUAGE)

    // the three that resolve to localized sit in the German slot, which may not be edited
    expect(propsOfKey(41).noteditable).toBe(true)
    expect(propsOfKey(42).noteditable).toBe(true)
    expect(propsOfKey(43).noteditable).toBe(true)
    // the explicit false one stays on the language independent slot, which carries no language
    expect(propsOfKey(44).noteditable).not.toBe(true)
  })

  it('restricts only the key flagged localized itself on a field that is not localized', () => {
    mockLocalizedEdit = LANGUAGE

    renderMixedGroup(false, OTHER_LANGUAGE)

    expect(propsOfKey(43).noteditable).toBe(true)

    for (const key of [41, 42, 44]) {
      expect(propsOfKey(key).noteditable).not.toBe(true)
    }
  })

  it.each([
    ['the permission names the language', LANGUAGE, LANGUAGE],
    ['the permission names it among others', `${OTHER_LANGUAGE},${LANGUAGE}`, LANGUAGE],
    ['the permission is empty', '', LANGUAGE],
    ['the permission names languages but the keys are on the language independent slot', LANGUAGE, LANGUAGE_INDEPENDENT]
  ])('keeps every key of a mixed group editable when %s', (_name, permission, mode) => {
    mockLocalizedEdit = permission

    renderMixedGroup(true, mode)

    for (const key of MIXED_KEYS) {
      expect(propsOfKey(key.id).noteditable).not.toBe(true)
    }
  })

  it('leaves a key its definition declares read-only read-only, and the others editable', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [lockedKeyLayout] }
        fieldLocalized
        groupLayout={ lockedKeyLayout }
        localizationGroup={ LANGUAGE }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(propsOfKey(61).noteditable).toBe(true)
    expect(propsOfKey(62).noteditable).not.toBe(true)
  })

  it('marks the keys that resolve to localized with a read-only indicator and the others with none', () => {
    renderMixedGroup(true, LANGUAGE)

    // three keys resolve to localized on a localized field, the explicit false one does not
    expect(screen.getAllByLabelText(LOCALIZED_INDICATOR)).toHaveLength(3)

    // the status is exposed as an image with its label, not as a bare labelled span a screen
    // reader may skip - and not as anything that could be taken for a control
    expect(screen.getAllByRole('img', { name: LOCALIZED_INDICATOR })).toHaveLength(3)

    expect(screen.queryByRole('button', { name: LOCALIZED_INDICATOR })).not.toBeInTheDocument()
    expect(screen.queryByRole('switch')).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('translates the label it renders beside the indicator, as the field label does the plain one', () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [translatedTitleLayout] }
        fieldLocalized
        groupLayout={ translatedTitleLayout }
        localizationGroup={ LANGUAGE }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    // the localized key's label is a node, so the lookup can only happen while composing it
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByLabelText(LOCALIZED_INDICATOR)).toBeInTheDocument()

    // the key that is not localized stays a plain string, which the field label translates itself
    expect(propsOfKey(52).title).toBe(TRANSLATED_TITLE)
  })

  it('relabels its keys when the interface language changes', () => {
    // The group renders a retained tree, and the labels, the headings, the indicator tooltip and
    // its accessible label are already-translated nodes inside it. A language change moves `t`
    // and nothing else, so a tree that does not watch `t` keeps serving the previous language
    // until one of the other inputs happens to move.
    //
    // A fresh element each time, from the same props: handing React the identical element back
    // makes it skip the subtree altogether, so nothing would be re-rendered to assert on. The
    // props are the same objects, which is what leaves the language as the only input that moved.
    const group = (): React.JSX.Element => <ClassificationStoreItem { ...LANGUAGE_CASE_PROPS } />

    const { rerender } = render(group())

    expect(screen.getByText('Blue')).toBeInTheDocument()

    mockLanguage = 'de'
    rerender(group())

    expect(screen.getByText('Blau')).toBeInTheDocument()
    expect(screen.queryByText('Blue')).not.toBeInTheDocument()
  })

  it('marks only the key flagged localized itself on a field that is not localized', () => {
    renderMixedGroup(false, LANGUAGE)

    // the two that inherit and the explicit false one resolve to not localized, so they carry none
    expect(screen.getAllByLabelText(LOCALIZED_INDICATOR)).toHaveLength(1)
  })

  it('hides the empty keys of both slots and keeps the ones that carry data', () => {
    // The keys of one group sit in two slots at once, so the values of each slot decide for the
    // keys bound to it: reading one slot for all of them hid the keys of the other.
    mockGetValue.mockImplementation(([, slot]: string[]) => (
      slot === LANGUAGE ? { 43: 'localized value' } : { 44: 'independent value' }
    ))

    renderMixedGroup(true, LANGUAGE, true)

    expect(renderedKeyIds()).toEqual([43, 44])
  })

  // The path every other key takes is pinned here: its own definition spread, and nothing of the multiValue declaration.
  it('renders a key that is not a multiValue key with its own definition spread and no multiValue member', () => {
    const layout = {
      id: 8,
      name: 'Plain',
      keys: [{ id: 81, name: 'ef000081', title: 'Plain', multiValue: null, variants: null, definition: { datatype: 'data', fieldtype: 'input', maximum: 5 } }]
    } as any

    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [layout] }
        groupLayout={ layout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    const props = propsOfKey(81)

    expect(props).toMatchObject({ datatype: 'data', fieldtype: 'input', maximum: 5 })
    expect(props.multiValue).toBeUndefined()
    expect(props.variants).toBeUndefined()
  })

  it('hands a multiValue key the declaration its layout publishes', () => {
    const variants = [{ name: 'metric' }, { name: 'imperial', label: 'Imperial' }]
    const layout = {
      id: 9,
      name: 'Multi',
      keys: [{ id: 91, name: 'ef000091', title: 'Height', multiValue: true, maximum: 3, variants, definition: { datatype: 'data', fieldtype: 'multiValue', delegateDatatype: 'quantityValue' } }]
    } as any

    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [layout] }
        groupLayout={ layout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(propsOfKey(91)).toMatchObject({ delegateDatatype: 'quantityValue', multiValue: true, maximum: 3, variants })
  })

  it('hands a multiValue key the declaration its definition carries where the layout publishes none', () => {
    const variants = [{ name: 'metric' }, { name: 'imperial', label: 'Imperial' }]
    const layout = {
      id: 9,
      name: 'Multi',
      keys: [{ id: 92, name: 'ef000092', title: 'Height', multiValue: null, maximum: null, variants: null, definition: { datatype: 'data', fieldtype: 'multiValue', delegateDatatype: 'quantityValue', multiValue: false, variants } }]
    } as any

    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [layout] }
        groupLayout={ layout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(propsOfKey(92)).toMatchObject({ delegateDatatype: 'quantityValue', multiValue: false, variants })
  })

  it('hands a multiValue key the default variant declaration, preferring the layout member over the definition', () => {
    const layout = {
      id: 9,
      name: 'Multi',
      keys: [
        { id: 93, name: 'ef000093', title: 'Height', defaultVariant: false, defaultVariantLabel: 'Base', definition: { datatype: 'data', fieldtype: 'multiValue', delegateDatatype: 'quantityValue', unqualifiedValue: true, unqualifiedValueLabel: 'Old' } },
        { id: 94, name: 'ef000094', title: 'Width', defaultVariant: null, defaultVariantLabel: null, definition: { datatype: 'data', fieldtype: 'multiValue', delegateDatatype: 'quantityValue', unqualifiedValue: false, unqualifiedValueLabel: 'Kept' } }
      ]
    } as any

    render(
      <ClassificationStoreItem
        classificationStoreName='store'
        currentLayoutData={ [layout] }
        groupLayout={ layout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(propsOfKey(93)).toMatchObject({ defaultVariant: false, defaultVariantLabel: 'Base' })
    expect(propsOfKey(94)).toMatchObject({ defaultVariant: false, defaultVariantLabel: 'Kept' })
  })
})
