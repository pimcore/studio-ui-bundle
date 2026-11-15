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
import { fireEvent, render } from '@testing-library/react'
import { PimcoreVideo } from './pimcore-video'
import { VideoProvider, useVideoContext } from './video-provider'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const sources = [{ src: 'http://localhost/video.mp4', type: 'video/mp4' }]

describe('PimcoreVideo', () => {
  it('renders without a VideoProvider (e.g. the search modal preview)', () => {
    let container: HTMLElement | undefined

    expect(() => {
      ({ container } = render(<PimcoreVideo sources={ sources } />))
    }).not.toThrow()

    const video = container!.querySelector('video')
    expect(video).not.toBeNull()
    expect(() => fireEvent.timeUpdate(video!)).not.toThrow()
  })

  it('reports the player position to a surrounding VideoProvider', () => {
    const PositionProbe = (): React.JSX.Element => {
      const { playerPosition } = useVideoContext()
      return <span data-testid="position">{playerPosition}</span>
    }

    const { container, getByTestId } = render(
      <VideoProvider>
        <PimcoreVideo sources={ sources } />
        <PositionProbe />
      </VideoProvider>
    )

    const video = container.querySelector('video')!
    Object.defineProperty(video, 'currentTime', { value: 12, configurable: true })
    fireEvent.timeUpdate(video)

    expect(getByTestId('position').textContent).toBe('12')
  })
})
