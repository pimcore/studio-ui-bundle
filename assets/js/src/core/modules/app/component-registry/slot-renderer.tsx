/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Divider } from '@Pimcore/components/divider/divider'
import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useComponentRegistry } from './component-registry'

interface SlotRendererProps {
  slot: string
  props?: Record<string, any>
  onRenderComponent?: (Component: React.JSX.Element, context: { name?: string, index?: number, props?: Record<string, any> }) => React.JSX.Element
  withDivider?: boolean
}

export const SlotRenderer = ({ slot, props, onRenderComponent, withDivider = false }: SlotRendererProps): React.JSX.Element => {
  const name = slot
  const ComponentRegistry = useComponentRegistry()
  const components = ComponentRegistry.getSlotComponents(name)
  const { t } = useTranslation()

  return (
    <>
      {withDivider && components.length > 0 && (
        <Divider plain>{ t('login-form-additional-logins.or') }</Divider>
      )}
      {components.map(({ component: Component, name }, index) => {
        const renderedComponent = (
          <Component
            key={ `component-${name}` }
            { ...props }
          />
        )
        const context = { name, index, props }
        return !isUndefined(onRenderComponent) ? onRenderComponent(renderedComponent, context) : renderedComponent
      })}
    </>
  )
}
