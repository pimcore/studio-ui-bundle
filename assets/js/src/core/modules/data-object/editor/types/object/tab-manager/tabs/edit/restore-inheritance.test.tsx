/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

/**
 * Restoring the inheritance of a data object field, as the editor wires it: the real
 * edit form, inheritance state, form item, field label, restore hook and save
 * bookkeeping on a real Ant form. Only the components that carry antd-style (which
 * jest cannot load) and the API layer are replaced.
 *
 * The backend is the one thing not here: what a save persists and what a reopened
 * object reports come from InheritanceService (studio-backend-bundle). The tests
 * therefore assert what is sent, and separately how the editor reads what a reopened
 * object reports.
 */

import React, { type ReactNode, useCallback, useMemo } from 'react'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import {
  LocalizedFieldsContext
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { ObjectBlock } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/block/object-block'
import { RestoreInheritanceLabelExtra } from '@Pimcore/modules/data-object/components/restore-inheritance-label-extra'
import DataComponentFormItem from './components/data-component/form-item'
import { RootComponent } from './components/root-component'
import { EditFormProvider } from './providers/edit-form-provider/edit-form-provider'
import { InheritanceStateProvider } from './providers/inheritance-state-provider/inheritance-state-provider'

const objectId = 42
const parentId = 7

// --- the object as loaded ------------------------------------------------------

interface MetaData {
  objectId: number
  inherited: boolean
  inheritable?: boolean
  inheritedValue?: unknown
}

interface MockDataObject {
  permissions: Record<string, unknown>
  objectData: Record<string, unknown>
  inheritanceData: { metaData: Record<string, unknown> }
}

const editable = { save: true, publish: true, localizedEdit: null }

let mockDataObject: MockDataObject

const inherited = (value?: unknown): MetaData => ({ objectId: parentId, inherited: true, inheritable: true, inheritedValue: value })
const overridden = (inheritedValue: unknown): MetaData => ({ objectId, inherited: false, inheritable: true, inheritedValue })
const own = (): MetaData => ({ objectId, inherited: false, inheritable: true, inheritedValue: null })
const notInheritable = (): MetaData => ({ objectId, inherited: false, inheritable: false, inheritedValue: null })

// --- mocks ----------------------------------------------------------------------

const save = jest.fn(async () => {})
const markObjectDataAsModified = jest.fn()

// jest.mock factories are hoisted, so anything they read has to be inlined or prefixed
// with "mock".
jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: mockDataObject, markObjectDataAsModified })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' }),
  useOptionalElementContext: () => null
}))

// the object permissions as the store holds them, read by the locale check
jest.mock('@sdk/app', () => ({ useAppSelector: (selector: () => unknown) => selector() }))
jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({
  selectDataObjectById: () => ({ permissions: mockDataObject.permissions })
}))

// the real hook reaches the store through the API slice; the task names are inlined
jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { Version: 'version', AutoSave: 'autoSave', Publish: 'publish', Save: 'save', Unpublish: 'unpublish' },
  useSave: () => ({ save, isError: false })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ error: jest.fn() }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ hasDynamicType: () => false, getDynamicType: () => undefined }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@sdk/utils', () => ({
  isNonEmptyString: (value: unknown) => typeof value === 'string' && value.length > 0
}))

// The Studio Form imports antd-style. What the restore relies on from it is the
// label-extra slot at the end of every label row, mirrored here from form.tsx.
jest.mock('@Pimcore/components/form/form', () => {
  const { Form: AntForm } = jest.requireActual('antd')
  const { withItemProvider } = jest.requireActual('@Pimcore/components/form/item/with-item-provider')
  const { LabelExtra } = jest.requireActual('@Pimcore/components/form/item/provider/label-extra/label-extra-provider')

  const Form = (props: any): React.JSX.Element => (
    <AntForm
      { ...props }
      requiredMark={ (label: ReactNode, { required }: { required: boolean }) => (
        <>
          <span>{label}{required && '*'}</span>
          <LabelExtra />
        </>
      ) }
    />
  )
  Form.Item = withItemProvider(AntForm.Item)
  Form.Group = jest.requireActual('@Pimcore/components/form/group/group').Group
  Form.useForm = AntForm.useForm
  Form.useFormInstance = AntForm.useFormInstance
  // resolved on use: the numbered list imports this barrel itself
  Object.defineProperty(Form, 'NumberedList', {
    get: () => jest.requireActual('@Pimcore/components/form/controls/numbered-list/numbered-list').NumberedList
  })

  return { Form }
})

