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
import { act, render, screen } from '@testing-library/react'
import { type GeneralSettings, GeneralSettingsProvider, type IGeneralSettingsContext, useGeneralSettings } from './general-settings-provider'

let context: IGeneralSettingsContext

const Probe = (): React.JSX.Element => {
  context = useGeneralSettings()

  return <></>
}

// captures what a form would take as its initial values on mount
const MountProbe = (): React.JSX.Element => {
  const { generalSettings } = useGeneralSettings()
  const [mountedWith] = useState(generalSettings)

  return <span data-testid="mounted-with">{String(mountedWith?.title)}</span>
}

const tree = (generalSettings: GeneralSettings, withMountProbe: boolean): React.JSX.Element => (
  <GeneralSettingsProvider generalSettings={ generalSettings }>
    <Probe />
    {withMountProbe && <MountProbe />}
  </GeneralSettingsProvider>
)

const renderProvider = (generalSettings: GeneralSettings): (next: GeneralSettings, withMountProbe?: boolean) => void => {
  const { rerender } = render(tree(generalSettings, false))

  return (next, withMountProbe = false) => { rerender(tree(next, withMountProbe)) }
}

describe('GeneralSettingsProvider', () => {
  it('hands new server data to a child mounting in the same render', () => {
    const rerender = renderProvider({ title: 'old' })

    rerender({ title: 'imported' }, true)

    expect(screen.getByTestId('mounted-with')).toHaveTextContent('imported')
  })

  it('keeps local edits when the server data only changes identity', () => {
    const rerender = renderProvider({ title: 'saved' })
    act(() => { context.setGeneralSettings({ title: 'edited' }) })

    rerender({ title: 'saved' })

    expect(context.generalSettings).toEqual({ title: 'edited' })
    expect(context.revision).toBe(0)
    expect(context.getIsDirty()).toBe(true)
  })

  it('replaces local state and bumps the revision when the server data changes', () => {
    const rerender = renderProvider({ title: 'before' })
    act(() => { context.setGeneralSettings({ title: 'edited' }) })

    rerender({ title: 'after' })

    expect(context.generalSettings).toEqual({ title: 'after' })
    expect(context.revision).toBe(1)
    expect(context.getIsDirty()).toBe(false)
  })
})
