/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { WelcomeScreenRegistry, type WelcomeScreenProvider } from './welcome-screen-registry'

const provider = (name: string, ids: string[]): WelcomeScreenProvider & { open: jest.Mock } => ({
  name,
  getOptions: () => ids.map((id) => ({ id, label: `Label ${id}` })),
  open: jest.fn((id: string) => ids.includes(id))
})

describe('WelcomeScreenRegistry', () => {
  it('has no options and opens nothing without a provider', () => {
    const registry = new WelcomeScreenRegistry()

    expect(registry.getOptions()).toEqual([])
    expect(registry.open('a')).toBe(false)
  })

  it('lists the options of all providers', () => {
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider(provider('one', ['a']))
    registry.registerProvider(provider('two', ['b', 'c']))

    expect(registry.getOptions().map((option) => option.id)).toEqual(['a', 'b', 'c'])
  })

  it('opens the ID with the first provider that knows it and stops there', () => {
    const registry = new WelcomeScreenRegistry()
    const one = provider('one', ['a'])
    const two = provider('two', ['a', 'b'])
    registry.registerProvider(one)
    registry.registerProvider(two)

    expect(registry.open('a')).toBe(true)
    expect(two.open).not.toHaveBeenCalled()
    expect(registry.open('b')).toBe(true)
    expect(registry.open('unknown')).toBe(false)
  })

  it('refuses a second provider with the same name', () => {
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider(provider('one', []))

    expect(() => { registry.registerProvider(provider('one', [])) }).toThrow('already exists')
  })

  it('skips a failing provider', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider({
      name: 'broken',
      getOptions: () => { throw new Error('boom') },
      open: () => { throw new Error('boom') }
    })
    registry.registerProvider(provider('two', ['b']))

    expect(registry.getOptions().map((option) => option.id)).toEqual(['b'])
    expect(registry.open('b')).toBe(true)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
