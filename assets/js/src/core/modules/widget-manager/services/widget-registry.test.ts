/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ComponentType } from 'react'
import { WidgetRegistry, type Widget } from './widget-registry'
import trackError from '@Pimcore/modules/app/error-handler'

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const trackErrorMock = trackError as jest.Mock

const createWidget = (name: string): Widget => ({
  name,
  component: (() => null) as ComponentType
})

describe('WidgetRegistry', () => {
  beforeEach(() => {
    trackErrorMock.mockClear()
  })

  describe('overrideWidget', () => {
    it('replaces an already registered widget and returns true', () => {
      const registry = new WidgetRegistry()
      registry.registerWidget(createWidget('my-widget'))
      const registeredWidget = registry.getWidget('my-widget')

      const result = registry.overrideWidget(createWidget('my-widget'))

      const overriddenWidget = registry.getWidget('my-widget')
      expect(result).toBe(true)
      expect(overriddenWidget).toBeDefined()
      expect(overriddenWidget).not.toBe(registeredWidget)
      expect(trackErrorMock).not.toHaveBeenCalled()
    })

    it('degrades gracefully for an unknown widget name instead of throwing', () => {
      const registry = new WidgetRegistry()
      registry.registerWidget(createWidget('core-widget'))
      const coreWidget = registry.getWidget('core-widget')

      let result: boolean | undefined
      expect(() => {
        result = registry.overrideWidget(createWidget('unknown-widget'))
      }).not.toThrow()

      expect(result).toBe(false)
      expect(trackErrorMock).toHaveBeenCalledTimes(1)
      // the registry stays untouched: the core widget keeps working
      expect(registry.getWidget('core-widget')).toBe(coreWidget)
      expect(registry.getWidget('unknown-widget')).toBeUndefined()
    })
  })
})
