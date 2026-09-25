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
 * Restoring the inheritance of a field while a save is in flight, with the real save
 * hook and save queue behind the editor: the API mutation is the one thing held open
 * by the test. What the backend receives, and in which order, decides whether a
 * reopened object shows the field as inherited again.
 */

import React, { type ReactNode, useCallback } from 'react'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import DataComponentFormItem from './components/data-component/form-item'
import { RootComponent } from './components/root-component'
import { EditFormProvider, useEditFormContext } from './providers/edit-form-provider/edit-form-provider'
import { InheritanceStateProvider } from './providers/inheritance-state-provider/inheritance-state-provider'
import { SaveProvider } from './providers/save-provider/save-provider'

const objectId = 42
const parentId = 7

// --- the object as loaded ------------------------------------------------------

const inherited = (): object => ({ objectId: parentId, inherited: true, inheritable: true, inheritedValue: null })
const overridden = (inheritedValue: unknown): object => ({ objectId, inherited: false, inheritable: true, inheritedValue })

const mockDataObject = {
  changes: {},
  permissions: { save: true, publish: true, localizedEdit: null },
  objectData: {},
  inheritanceData: { metaData: { name: inherited(), sku: overridden('SKU-PARENT') } }
}

// --- the API --------------------------------------------------------------------

interface Response { data: Record<string, unknown>, error?: unknown }

/** Every request the editor sends, resolved right away unless a test holds one open. */
const mockSend = jest.fn(async (_request: unknown): Promise<Response> => ({ data: {} }))
const markObjectDataAsModified = jest.fn()

/** The next request stays in flight until finish() is called. */
const holdNextSave = (): { finish: () => void } => {
  let finish = (): void => {}
  const pending = new Promise<Response>((resolve) => {
    finish = () => { resolve({ data: {} }) }
  })

  mockSend.mockReturnValueOnce(pending)

  return { finish }
}

const sentRequests = (): Array<Record<string, any>> =>
  mockSend.mock.calls.map(([argument]: any[]) => argument.body.data)

// Every hook instance gets a mutation of its own, like RTK Query hands out, with the
// loading and result state the toolbar reads.
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  useDataObjectUpdateByIdMutation: () => {
    const { useState, useCallback } = jest.requireActual<typeof React>('react')
    const [state, setState] = useState({ isLoading: false, isSuccess: false, isError: false })
    const trigger = useCallback(async (argument: unknown) => {
      setState((current) => ({ ...current, isLoading: true }))
      const response = await mockSend(argument)
      setState({ isLoading: false, isSuccess: response.error === undefined, isError: response.error !== undefined })

      return response
    }, [])

    return [trigger, { ...state, error: undefined }]
  }
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
}))
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: mockDataObject, properties: [], setDraftData: jest.fn(), markObjectDataAsModified })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' }),
  useOptionalElementContext: () => null
}))
jest.mock('@sdk/app', () => ({
  useAppSelector: (selector: () => unknown) => selector(),
  useAppDispatch: () => jest.fn()
}))
jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({
  selectDataObjectById: () => ({ permissions: mockDataObject.permissions }),
  setModificationDate: jest.fn()
}))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({ setNodePublished: jest.fn() }))
jest.mock('@Pimcore/modules/data-object/services/processors/data-object-save-data-processor-registry', () => ({
  DataObjectSaveDataContext: function DataObjectSaveDataContext () {}
}))
jest.mock('@Pimcore/lib/event-bus', () => ({ eventBus: { publish: jest.fn() } }))
jest.mock('@Pimcore/lib/event-bus/event-types', () => ({ eventTypes: {} }))
jest.mock('@Pimcore/modules/element/services/edit-lock-gate', () => ({ awaitEditLockPersistAllowed: async () => true }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ error: jest.fn() }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ hasDynamicType: () => false, getDynamicType: () => undefined, executeProcessors: jest.fn() })
  }
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
      requiredMark={ (label: ReactNode) => (
        <>
          <span>{label}</span>
          <LabelExtra />
        </>
      ) }
    />
  )
  Form.Item = withItemProvider(AntForm.Item)
  Form.useForm = AntForm.useForm
  Form.useFormInstance = AntForm.useFormInstance

  return { Form }
})
jest.mock('@sdk/components', () => jest.requireMock('@Pimcore/components/form/form'))

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
  useInheritanceOverlayStyle: () => undefined
}))