// The block layout (accordion, items) is replaced by its header, the items the
// numbered list holds and a way to add one, as the block's add button does.
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/block/object-block-content', () => {
  const {
    useNumberedListContext,
    useNumberedListSelector
  } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value')
  const selectItems = (items: unknown[]): unknown[] => items

  return {
    ObjectBlockContent: ({ title }: { title: ReactNode }) => {
      const { operations } = useNumberedListContext()
      const items = useNumberedListSelector(selectItems)

      return (
        <>
          <div data-testid="block-header">{title}</div>
          <span
            data-testid="block-items"
            data-value={ JSON.stringify(items) }
          />
          <button
            onClick={ () => { operations.add({ type: 'block', data: { text: 'own item' } }) } }
            type="button"
          >
            add block item
          </button>
        </>
      )
    }
  }
})
jest.mock('@sdk/components', () => jest.requireMock('@Pimcore/components/form/form'))

// the field definitions RootComponent lays out are handed in as ready elements
jest.mock('./components/object-component', () => ({
  ObjectComponent: ({ fields }: { fields: ReactNode }) => <>{fields}</>
}))
jest.mock('./providers/edit-form-provider/utils/build-field-type-map', () => ({ buildFieldTypeMap: () => new Map() }))
jest.mock('./components/root-component/draft-alert', () => ({ DraftAlert: () => null }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children }: { children: ReactNode }) => <>{children}</>
}))
jest.mock('@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content', () => ({
  AutoHideEmptyContent: ({ children }: { children: ReactNode }) => <>{children}</>
}))
jest.mock('@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style', () => ({
  useInheritanceOverlayStyle: ({ inherited }: { inherited: boolean }) => inherited ? 'inherited-overlay' : undefined
}))

