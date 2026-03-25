/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

if (module.hot !== undefined) {
  module.hot.accept()
}

export * from '@Pimcore/modules/document/actions/open-in-new-window/use-open-in-new-window'
export * from '@Pimcore/modules/document/actions/save/use-save'
export * from '@Pimcore/modules/document/actions/add-page/use-add-document'
export * from '@Pimcore/modules/document/events/post-update-event'

export * from '@Pimcore/modules/document/document-draft-slice'
export * from '@Pimcore/modules/document/draft/hooks/use-modified-editable-data'

export * from '@Pimcore/modules/document/hooks/use-document'
export * from '@Pimcore/modules/document/hooks/use-document-draft'
export * from '@Pimcore/modules/document/hooks/use-document-helper'
export * from '@Pimcore/modules/document/hooks/use-global-document-context'
export * from '@Pimcore/modules/document/hooks/use-sites'

// Document Processor Systems (for plugins to register custom processors)
export * from '@Pimcore/modules/document/services/processors/document-url-processor-registry'
export * from '@Pimcore/modules/document/services/processors/document-save-data-processor-registry'

export * from '@Pimcore/modules/document/editor/shared-tab-manager/tab-definitions'
export * from '@Pimcore/modules/document/editor/shared-tab-manager/sidebar-definitions'
export * from '@Pimcore/modules/document/editor/types/email/tab-manager/email-tab-manager'
export * from '@Pimcore/modules/document/editor/types/folder/tab-manager/folder-tab-manager'
export * from '@Pimcore/modules/document/editor/types/hardlink/tab-manager/hardlink-tab-manager'
export * from '@Pimcore/modules/document/editor/types/link/tab-manager/link-tab-manager'
export * from '@Pimcore/modules/document/editor/types/page/tab-manager/page-tab-manager'
export * from '@Pimcore/modules/document/editor/types/snippet/tab-manager/snippet-tab-manager'

export * from '@Pimcore/modules/document/editor/sidebar/document-sidebar-manager'
export * from '@Pimcore/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar'
export * from '@Pimcore/modules/document/editor/sidebar/visibility/document-permission-helper'

export * from '@Pimcore/modules/document/editor/widget'

export * from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/components/inheritance-overlay/inheritance-overlay'

export * from '@Pimcore/modules/document/tree/utils/transform-api-data-to-node'

export * from '@Pimcore/modules/document/document-provider'
