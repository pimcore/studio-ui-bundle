/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// The modal, upload and element selector buttons pull in DI and untranspiled
// ESM styles - the toolbar itself does not need any of them here.
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: jest.fn() })
}))

jest.mock('@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button', () => ({
  ModalUploadButton: () => null
}))

jest.mock('@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button', () => ({
  ElementSelectorButton: () => null
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single', Multiple: 'multiple' }
}))

jest.mock('@Pimcore/components/search-input/search-input', () => ({
  SearchInput: () => null
}))

// The create-object modal reaches the app store through the shared Form component
jest.mock('../create-object/create-object-modal', () => ({
  CreateObjectModal: ({ open }: { open: boolean }) => (open ? <div data-testid="create-object-modal" /> : null)
}))

const creatableClasses = jest.fn((allowedClasses?: string[], skip?: boolean) => (
  { classes: [{ id: 'CAR-ID', name: 'Car' }], isLoading: false }
))
jest.mock('../create-object/use-creatable-relation-classes', () => ({
  useCreatableRelationClasses: (allowedClasses?: string[], skip?: boolean) => creatableClasses(allowedClasses, skip)
}))

const alertWarn = jest.fn()
jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({
  useAlertModal: () => ({ warn: alertWarn })
}))

// The icon component resolves its definition through the DI container
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { RELATION_COLUMN_FILTERS_KEY, RelationFiltersStoreProvider, relationFilterDescriptors } from '../../filters/filters'
// eslint-disable-next-line import/first
import { ManyToManyRelationToolbar, type ManyToManyRelationToolbarProps } from './toolbar'

const CLEAR_FILTERS_LABEL = 'sidebar.clear-all-filters'

const appliedFilter = {
  key: 'fullpath',
  type: 'text',
  filterValue: 'demo',
  locale: null
}

const renderToolbar = (initialValues?: Record<string, unknown>, overrides: Partial<ManyToManyRelationToolbarProps> = {}): void => {
  const props: ManyToManyRelationToolbarProps = {
    addAssets: async () => {},
    addItems: () => {},
    allowClear: false,
    empty: () => {},
    enableUpload: false,
    onSearch: () => {},
    disabled: true,
    ...overrides
  }

  render(
    <RelationFiltersStoreProvider
      descriptors={ relationFilterDescriptors }
      initialValues={ initialValues }
    >
      <ManyToManyRelationToolbar { ...props } />
    </RelationFiltersStoreProvider>
  )
}

describe('ManyToManyRelationToolbar clear filters button', () => {
  it('stays hidden while no column filter is applied', () => {
    renderToolbar()

    expect(screen.queryByLabelText(CLEAR_FILTERS_LABEL)).not.toBeInTheDocument()
  })

  it('is shown next to the search input once a column filter is applied', () => {
    renderToolbar({ [RELATION_COLUMN_FILTERS_KEY]: [appliedFilter] })

    expect(screen.getByLabelText(CLEAR_FILTERS_LABEL)).toBeInTheDocument()
  })

  it('clears all applied column filters on click', () => {
    renderToolbar({ [RELATION_COLUMN_FILTERS_KEY]: [appliedFilter] })

    fireEvent.click(screen.getByLabelText(CLEAR_FILTERS_LABEL))

    expect(screen.queryByLabelText(CLEAR_FILTERS_LABEL)).not.toBeInTheDocument()
  })
})

const CREATE_OBJECT_LABEL = 'relations.create-object.title'

// An object relation with the class-definition flag switched on.
const creatableRelation = {
  allowToCreateNewObject: true,
  dataObjectsAllowed: true,
  disabled: false
}

describe('ManyToManyRelationToolbar create object action', () => {
  beforeEach(() => {
    alertWarn.mockReset()
    creatableClasses.mockReturnValue({ classes: [{ id: 'CAR-ID', name: 'Car' }], isLoading: false })
  })

  it('stays hidden while the class definition does not allow it', () => {
    renderToolbar(undefined, { ...creatableRelation, allowToCreateNewObject: false })

    expect(screen.queryByLabelText(CREATE_OBJECT_LABEL)).not.toBeInTheDocument()
  })

  it('stays hidden on a relation that does not explicitly accept objects', () => {
    renderToolbar(undefined, { ...creatableRelation, dataObjectsAllowed: undefined })

    expect(screen.queryByLabelText(CREATE_OBJECT_LABEL)).not.toBeInTheDocument()
  })

  it('stays hidden while the relation is read-only', () => {
    renderToolbar(undefined, { ...creatableRelation, disabled: true })

    expect(screen.queryByLabelText(CREATE_OBJECT_LABEL)).not.toBeInTheDocument()
  })

  it('stays hidden when the user may create none of the allowed classes', () => {
    creatableClasses.mockReturnValue({ classes: [], isLoading: false })
    renderToolbar(undefined, creatableRelation)

    expect(screen.queryByLabelText(CREATE_OBJECT_LABEL)).not.toBeInTheDocument()
  })

  it('is the first action in the toolbar', () => {
    renderToolbar(undefined, creatableRelation)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-label', CREATE_OBJECT_LABEL)
  })

  it('opens the modal on click', () => {
    renderToolbar(undefined, creatableRelation)

    expect(screen.queryByTestId('create-object-modal')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(CREATE_OBJECT_LABEL))

    expect(screen.getByTestId('create-object-modal')).toBeInTheDocument()
  })

  it('warns instead of opening the modal once maxItems is reached', () => {
    renderToolbar(undefined, { ...creatableRelation, itemLimitReached: true, maxItems: 2 })

    fireEvent.click(screen.getByLabelText(CREATE_OBJECT_LABEL))

    expect(alertWarn).toHaveBeenCalled()
    expect(screen.queryByTestId('create-object-modal')).not.toBeInTheDocument()
  })

  it('skips the class lookup for relations that cannot create objects', () => {
    creatableClasses.mockClear()
    renderToolbar(undefined, { ...creatableRelation, allowToCreateNewObject: false })

    expect(creatableClasses).toHaveBeenCalledWith(undefined, true)
  })
})