// presentation components carrying antd-style, reduced to what the tests read
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-icon={ value } />
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ title, children }: { title: string, children: ReactNode }) => <span data-tooltip={ title }>{children}</span>
}))
jest.mock('@Pimcore/modules/data-object/components/inheritance-button', () => ({
  InheritanceButton: ({ objectId }: { objectId: number }) => <button type="button">open-parent-{objectId}</button>
}))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-button.styles', () => ({
  useStyles: () => ({ styles: {} })
}))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra.styles', () => ({
  useStyles: () => ({ styles: {} })
}))
jest.mock('@Pimcore/components/divider/divider', () => ({ Divider: () => <span data-divider /> }))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: ReactNode }) => <span>{children}</span>
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick }: { children: ReactNode, onClick: React.MouseEventHandler }) => (
    <button
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

// --- the fields -----------------------------------------------------------------

/** Renders whatever the form holds for the field, for values an input cannot show. */
const ValueProbe = ({ value, id }: { value?: unknown, id?: string }): React.JSX.Element => (
  <span
    data-testid={ `value-${id ?? ''}` }
    data-value={ JSON.stringify(value ?? null) }
  />
)

interface FieldOptions {
  name: string[]
  title: string
  noteditable?: boolean
  emptyValue?: unknown
  probe?: boolean
  block?: boolean
}

/** A data type with the parts of DynamicTypeObjectDataAbstract the form item reads. */
const dataType = (emptyValue: unknown): any => ({
  inheritedMaskOverlay: 'form-element',
  getEmptyValue: () => emptyValue,
  getObjectDataFormItemProps: (props: any) => ({
    label: (
      <FieldLabel
        label={ props.title }
        name={ props.name }
      />
    ),
    name: props.name
  }),
  getObjectDataComponent: (props: any) => props.probe === true
    ? <ValueProbe id={ props.name.join('.') } />
    : (
      <input disabled={ props.noteditable } />
      )
})

/**
 * A block, as DynamicTypeObjectDataBlock builds it: the form item carries no label,
 * the Restore sits in the header of the block next to its field label.
 */
const blockType = (): any => ({
  inheritedMaskOverlay: 'form-element',
  getEmptyValue: () => [],
  getObjectDataFormItemProps: (props: any) => ({ name: props.name, label: null }),
  getObjectDataComponent: (props: any) => (
    <ObjectBlock
      { ...props }
      title={ (
        <span>
          <FieldLabel
            label={ props.title }
            name={ props.name }
          />
          <RestoreInheritanceLabelExtra readOnly={ props.noteditable === true } />
        </span>
      ) }
    />
  )
})

/** A field as DataComponent hands it to the form item. */
const Field = ({ name, title, noteditable = false, emptyValue = null, probe = false, block = false }: FieldOptions): React.JSX.Element => {
  const inheritanceState = React.useContext(InheritanceStateProbeContext)
  const inheritedNow = inheritanceState?.(name) === true

  return (
    <DataComponentFormItem
      _props={ { name, title, noteditable, probe, inherited: inheritedNow } as any }
      formFieldName={ name }
      objectDataType={ block ? blockType() : dataType(emptyValue) }
    />
  )
}

// DataComponent derives `inherited` from the state; the probe context stands in for it
const InheritanceStateProbeContext = React.createContext<((name: string[]) => boolean | 'broken' | undefined) | undefined>(undefined)

const InheritedFlagProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const { useInheritanceState } = jest.requireActual('./providers/inheritance-state-provider/use-inheritance-state')
  const context = useInheritanceState()
  const inheritedOf = useCallback((name: string[]) => context?.getInheritanceState(name)?.inherited, [context])

  return (
    <InheritanceStateProbeContext.Provider value={ inheritedOf }>
      {children}
    </InheritanceStateProbeContext.Provider>
  )
}

// --- rendering ------------------------------------------------------------------

const renderEditor = (fields: ReactNode, data: Record<string, unknown> = {}): ReturnType<typeof render> => render(
  <EditFormProvider>
    <InheritanceStateProvider>
      <InheritedFlagProvider>
        <RootComponent
          data={ data }
          layout={ { fields } as unknown as DataObjectGetLayoutByIdApiResponse }
        />
      </InheritedFlagProvider>
    </InheritanceStateProvider>
  </EditFormProvider>
)

const formItem = (title: string): HTMLElement => {
  const item = screen.getByText(title).closest('.ant-form-item')
  if (item === null) throw new Error(`no form item for ${title}`)

  return item as HTMLElement
}

const labelRow = (title: string): HTMLElement => {
  const label = formItem(title).querySelector('.ant-form-item-label')
  if (label === null) throw new Error(`no label for ${title}`)

  return label as HTMLElement
}

const inputOf = (title: string): HTMLInputElement => {
  const input = formItem(title).querySelector('input')
  if (input === null) throw new Error(`no input for ${title}`)

  return input
}

const iconOf = (title: string): string | undefined =>
  labelRow(title).querySelector('[data-icon]')?.getAttribute('data-icon') ?? undefined

const tooltipOf = (title: string): string | undefined =>
  labelRow(title).querySelector('[data-tooltip]')?.getAttribute('data-tooltip') ?? undefined

const restoreOf = (title: string): HTMLElement | null =>
  within(labelRow(title)).queryByRole('button', { name: 'inheritance-restore' })

const clickRestore = async (title: string): Promise<void> => {
  const restore = restoreOf(title)
  if (restore === null) throw new Error(`no Restore for ${title}`)

  await user.click(restore)
}

const parentLinkOf = (title: string): HTMLElement | null =>
  within(labelRow(title)).queryByRole('button', { name: `open-parent-${parentId}` })

const hasOverlay = (title: string): boolean => formItem(title).classList.contains('inherited-overlay')

const probeValue = (name: string[]): unknown =>
  JSON.parse(screen.getByTestId(`value-${name.join('.')}`).getAttribute('data-value') ?? 'null')