// presentation components carrying antd-style, reduced to what the tests read
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: ({ value }: { value: string }) => <span data-icon={ value } /> }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: ReactNode }) => <span>{children}</span>
}))
jest.mock('@Pimcore/modules/data-object/components/inheritance-button', () => ({
  InheritanceButton: ({ objectId }: { objectId: number }) => <button type="button">open-parent-{objectId}</button>
}))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-button.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/divider/divider', () => ({ Divider: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: ReactNode }) => <span>{children}</span> }))
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

// --- the editor -----------------------------------------------------------------

/** A data type with the parts of DynamicTypeObjectDataAbstract the form item reads. */
const dataType: any = {
  inheritedMaskOverlay: 'form-element',
  getEmptyValue: () => null,
  getObjectDataFormItemProps: (props: any) => ({
    label: (
      <FieldLabel
        label={ props.title }
        name={ props.name }
      />
    ),
    name: props.name
  }),
  getObjectDataComponent: () => <input />
}

const Field = ({ name, title }: { name: string[], title: string }): React.JSX.Element => (
  <DataComponentFormItem
    _props={ { name, title, noteditable: false, inherited: false } as any }
    formFieldName={ name }
    objectDataType={ dataType }
  />
)

/** Saves the way the toolbar does (see save-buttons.tsx), through a useSave of its own. */
const Toolbar = (): React.JSX.Element => {
  const { save, isLoading, isSuccess } = useSave()
  const { getModifiedDataObjectAttributes, resetModifiedDataObjectAttributes } = useEditFormContext()
  const publish = useCallback((): void => {
    // resets against the data the save actually sent, as save-buttons.tsx does
    void save(getModifiedDataObjectAttributes(), SaveTaskType.Publish, (savedEditableData) => {
      resetModifiedDataObjectAttributes(savedEditableData)
    })
  }, [save, getModifiedDataObjectAttributes, resetModifiedDataObjectAttributes])

  return (
    <>
      <span
        data-loading={ String(isLoading) }
        data-success={ String(isSuccess) }
        data-testid="toolbar"
      />
      <button
        onClick={ publish }
        type="button"
      >
        publish
      </button>
    </>
  )
}

const renderEditor = (): void => {
  render(
    <SaveProvider>
      <EditFormProvider>
        <InheritanceStateProvider>
          <RootComponent
            data={ { name: 'Parent name', sku: 'SKU-OWN' } }
            layout={ {
              fields: (
                <>
                  <Field
                    name={ ['name'] }
                    title="Name"
                  />
                  <Field
                    name={ ['sku'] }
                    title="SKU"
                  />
                </>
              )
            } as unknown as DataObjectGetLayoutByIdApiResponse }
          />
          <Toolbar />
        </InheritanceStateProvider>
      </EditFormProvider>
    </SaveProvider>
  )
}

const formItem = (title: string): HTMLElement => {
  const item = screen.getByText(title).closest('.ant-form-item')
  if (item === null) throw new Error(`no form item for ${title}`)

  return item as HTMLElement
}

const inputOf = (title: string): HTMLInputElement => {
  const input = formItem(title).querySelector('input')
  if (input === null) throw new Error(`no input for ${title}`)

  return input
}

const iconOf = (title: string): string | undefined =>
  formItem(title).querySelector('[data-icon]')?.getAttribute('data-icon') ?? undefined

const clickRestore = async (title: string): Promise<void> => {
  await user.click(within(formItem(title)).getByRole('button', { name: 'inheritance-restore' }))
}

const clickPublish = async (): Promise<void> => { await user.click(screen.getByRole('button', { name: 'publish' })) }

const toolbar = (): { loading: boolean, success: boolean } => {
  const element = screen.getByTestId('toolbar')

  return { loading: element.getAttribute('data-loading') === 'true', success: element.getAttribute('data-success') === 'true' }
}

/** The auto save runs 800ms after the last change, then waits on the edit lock check. */
const runAutoSave = async (): Promise<void> => { await act(async () => { jest.advanceTimersByTime(1000) }) }

const requestsSent = async (count: number): Promise<void> => {
  await waitFor(() => { expect(mockSend).toHaveBeenCalledTimes(count) })
}

let user: ReturnType<typeof userEvent.setup>

beforeEach(() => {
  jest.useFakeTimers()
  // reset, not clear: a held request left unconsumed by a test would otherwise be handed to the next one
  mockSend.mockReset()
  mockSend.mockResolvedValue({ data: {} })
  markObjectDataAsModified.mockClear()
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
})

