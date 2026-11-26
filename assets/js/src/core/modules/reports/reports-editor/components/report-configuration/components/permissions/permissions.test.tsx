/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { StyleProvider } from '@ant-design/cssinjs'
import { Permissions } from './permissions'

interface Shares { sharedGlobally: boolean, sharedUserNames: string[], sharedRoleNames: string[] }

const users = { items: [{ id: 1, username: 'anna' }, { id: 2, username: 'ben' }, { id: 9, username: 'me' }] }
const roles = { items: [{ id: 20, name: 'editors' }] }

let mockUserList: typeof users | undefined
let mockRoleList: typeof roles | undefined

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetShareCollectionQuery: () => ({ data: mockUserList })
}))
jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({
  useRoleGetShareCollectionQuery: () => ({ data: mockRoleList })
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ id: 9 }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('../../report-configuration.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/users-roles-dropdown/users-roles-dropdown.styles', () => ({ useStyles: () => ({ styles: {} }) }))

// The real antd Select, so picking and removing entries behaves as in Studio
jest.mock('@Pimcore/components/select/select', () => {
  const { Select } = jest.requireActual('antd')
  return { Select: ({ customArrowIcon, minWidth, ...props }: Record<string, unknown>) => <Select { ...props } /> }
})
jest.mock('@Pimcore/components/tabs/tabs', () => ({
  Tabs: ({ items, onChange }: { items: Array<{ key: string, label: string }>, onChange: (key: string) => void }) => (
    <>{items.map(item => (
      <button
        key={ item.key }
        onClick={ () => { onChange(item.key) } }
      >{item.label}</button>
    ))}</>
  )
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={ onClick }>{children}</button>
  )
}))
jest.mock('@Pimcore/components/form/form-kit', () => ({
  FormKit: { Panel: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }
}))
jest.mock('@Pimcore/components/form/form', () => ({
  Form: { Item: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }
}))
jest.mock('@Pimcore/components/switch/switch', () => ({
  Switch: ({ labelRight }: { labelRight: React.ReactNode }) => <div>{labelRight}</div>
}))
jest.mock('@Pimcore/components/tag-list/tag-list', () => ({ TagList: () => null }))
jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
    onClick === undefined ? <div>{children}</div> : <button onClick={ onClick }>{children}</button>
  )
}))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

let stored: Shares

const Harness = ({ initial }: { initial: Shares }): React.JSX.Element => {
  const [currentData, setCurrentData] = useState(initial)
  stored = currentData

  // No style injection: jsdom cannot parse some of antd's selectors
  return (
    <StyleProvider mock="server">
      <Permissions
        currentData={ currentData as any }
        updateFormData={ (data) => { setCurrentData(previous => ({ ...previous, ...data as Partial<Shares> })) } }
      />
    </StyleProvider>
  )
}

const shares = (sharedUserNames: string[], sharedRoleNames: string[] = []): Shares =>
  ({ sharedGlobally: false, sharedUserNames, sharedRoleNames })

const openPicker = (): void => { fireEvent.click(screen.getByText('button.add-edit')) }

const option = (name: string): HTMLElement => {
  const found = Array.from(document.querySelectorAll<HTMLElement>('.ant-select-item-option'))
    .find(element => element.textContent === name)
  if (found === undefined) {
    throw new Error(`option ${name} is not offered`)
  }
  return found
}

const selected = (): string[] =>
  Array.from(document.querySelectorAll('.ant-select-selection-item')).map(element => element.textContent ?? '')

const addRole = (name: string): void => {
  fireEvent.click(screen.getByText('user-management.roles'))
  fireEvent.click(option(name))
}

const removeChip = (name: string): void => {
  const chip = Array.from(document.querySelectorAll('.ant-select-selection-item'))
    .find(element => element.textContent === name)
  fireEvent.click(chip!.querySelector('.ant-select-selection-item-remove')!)
}

describe('report permissions', () => {
  beforeEach(() => {
    mockUserList = users
    mockRoleList = roles
  })

  it('keeps the shared users when the user and role lists arrive after the first render', () => {
    mockUserList = undefined
    mockRoleList = undefined
    const { rerender } = render(<Harness initial={ shares(['anna', 'ben']) } />)

    mockUserList = users
    mockRoleList = roles
    rerender(<Harness initial={ shares(['anna', 'ben']) } />)
    openPicker()

    expect(selected()).toEqual(['anna', 'ben'])
    addRole('editors')
    expect(stored.sharedUserNames).toEqual(['anna', 'ben'])
    expect(stored.sharedRoleNames).toEqual(['editors'])
  })

  it.each([
    ['user list', () => { mockUserList = undefined }],
    ['role list', () => { mockRoleList = undefined }]
  ])('offers the picker only once the %s has loaded, with the shares preselected', (_, unload) => {
    unload()
    const { rerender } = render(<Harness initial={ shares(['anna'], ['editors']) } />)
    openPicker()

    expect(document.querySelector('.ant-select')).toBeNull()

    mockUserList = users
    mockRoleList = roles
    rerender(<Harness initial={ shares(['anna'], ['editors']) } />)

    expect(selected()).toEqual(['anna', 'editors'])
  })

  it('keeps names the picker does not offer when the selection changes', () => {
    render(<Harness initial={ shares(['gone_user', 'anna'], ['gone_role']) } />)
    openPicker()

    addRole('editors')

    expect(stored.sharedUserNames).toEqual(['anna', 'gone_user'])
    expect(stored.sharedRoleNames).toEqual(['editors', 'gone_role'])
  })

  it('removes only the removed entry, the last chip included', () => {
    render(<Harness initial={ shares(['anna', 'ben', 'gone_user'], ['gone_role']) } />)
    openPicker()

    removeChip('anna')
    expect(stored.sharedUserNames).toEqual(['ben', 'gone_user'])

    removeChip('ben')
    expect(stored.sharedUserNames).toEqual(['gone_user'])
    expect(stored.sharedRoleNames).toEqual(['gone_role'])
  })

  it('removes everything on Clear, names the picker does not offer included', () => {
    render(<Harness initial={ shares(['anna', 'gone_user'], ['editors', 'gone_role']) } />)
    openPicker()

    fireEvent.click(screen.getByText('common.clear'))

    expect(stored.sharedUserNames).toEqual([])
    expect(stored.sharedRoleNames).toEqual([])
    expect(selected()).toEqual([])
  })

  it('adds an entry to a report that is not shared yet', () => {
    render(<Harness initial={ shares([]) } />)
    openPicker()

    addRole('editors')

    expect(stored.sharedUserNames).toEqual([])
    expect(stored.sharedRoleNames).toEqual(['editors'])
  })
})
