/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import 'reflect-metadata'
import '@Pimcore/app/config/app-config'
import '@Pimcore/app/module-system/module-system'
import '@Pimcore/app/config/services'
import '@Pimcore/app/i18n'
import '@Pimcore/modules/app/base-layout'
import '@Pimcore/modules/app/base-layout/main-nav'
import '@Pimcore/modules/icon-library'
import '@Pimcore/modules/asset'
import '@Pimcore/modules/notifications'
import '@Pimcore/modules/data-object'
import '@Pimcore/modules/document'
import '@Pimcore/modules/element'
import '@Pimcore/modules/execution-engine'
import '@Pimcore/modules/element/dynamic-types'
import '@Pimcore/modules/wysiwyg'
import 'flexlayout-react/style/light.css'
import '../../../css/globals.css'
import '@Pimcore/modules/email'

// ordered nav items Quick Access
import '@Pimcore/modules/open-element'
import '@Pimcore/modules/recycle-bin'
// ordered nav items Data Management
import '@Pimcore/modules/notes-and-events'
import '@Pimcore/modules/predefined-properties'
import '@Pimcore/modules/tags'
// ordered nav items Experience & E-commerce
import '@Pimcore/modules/redirects'
import '@Pimcore/modules/document-types'
import '@Pimcore/modules/website-settings'
// ordered nav items Asset Management

// ordered nav items Automation & Integration

// ordered nav items Translations
import '@Pimcore/modules/translations'
// ordered nav items Reporting
import '@Pimcore/modules/reports'
// ordered nav items System
import '@Pimcore/modules/user'
import '@Pimcore/modules/application-logger'
