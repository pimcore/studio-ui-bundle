/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import React from 'react'

/** Stand-ins for the parts of the Service Users widget that its container tests do not exercise. */

interface Pane { children: React.ReactNode }

export const PageLayout = ({ leftItem, rightItem }: { leftItem: Pane, rightItem: Pane }): React.JSX.Element => (
  <div>{leftItem.children}{rightItem.children}</div>
)

interface TabsProps {
  items?: Array<{ key: string, label: React.ReactNode }>
  activeKey?: string
  onChange?: (key: string) => void
  onClose?: (key: string) => void
}

export const Tabs = ({ items = [], activeKey, onChange, onClose }: TabsProps): React.JSX.Element => (
  <div>
    {items.map((item) => (
      <div
        aria-selected={ item.key === activeKey }
        key={ item.key }
        role="tab"
      >
        <span
          onClick={ () => { onChange?.(item.key) } }
          role="presentation"
        >{item.label}</span>
        <button
          aria-label={ `close:${item.key}` }
          onClick={ () => { onClose?.(item.key) } }
          type="button"
        />
      </div>
    ))}
    {/* The real tab context menu calls onClose once per tab within a single event. */}
    <button
      onClick={ () => { items.forEach((item) => { onClose?.(item.key) }) } }
      type="button"
    >close-all</button>
    <button
      onClick={ () => { items.filter((item) => item.key !== activeKey).forEach((item) => { onClose?.(item.key) }) } }
      type="button"
    >close-others</button>
  </div>
)

interface ListProps {
  serviceUsers: Array<{ id: number, name: string }>
  onSelect: (id: number) => void
  onCreate: () => void
  onCreateFromUser: () => void
}

export const ServiceUserList = ({ serviceUsers, onSelect, onCreate, onCreateFromUser }: ListProps): React.JSX.Element => (
  <div>
    {serviceUsers.map((item) => (
      <button
        key={ item.id }
        onClick={ () => { onSelect(item.id) } }
        type="button"
      >{item.name}</button>
    ))}
    <button
      onClick={ onCreate }
      type="button"
    >create</button>
    <button
      onClick={ onCreateFromUser }
      type="button"
    >create-from-user</button>
  </div>
)

interface DetailProps {
  id: number
  onDeleted: (id: number) => void
  onDirtyChange: (id: number, isDirty: boolean) => void
}

export const ServiceUserDetail = ({ id, onDeleted, onDirtyChange }: DetailProps): React.JSX.Element => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <button
        onClick={ () => { onDeleted(id) } }
        type="button"
      >{`detail:${id}`}</button>
      <input
        aria-label={ `field:${id}` }
        onChange={ (event) => { setValue(event.target.value); onDirtyChange(id, event.target.value !== '') } }
        value={ value }
      />
    </div>
  )
}

export const token = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

interface CreateModalProps {
  open: boolean
  mode: string
  onCreated: (serviceUserId: number, issued: unknown[]) => void
}

export const CreateServiceUserModal = ({ open, mode, onCreated }: CreateModalProps): React.JSX.Element | null => open
  ? (
    <>
      <button
        onClick={ () => { onCreated(9, [token]) } }
        type="button"
      >{`submit:${mode}`}</button>
      <button
        onClick={ () => { onCreated(9, [{ clientId: 'svc_9', clientSecret: 'secret-9' }, token]) } }
        type="button"
      >{`submit-both:${mode}`}</button>
      <button
        onClick={ () => { onCreated(9, []) } }
        type="button"
      >{`skip:${mode}`}</button>
    </>
    )
  : null

interface SecretModalProps {
  credentials?: Array<{ token?: string, clientSecret?: string | null }>
  onClose: () => void
}

export const OneTimeSecretModal = ({ credentials, onClose }: SecretModalProps): React.JSX.Element | null =>
  credentials === undefined || credentials.length === 0
    ? null
    : (
      <button
        onClick={ onClose }
        type="button"
      >{`secret:${credentials.map((credential) => credential.token ?? credential.clientSecret).join('+')}`}</button>
      )
