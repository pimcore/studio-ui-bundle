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
    expect(registry.open('one:a')).toBe(false)
  })

  it('lists the options of all providers as targets named after their provider', () => {
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider(provider('one', ['a']))
    registry.registerProvider(provider('two', ['b', 'c']))

    expect(registry.getOptions()).toEqual([
      { target: 'one:a', label: 'Label a' },
      { target: 'two:b', label: 'Label b' },
      { target: 'two:c', label: 'Label c' }
    ])
  })

  it('opens a target only with the provider it names, also when the ID contains a colon', () => {
    const registry = new WelcomeScreenRegistry()
    const one = provider('one', ['a', 'x:y'])
    const two = provider('two', ['a'])
    registry.registerProvider(one)
    registry.registerProvider(two)

    expect(registry.open('two:a')).toBe(true)
    expect(one.open).not.toHaveBeenCalled()
    expect(registry.open('one:x:y')).toBe(true)
    expect(one.open).toHaveBeenLastCalledWith('x:y')
  })

  it.each([
    ['an unknown provider', 'three:a'],
    ['an ID the provider does not know', 'one:unknown'],
    ['a value without a provider', 'a']
  ])('opens nothing for %s', (_, target) => {
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider(provider('one', ['a']))

    expect(registry.open(target)).toBe(false)
  })

  it.each([
    ['the same name twice', 'one', 'already exists'],
    ['a name with a colon', 'one:two', 'must not contain']
  ])('refuses a provider with %s', (_, name, message) => {
    const registry = new WelcomeScreenRegistry()
    registry.registerProvider(provider('one', []))

    expect(() => { registry.registerProvider(provider(name, [])) }).toThrow(message)
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

    expect(registry.getOptions().map((option) => option.target)).toEqual(['two:b'])
    expect(registry.open('broken:a')).toBe(false)
    expect(registry.open('two:b')).toBe(true)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
