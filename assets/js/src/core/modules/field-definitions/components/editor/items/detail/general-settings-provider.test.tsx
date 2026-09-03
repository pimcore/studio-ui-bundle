/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import {
  type GeneralSettings,
  GeneralSettingsProvider,
  useGeneralSettings
} from './general-settings-provider'

// Captures the settings at mount only, the way the general settings form hands
// them to Ant Design as `initialValues` — Ant Design never re-applies those.
const SeedProbe = (): React.JSX.Element => {
  const { generalSettings } = useGeneralSettings()
  const [seeded] = useState(() => generalSettings)

  return <span data-testid="seed">{String(seeded?.title)}</span>
}

const EditProbe = (): React.JSX.Element => {
  const { generalSettings, setGeneralSettings, getIsDirty } = useGeneralSettings()

  return (
    <>
      <span data-testid="title">{String(generalSettings?.title)}</span>
      <span data-testid="dirty">{String(getIsDirty())}</span>
      <button
        onClick={ () => { setGeneralSettings({ title: 'edited' }) } }
        type="button"
      >
        edit
      </button>
    </>
  )
}

describe('GeneralSettingsProvider', () => {
  it('seeds a child mounting in the same commit with the new server data', () => {
    // The post-save refetch flips the detail view's loading flag, which
    // unmounts the form and remounts it once fresh data arrives. Both the
    // data swap and the remount land in one commit.
    const Harness = (props: { settings: GeneralSettings, visible: boolean }): React.JSX.Element => (
      <GeneralSettingsProvider generalSettings={ props.settings }>
        {props.visible ? <SeedProbe /> : null}
      </GeneralSettingsProvider>
    )

    const { rerender } = render(
      <Harness
        settings={ { title: 'before' } }
        visible
      />
    )
    expect(screen.getByTestId('seed')).toHaveTextContent('before')

    // Refetch in flight: the form is unmounted.
    rerender(
      <Harness
        settings={ { title: 'before' } }
        visible={ false }
      />
    )

    // Refetch resolved: fresh data and the remount arrive together.
    rerender(
      <Harness
        settings={ { title: 'after' } }
        visible
      />
    )

    expect(screen.getByTestId('seed')).toHaveTextContent('after')
  })

  it('keeps unsaved edits while the same server data is re-rendered', () => {
    const settings = { title: 'stored' }

    const { rerender } = render(
      <GeneralSettingsProvider generalSettings={ settings }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    act(() => { screen.getByRole('button', { name: 'edit' }).click() })
    expect(screen.getByTestId('title')).toHaveTextContent('edited')
    expect(screen.getByTestId('dirty')).toHaveTextContent('true')

    rerender(
      <GeneralSettingsProvider generalSettings={ settings }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    expect(screen.getByTestId('title')).toHaveTextContent('edited')
  })

  it('discards unsaved edits when a fetch completes, even returning equal values', () => {
    // The toolbar refresh action refetches. Ant Design's structural sharing
    // can hand back equal values, so the reference is what marks a reload.
    const { rerender } = render(
      <GeneralSettingsProvider generalSettings={ { title: 'stored' } }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    act(() => { screen.getByRole('button', { name: 'edit' }).click() })
    expect(screen.getByTestId('title')).toHaveTextContent('edited')

    rerender(
      <GeneralSettingsProvider generalSettings={ { title: 'stored' } }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    expect(screen.getByTestId('title')).toHaveTextContent('stored')
    expect(screen.getByTestId('dirty')).toHaveTextContent('false')
  })

  it('re-seeds and resets the dirty baseline when the server data changes', () => {
    const { rerender } = render(
      <GeneralSettingsProvider generalSettings={ { title: 'stored' } }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    act(() => { screen.getByRole('button', { name: 'edit' }).click() })
    expect(screen.getByTestId('dirty')).toHaveTextContent('true')

    rerender(
      <GeneralSettingsProvider generalSettings={ { title: 'saved' } }>
        <EditProbe />
      </GeneralSettingsProvider>
    )

    expect(screen.getByTestId('title')).toHaveTextContent('saved')
    expect(screen.getByTestId('dirty')).toHaveTextContent('false')
  })
})
