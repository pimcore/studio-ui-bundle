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
import { render, screen } from '@testing-library/react'
import { ComparisonView } from './comparison-view'

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/my-studio/api'
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  currentDomain: 'https://example.com',
  appConfig: { baseUrl: '/my-studio/', apiPrefix: '/my-studio/api' }
}))

jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl', () => ({
  useVersionUrl: () => ({ isLoading: false, url: 'https://example.com/some-page?pimcore_version=7' })
}))

jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view', () => ({
  DocumentVersionsView: ({ versionUrl }: { versionUrl: string | null }) => <div data-testid="version-url">{versionUrl}</div>
}))

describe('ComparisonView', () => {
  it('builds the version diff url below the configured api prefix', () => {
    render(
      <ComparisonView
        versionIds={ [{ id: 7, count: 1 }, { id: 9, count: 2 }] as never }
      />
    )

    expect(screen.getByTestId('version-url')).toHaveTextContent(
      'https://example.com/my-studio/api/documents/diff-versions/from/7/to/9'
    )
  })
})
