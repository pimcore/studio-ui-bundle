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
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import React from 'react'

const {
  Modal: ModalTemplate,
  Provider: CustomLayoutModalProvider,
  useModal: useCustomLayoutModal
} = create({ defaultProps: { title: 'Custom Layouts', children: <></>, size: 'XXL', footer: null } })

export { CustomLayoutModalProvider, useCustomLayoutModal }

export const CustomLayoutModal = (): React.JSX.Element => {
  const settings = useSettings()
  const { open } = useCustomLayoutModal()

  return (
    <>
      { open && (
        <ModalTemplate>
          {settings.customLayouts?.ModalContent}
        </ModalTemplate>
      )}
    </>
  )
}