// --- the block ------------------------------------------------------------------

const blockHeader = (): HTMLElement => screen.getByTestId('block-header')
const blockIconOf = (): string | undefined => blockHeader().querySelector('[data-icon]')?.getAttribute('data-icon') ?? undefined
const blockRestore = (): HTMLElement | null => within(blockHeader()).queryByRole('button', { name: 'inheritance-restore' })
const blockParentLink = (): HTMLElement | null => within(blockHeader()).queryByRole('button', { name: `open-parent-${parentId}` })
const blockItems = (): unknown => JSON.parse(screen.getByTestId('block-items').getAttribute('data-value') ?? 'null')

const clickBlockRestore = async (): Promise<void> => {
  const restore = blockRestore()
  if (restore === null) throw new Error('no Restore in the block header')

  await user.click(restore)
}

const parentItem = { type: 'block', data: { text: 'parent item' } }
const ownItem = { type: 'block', data: { text: 'own item' } }

/** The numbered list reports a change 10ms after it. */
const flushBlockChange = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

/** The auto save runs 800ms after the last change. */
const flushAutoSave = (): void => { act(() => { jest.advanceTimersByTime(1000) }) }

const lastSavedData = (): Record<string, unknown> => {
  const calls = save.mock.calls as unknown as Array<[Record<string, unknown>, string]>
  if (calls.length === 0) throw new Error('nothing was saved')

  return calls[calls.length - 1][0]
}

let user: ReturnType<typeof userEvent.setup>

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
  mockDataObject = { permissions: editable, objectData: {}, inheritanceData: { metaData: {} } }
})

afterEach(() => { jest.useRealTimers() })

// --------------------------------------------------------------------------------

