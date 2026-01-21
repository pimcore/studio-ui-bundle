/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCustomLayoutModal } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-provider'
import { LayoutProvider } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { DetailSidebar } from '@Pimcore/modules/field-definitions/components/editor/items/detail/sidebar'
import { type Layout } from '@sdk/api/class-definition'
import { ConfigLayout, Modal } from '@sdk/components'
import React from 'react'

export const CustomLayoutModal = (): React.JSX.Element => {
  const { isOpen, closeModal } = useCustomLayoutModal()

  const defaultLayout = {
    name: 'pimcore_root',
    children: [],
    fieldType: 'panel',
    bodyStyle: '',
    border: false,
    collapsible: false,
    title: '',
    dataType: 'layout',
    collapsed: false,
    height: 0,
    width: 0,
    icon: { type: 'name', value: 'none' },
    labelAlign: 'left',
    labelWidth: 100,
    layout: null,
    locked: false,
    region: '',
    type: 'layout',
    additionalAttributes: {}
  }

  return (
    <Modal
      onCancel={ closeModal }
      open={ isOpen }
      size="XXL"
    >
      <ConfigLayout
        leftItem={ {
          children: (
            <DetailSidebar allowExternalDrag />
          )
        } }

        rightItem={ {
          children: (
            <LayoutProvider layout={ defaultLayout as Layout }>
              <DetailSidebar allowExternalDrop />
            </LayoutProvider>
          )
        } }
      />
    </Modal>
  )
}
