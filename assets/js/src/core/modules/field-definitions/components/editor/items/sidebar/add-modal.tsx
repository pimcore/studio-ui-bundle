/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { create } from '@Pimcore/components/modal/factory/modal-factory'

export const {
  Modal: AddModal,
  Provider: AddModalProvider,
  context: AddModalContext,
  useModal: useAddModal
} = create({
  defaultProps: {
    title: 'Missing title'
  }
})