describe('restoring inheritance in the object editor', () => {
  describe('a field inherited when the object was opened', () => {
    beforeEach(() => {
      mockDataObject.inheritanceData.metaData = { name: inherited() }
    })

    const renderName = (): void => {
      renderEditor(
        <Field
          name={ ['name'] }
          title="Name"
        />,
        { name: 'Parent name' }
      )
    }

    it('shows the parent value, the inheritance link and the overlay, without Restore', () => {
      renderName()

      expect(inputOf('Name')).toHaveValue('Parent name')
      expect(parentLinkOf('Name')).toBeInTheDocument()
      expect(iconOf('Name')).toBeUndefined()
      expect(hasOverlay('Name')).toBe(true)
      expect(restoreOf('Name')).not.toBeInTheDocument()
    })

    it('marks the field as broken and offers Restore once its value changes', async () => {
      renderName()

      await user.type(inputOf('Name'), '!')

      expect(iconOf('Name')).toBe('inheritance-broken')
      expect(tooltipOf('Name')).toBe('inheritance-broken')
      expect(parentLinkOf('Name')).not.toBeInTheDocument()
      expect(hasOverlay('Name')).toBe(false)
      expect(restoreOf('Name')).toBeInTheDocument()
    })

    it('puts the parent value, the link and the overlay back on Restore and persists the field as empty', async () => {
      renderName()

      await user.type(inputOf('Name'), '!')
      flushAutoSave()
      expect(lastSavedData()).toEqual({ name: 'Parent name!' })

      await clickRestore('Name')

      expect(inputOf('Name')).toHaveValue('Parent name')
      expect(parentLinkOf('Name')).toBeInTheDocument()
      expect(hasOverlay('Name')).toBe(true)
      expect(restoreOf('Name')).not.toBeInTheDocument()

      // the auto save that had written the own value is followed by one clearing it
      flushAutoSave()
      expect(lastSavedData()).toEqual({ name: null })
    })

    it('offers Restore again when the field is changed after a Restore', async () => {
      renderName()

      await user.type(inputOf('Name'), '!')
      await clickRestore('Name')
      await user.type(inputOf('Name'), '?')

      expect(iconOf('Name')).toBe('inheritance-broken')
      expect(restoreOf('Name')).toBeInTheDocument()
      flushAutoSave()
      expect(lastSavedData()).toEqual({ name: 'Parent name?' })
    })
  })

  describe('a field overridden in an earlier session', () => {
    beforeEach(() => {
      mockDataObject.inheritanceData.metaData = { sku: overridden('SKU-PARENT') }
    })

    const renderSku = (): void => {
      renderEditor(
        <Field
          name={ ['sku'] }
          title="SKU"
        />,
        { sku: 'SKU-OWN' }
      )
    }

    it('shows the broken marker and Restore as soon as the object is opened', () => {
      renderSku()

      expect(inputOf('SKU')).toHaveValue('SKU-OWN')
      expect(iconOf('SKU')).toBe('inheritance-broken')
      expect(restoreOf('SKU')).toBeInTheDocument()
    })

    it('shows the parent value with a non-clickable inheritance icon on Restore and persists the field as empty', async () => {
      renderSku()

      await clickRestore('SKU')

      expect(inputOf('SKU')).toHaveValue('SKU-PARENT')
      expect(hasOverlay('SKU')).toBe(true)
      expect(restoreOf('SKU')).not.toBeInTheDocument()
      // the backend reports the ancestor value, not the object holding it
      expect(parentLinkOf('SKU')).not.toBeInTheDocument()
      expect(iconOf('SKU')).toBe('inheritance-active')
      expect(tooltipOf('SKU')).toBe('inheritance-active-unknown-origin')

      flushAutoSave()
      expect(lastSavedData()).toEqual({ sku: null })
      expect(markObjectDataAsModified).toHaveBeenCalled()
    })

    it('reads a reopened object as inherited again, with the link to the parent', () => {
      // what the backend reports once the empty value was persisted
      mockDataObject.inheritanceData.metaData = { sku: inherited() }
      renderEditor(
        <Field
          name={ ['sku'] }
          title="SKU"
        />,
        { sku: 'SKU-PARENT' }
      )

      expect(parentLinkOf('SKU')).toBeInTheDocument()
      expect(restoreOf('SKU')).not.toBeInTheDocument()
    })

    it('marks the field as broken and offers Restore when it is changed after a Restore', async () => {
      renderSku()

      await clickRestore('SKU')
      await user.type(inputOf('SKU'), '!')

      expect(iconOf('SKU')).toBe('inheritance-broken')
      expect(restoreOf('SKU')).toBeInTheDocument()
      flushAutoSave()
      expect(lastSavedData()).toEqual({ sku: 'SKU-PARENT!' })
    })
  })

  describe('the inherited value of each field type', () => {
    it.each([
      ['input', 'Parent text', null],
      ['textarea', 'line one\nline two', null],
      ['number', 12.5, null],
      ['select', 'option-a', null],
      ['multiselect', ['option-a', 'option-b'], null],
      ['many-to-one relation', { id: 3, type: 'object', fullPath: '/parent/target' }, null],
      ['many-to-many relation', [{ id: 3, type: 'object', fullPath: '/a' }, { id: 4, type: 'asset', fullPath: '/b' }], null],
      ['image', { id: 9, type: 'asset', fullPath: '/image.jpg' }, null],
      ['gallery', [{ image: { id: 9, type: 'asset' } }], null],
      ['date', '2024-01-31T00:00:00+00:00', null],
      ['quantity value', { value: 3.5, unitId: 'kg' }, null],
      ['block', [{ type: 'block', data: { text: 'parent item' } }], []]
    ])('hands the parent value of a %s field to the form as reported and clears the field with its empty value', async (_type, inheritedValue, emptyValue) => {
      mockDataObject.inheritanceData.metaData = { field: overridden(inheritedValue) }
      renderEditor(
        <Field
          emptyValue={ emptyValue }
          name={ ['field'] }
          probe
          title="Field"
        />,
        { field: 'own' }
      )

      await clickRestore('Field')

      expect(probeValue(['field'])).toEqual(inheritedValue)
      flushAutoSave()
      expect(lastSavedData()).toEqual({ field: emptyValue })
    })
  })

  describe('fields that offer no Restore', () => {
    it('shows neither marker nor Restore for an own value no ancestor holds a value for', () => {
      mockDataObject.inheritanceData.metaData = { name: own() }
      renderEditor(
        <Field
          name={ ['name'] }
          title="Name"
        />
      )

      expect(iconOf('Name')).toBeUndefined()
      expect(parentLinkOf('Name')).not.toBeInTheDocument()
      expect(restoreOf('Name')).not.toBeInTheDocument()
    })

    it('shows neither marker nor Restore for a field type that cannot inherit', () => {
      mockDataObject.inheritanceData.metaData = { slug: notInheritable() }
      renderEditor(
        <Field
          name={ ['slug'] }
          title="Slug"
        />
      )

      expect(iconOf('Slug')).toBeUndefined()
      expect(restoreOf('Slug')).not.toBeInTheDocument()
    })

    it('shows the marker but no Restore for a read-only field', () => {
      mockDataObject.inheritanceData.metaData = { sku: overridden('SKU-PARENT') }
      renderEditor(
        <Field
          name={ ['sku'] }
          noteditable
          title="SKU"
        />
      )

      expect(inputOf('SKU')).toBeDisabled()
      expect(iconOf('SKU')).toBe('inheritance-broken')
      expect(restoreOf('SKU')).not.toBeInTheDocument()
    })

    it('shows the marker but no Restore in a read-only editor', () => {
      mockDataObject.permissions = { save: false, publish: false, localizedEdit: null }
      mockDataObject.inheritanceData.metaData = { sku: overridden('SKU-PARENT') }
      renderEditor(
        <Field
          name={ ['sku'] }
          title="SKU"
        />
      )

      expect(iconOf('SKU')).toBe('inheritance-broken')
      expect(restoreOf('SKU')).not.toBeInTheDocument()
    })
  })

  describe('localized fields', () => {
    const description = (locale: string): string[] => ['localizedfields', 'description', locale]

    const Localized = ({ locale }: { locale: string }): React.JSX.Element => {
      const localizedFields = useMemo(() => ({ locales: [locale] }), [locale])

      return (
        <LocalizedFieldsContext.Provider value={ localizedFields }>
          <Field
            name={ description(locale) }
            title={ `Description ${locale}` }
          />
        </LocalizedFieldsContext.Provider>
      )
    }

    const data = { localizedfields: { description: { de: 'Beschreibung', en: 'Description' } } }

    beforeEach(() => {
      mockDataObject.inheritanceData.metaData = {
        localizedfields: { description: { de: inherited(), en: inherited() } }
      }
    })

    it('restores only the locale whose Restore was clicked', async () => {
      renderEditor(<><Localized locale="de" /><Localized locale="en" /></>, data)

      await user.type(inputOf('Description de'), '!')
      await user.type(inputOf('Description en'), '!')
      await clickRestore('Description de')

      expect(inputOf('Description de')).toHaveValue('Beschreibung')
      expect(parentLinkOf('Description de')).toBeInTheDocument()
      expect(inputOf('Description en')).toHaveValue('Description!')
      expect(iconOf('Description en')).toBe('inheritance-broken')
      expect(restoreOf('Description en')).toBeInTheDocument()

      flushAutoSave()
      expect(lastSavedData()).toEqual({ localizedfields: { description: { de: null, en: 'Description!' } } })
    })

    it('shows the parent value of the locale for a field overridden in an earlier session', async () => {
      mockDataObject.inheritanceData.metaData = {
        localizedfields: { description: { de: overridden('Eltern'), en: overridden('Parent') } }
      }
      renderEditor(<><Localized locale="de" /><Localized locale="en" /></>, data)

      await clickRestore('Description en')

      expect(inputOf('Description en')).toHaveValue('Parent')
      expect(inputOf('Description de')).toHaveValue('Beschreibung')
      expect(restoreOf('Description de')).toBeInTheDocument()
    })

    it('offers no Restore in a locale the user may not edit', () => {
      mockDataObject.permissions = { ...editable, localizedEdit: 'en' }
      mockDataObject.inheritanceData.metaData = {
        localizedfields: { description: { de: overridden('Eltern'), en: overridden('Parent') } }
      }
      renderEditor(<><Localized locale="de" /><Localized locale="en" /></>, data)

      expect(iconOf('Description de')).toBe('inheritance-broken')
      expect(restoreOf('Description de')).not.toBeInTheDocument()
      expect(restoreOf('Description en')).toBeInTheDocument()
    })
  })

  describe('a block', () => {
    it('gives the parent items back on Restore in its header once it was changed, and persists it as empty', async () => {
      mockDataObject.inheritanceData.metaData = { blocks: inherited() }
      renderEditor(
        <Field
          block
          name={ ['blocks'] }
          title="Blocks"
        />,
        { blocks: [parentItem] }
      )

      expect(blockItems()).toEqual([parentItem])
      expect(blockParentLink()).toBeInTheDocument()
      expect(blockRestore()).not.toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'add block item' }))
      flushBlockChange()

      expect(blockItems()).toEqual([parentItem, ownItem])
      expect(blockIconOf()).toBe('inheritance-broken')
      expect(blockRestore()).toBeInTheDocument()
      flushAutoSave()
      expect(lastSavedData()).toEqual({ blocks: [parentItem, ownItem] })

      await clickBlockRestore()

      expect(blockItems()).toEqual([parentItem])
      expect(blockParentLink()).toBeInTheDocument()
      expect(blockRestore()).not.toBeInTheDocument()
      // a block is cleared with an empty list, its API takes no null
      flushAutoSave()
      expect(lastSavedData()).toEqual({ blocks: [] })
    })

    it('shows the parent items of a block overridden in an earlier session on Restore, and persists it as empty', async () => {
      mockDataObject.inheritanceData.metaData = { blocks: overridden([parentItem]) }
      renderEditor(
        <Field
          block
          name={ ['blocks'] }
          title="Blocks"
        />,
        { blocks: [ownItem] }
      )

      expect(blockItems()).toEqual([ownItem])
      expect(blockIconOf()).toBe('inheritance-broken')

      await clickBlockRestore()

      expect(blockItems()).toEqual([parentItem])
      expect(blockIconOf()).toBe('inheritance-active')
      expect(blockParentLink()).not.toBeInTheDocument()
      expect(blockRestore()).not.toBeInTheDocument()
      flushAutoSave()
      expect(lastSavedData()).toEqual({ blocks: [] })
    })

    it('offers no Restore for a localized block in a locale the user may not edit', () => {
      mockDataObject.permissions = { ...editable, localizedEdit: 'en' }
      mockDataObject.inheritanceData.metaData = { localizedfields: { blocks: { de: overridden([parentItem]) } } }
      const LocalizedBlock = (): React.JSX.Element => {
        const localizedFields = useMemo(() => ({ locales: ['de'] }), [])

        return (
          <LocalizedFieldsContext.Provider value={ localizedFields }>
            <Field
              block
              name={ ['localizedfields', 'blocks', 'de'] }
              title="Blocks"
            />
          </LocalizedFieldsContext.Provider>
        )
      }
      renderEditor(<LocalizedBlock />, { localizedfields: { blocks: { de: [ownItem] } } })

      // the block's numbered list hides the locale from its header; the header must still see it
      expect(blockIconOf()).toBe('inheritance-broken')
      expect(blockRestore()).not.toBeInTheDocument()
    })
  })

  describe('a change right after a Restore', () => {
    it('is counted as an own value, not as inherited', async () => {
      mockDataObject.inheritanceData.metaData = { name: inherited() }
      renderEditor(
        <Field
          name={ ['name'] }
          title="Name"
        />,
        { name: 'Parent name' }
      )

      await user.type(inputOf('Name'), '!')
      // no wait between the two: the restore must be applied before the change lands
      await clickRestore('Name')
      await user.type(inputOf('Name'), '?')

      expect(iconOf('Name')).toBe('inheritance-broken')
      expect(hasOverlay('Name')).toBe(false)
      expect(restoreOf('Name')).toBeInTheDocument()
      expect(parentLinkOf('Name')).not.toBeInTheDocument()
    })
  })
})
