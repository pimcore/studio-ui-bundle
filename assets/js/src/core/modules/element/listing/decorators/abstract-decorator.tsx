/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SettingsContextProps } from '../abstract/settings/settings-provider'

export interface AbstractDecoratorProps extends SettingsContextProps {};

export type AbstractDecorator<T = unknown> = (props: AbstractDecoratorProps, config?: T) => AbstractDecoratorProps
export type AbstractDecoratorWithRequiredConfig<T = unknown> = (props: AbstractDecoratorProps, config: T) => AbstractDecoratorProps