afterEach(() => { jest.useRealTimers() })

// --------------------------------------------------------------------------------

describe('restoring inheritance while a save is in flight', () => {
  it('sends the restored field as empty after the auto save it collided with', async () => {
    renderEditor()

    await user.type(inputOf('Name'), '!')
    const running = holdNextSave()
    await runAutoSave()
    await requestsSent(1)
    expect(sentRequests()[0].editableData).toEqual({ name: 'Parent name!' })

    // the own value is on its way to the backend when the restore happens
    await clickRestore('Name')
    await runAutoSave()
    expect(mockSend).toHaveBeenCalledTimes(1)

    await act(async () => { running.finish() })

    // the restore follows, so a reopened object reads the field as inherited
    await requestsSent(2)
    expect(sentRequests()[1]).toEqual({ editableData: { name: null }, task: SaveTaskType.AutoSave, useDraftData: true })
    expect(iconOf('Name')).toBeUndefined()
    expect(toolbar().loading).toBe(false)
  })

  it('sends a restore made during a publish once the publish is through', async () => {
    renderEditor()

    const publishing = holdNextSave()
    await clickPublish()
    await requestsSent(1)
    expect(sentRequests()[0].task).toBe(SaveTaskType.Publish)
    expect(toolbar().loading).toBe(true)

    await clickRestore('SKU')
    await runAutoSave()
    expect(mockSend).toHaveBeenCalledTimes(1)

    await act(async () => { publishing.finish() })

    await requestsSent(2)
    expect(sentRequests()[1]).toEqual({ editableData: { sku: null }, task: SaveTaskType.AutoSave, useDraftData: true })
    expect(inputOf('SKU')).toHaveValue('SKU-PARENT')
    await waitFor(() => { expect(toolbar()).toEqual({ loading: false, success: true }) })
  })

  it('publishes a restore made right before, and leaves no draft behind', async () => {
    renderEditor()

    await clickRestore('SKU')
    // before the auto save of the restore had a chance to run
    await clickPublish()

    await requestsSent(1)
    expect(sentRequests()[0]).toEqual({ editableData: { sku: null }, task: SaveTaskType.Publish, useDraftData: true })
    await waitFor(() => { expect(toolbar()).toEqual({ loading: false, success: true }) })

    // the publish took the restore along, so no auto save follows to turn it into a draft
    await runAutoSave()
    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(markObjectDataAsModified).not.toHaveBeenCalled()
  })

  it('does not save again after a publish that already carried the restore', async () => {
    renderEditor()

    await clickRestore('SKU')
    const publishing = holdNextSave()
    await clickPublish()
    await requestsSent(1)

    // the auto save of the restore comes due while the publish, sending the same data, is running
    await runAutoSave()
    await act(async () => { publishing.finish() })
    await runAutoSave()

    expect(mockSend).toHaveBeenCalledTimes(1)
    await waitFor(() => { expect(toolbar()).toEqual({ loading: false, success: true }) })
  })

  it('clears what a queued publish sent, including an auto save folded into it', async () => {
    renderEditor()

    await user.type(inputOf('Name'), '!')
    const running = holdNextSave()
    await runAutoSave()
    await requestsSent(1)

    // the publish queues behind the running auto save, then a later auto save folds into it
    await clickPublish()
    await user.type(inputOf('Name'), '?')
    await runAutoSave()
    expect(mockSend).toHaveBeenCalledTimes(1)

    await act(async () => { running.finish() })

    await requestsSent(2)
    expect(sentRequests()[1]).toEqual({ editableData: { name: 'Parent name!?' }, task: SaveTaskType.Publish, useDraftData: true })

    // what the publish sent is no longer pending: the next edit sends only itself
    await user.type(inputOf('SKU'), '!')
    await runAutoSave()

    await requestsSent(3)
    expect(sentRequests()[2].editableData).toEqual({ sku: 'SKU-OWN!' })
  })

  it('saves a change made right after a restore as an own value', async () => {
    renderEditor()

    await clickRestore('SKU')
    await user.type(inputOf('SKU'), '!')
    await runAutoSave()

    await requestsSent(1)
    expect(sentRequests()[0].editableData).toEqual({ sku: 'SKU-PARENT!' })
    expect(iconOf('SKU')).toBe('inheritance-broken')
  })
})
