/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export * from '@Pimcore/modules/app/component-registry/component-registry'

export * from '@Pimcore/modules/app/error-boundary/error-boundary'
export { default as trackError, ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'

export * from '@Pimcore/modules/app/settings/hooks/use-settings'

export * from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
export * from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
