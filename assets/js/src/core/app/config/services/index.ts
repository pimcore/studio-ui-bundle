/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Compatibility / bootstrap entry: installs the core service graph into the GLOBAL
// container (window.Pimcore.container) as an import side effect. This is what the admin's
// core/bootstrap.ts pulls in via a bare `import '@Pimcore/app/config/services'`.
//
// The installer itself lives in ./install-core-services, which is side-effect free, and is
// deliberately NOT re-exported from here. A standalone host must import it from there and
// pass it to createHost({ installServices }): importing it through this module would bind
// the whole graph once as a side effect and then again via the installer, leaving every
// identifier double-bound and every container.get() throwing "Ambiguous match found".
import { container } from '@Pimcore/app/depency-injection'
import { installCoreServices } from './install-core-services'

installCoreServices(container)
