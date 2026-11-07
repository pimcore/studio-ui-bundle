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

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItem: () => ({ name: ['store', '1', 'default'] })
}))
jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value', () => ({
  useKeyedListContext: () => ({ operations: { remove: jest.fn(), getValue: mockGetValue } })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' })
}))
jest.mock('./provider', () => ({
  useClassificationStore: () => ({ isNewGroup: () => false })
}))
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
  })

  it('asks for confirmation when the group is deleted', async () => {
    render(
      <ClassificationStoreItem
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

  it('marks the keys that resolve to localized with a read-only indicator and the others with none', () => {
    renderMixedGroup(true, LANGUAGE)

    // three keys resolve to localized on a localized field, the explicit false one does not
    expect(screen.getAllByLabelText(LOCALIZED_INDICATOR)).toHaveLength(3)

    for (const indicator of screen.getAllByLabelText(LOCALIZED_INDICATOR)) {
      expect(indicator).not.toHaveAttribute('role')
      expect(indicator.tagName).toBe('SPAN')
    }

    expect(screen.queryByRole('button', { name: LOCALIZED_INDICATOR })).not.toBeInTheDocument()
    expect(screen.queryByRole('switch')).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('renders no indicator when no key of the group resolves to localized', () => {
    renderMixedGroup(false, LANGUAGE)

    // only the key flagged localized itself carries one
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
})
