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
import { getCustomModal, registerCustomModal, type CustomModalComponentProps } from './custom-modal-registry'

const ModalA = (_props: CustomModalComponentProps): React.JSX.Element => <div>a</div>
const ModalB = (_props: CustomModalComponentProps): React.JSX.Element => <div>b</div>

describe('custom-modal-registry', () => {
  it('returns undefined for an id that was never registered', () => {
    expect(getCustomModal('never-registered')).toBeUndefined()
  })

  it('returns the component registered under an id', () => {
    registerCustomModal('registry-test.a', ModalA)

    expect(getCustomModal('registry-test.a')).toBe(ModalA)
  })

  it('overwrites a previous registration under the same id and warns', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    registerCustomModal('registry-test.b', ModalA)
    registerCustomModal('registry-test.b', ModalB)

    expect(getCustomModal('registry-test.b')).toBe(ModalB)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('registry-test.b')
    )

    warnSpy.mockRestore()
  })
})
