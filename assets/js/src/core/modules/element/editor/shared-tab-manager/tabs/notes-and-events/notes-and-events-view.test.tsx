/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Whether a note offers an expand toggle is decided entirely by the items the view hands
// to Collapse, so the items are captured here instead of rendering the real Collapse.
const collapseItems = jest.fn()

jest.mock('@Pimcore/components/collapse/collapse', () => ({
  Collapse: (props: { items: unknown[] }) => {
    collapseItems(props.items)
    return null
  }
}))

// The surrounding layout, the add-note modal and the pagination toolbar play no part in
// the expand behaviour asserted below.
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/header/header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: () => null }))

jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: () => null
}))

jest.mock(
  '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/modal/add-note-modal',
  () => ({ AddNoteModal: () => null })
)

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// The icon component resolves its registry through the DI container, which only exists in
// the running app.
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('i18next', () => ({ __esModule: true, default: { t: (key: string) => key } }))

// date-time transitively imports the app's router and store, which drags antd's
// untranspiled ESM build into the module graph. The formatted date is not asserted here.
jest.mock('@Pimcore/utils/date-time', () => ({ formatDateTime: () => '5/4/26, 3:53:03 PM' }))

// The details table renders through Grid, which drags antd's untranspiled ESM build into
// the module graph. Only whether it is offered at all matters here.
jest.mock(
  '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/note-and-events-details',
  () => ({ NoteAndEventDetails: () => null })
)

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { NotesAndEventsTabView } from './notes-and-events-view'
// eslint-disable-next-line import/first
import { type Note } from './notes-and-events-api-slice-enhanced'
// eslint-disable-next-line import/first
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

const makeNote = (overrides: Partial<Note> = {}): Note => ({
  id: 1,
  type: 'warning',
  cId: 10,
  cType: 'object',
  cPath: '/some/path',
  date: 1746367983,
  title: 'something',
  description: '',
  locked: false,
  data: [],
  userName: 'admin',
  ...overrides
})

const renderView = (notes: Note[]): void => {
  render(
    <NotesAndEventsTabView
      deleteLoading={ false }
      elementId={ 10 }
      elementType={ elementTypes.dataObject }
      notes={ notes }
      onClickTrash={ jest.fn() }
      pagination={ <></> }
      refetchNotes={ jest.fn() }
    />
  )
}

const expandableFlags = (): Array<boolean | undefined> =>
  (collapseItems.mock.calls[0][0] as Array<{ expandable?: boolean }>).map((item) => item.expandable)

describe('NotesAndEventsTabView', () => {
  beforeEach(() => {
    collapseItems.mockClear()
  })

  it('does not offer an expand toggle for a note that only has a type and a title', () => {
    renderView([makeNote()])

    expect(expandableFlags()).toEqual([false])
  })

  it('treats a description of nothing but whitespace as no description', () => {
    renderView([makeNote({ description: '   \n  ' })])

    expect(expandableFlags()).toEqual([false])
  })

  it('offers an expand toggle once the note has a description', () => {
    renderView([makeNote({ description: 'the reason for this note' })])

    expect(expandableFlags()).toEqual([true])
  })

  it('offers an expand toggle for a system event that carries data but no description', () => {
    renderView([makeNote({ data: [{ name: 'field', value: 'x' }] })])

    expect(expandableFlags()).toEqual([true])
  })

  it('decides per note rather than for the whole list', () => {
    renderView([
      makeNote({ id: 1 }),
      makeNote({ id: 2, description: 'has a body' }),
      makeNote({ id: 3 })
    ])

    expect(expandableFlags()).toEqual([false, true, false])
  })
})
