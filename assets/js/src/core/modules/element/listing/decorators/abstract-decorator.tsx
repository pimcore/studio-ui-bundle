/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type SettingsContextProps } from '../abstract/settings/settings-provider'

export interface AbstractDecoratorProps extends SettingsContextProps {};

export type AbstractDecorator<T = unknown> = (props: AbstractDecoratorProps, config?: T) => AbstractDecoratorProps
export type AbstractDecoratorWithRequiredConfig<T = unknown> = (props: AbstractDecoratorProps, config: T) => AbstractDecoratorProps
