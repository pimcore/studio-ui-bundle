/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

/**
 * Regression guard for CVE-2026-53669 (GHSA-wrjc-x8rr-h8h6) in React Router.
 *
 * Browsers read a backslash in a path as a forward slash, so a navigation target such as
 * `/\evil.example` is really `//evil.example`: a protocol-relative URL that leaves the
 * site. React Router below 7.18.0 did not recognise the backslash spelling as absolute
 * and pushed it onto the history unchanged. 7.18.0 collapses the leading separators into
 * a same-origin path; 7.18.4 refuses the navigation altogether. Either keeps the user on
 * this origin, which is the property asserted here.
 *
 * Studio itself only navigates to hard-coded routes, so this does not test Studio code.
 * It pins the dependency to a patched line, so that a downgrade (or a lock file that
 * silently resolves back to 6.x) fails the suite.
 */
const Navigator = ({ to }: { to: string }): null => {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      void navigate(to)
    } catch {
      // A router that rejects the target is one acceptable outcome; the location probe
      // below shows where the user ended up either way.
    }
  }, [])

  return null
}

const LocationProbe = (): React.JSX.Element => {
  const location = useLocation()

  return <span data-testid="pathname">{ location.pathname }</span>
}

const renderNavigationTo = (to: string): void => {
  render(
    <MemoryRouter initialEntries={ ['/home'] }>
      <LocationProbe />
      <Routes>
        <Route
          element={ <Navigator to={ to } /> }
          path="/home"
        />
        <Route
          element={ null }
          path="*"
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('navigation target normalization (CVE-2026-53669)', () => {
  it.each([
    '//evil.example',
    '\\\\evil.example',
    '/\\evil.example',
    '\\/evil.example'
  ])('never leaves the origin for the target %p', async (to) => {
    renderNavigationTo(to)

    const pathname = (await screen.findByTestId('pathname')).textContent ?? ''

    // Any of these spellings becomes a protocol-relative URL once a browser reads it.
    expect(pathname).not.toContain('\\')
    expect(pathname).not.toMatch(/^\/\//)
  })
})
