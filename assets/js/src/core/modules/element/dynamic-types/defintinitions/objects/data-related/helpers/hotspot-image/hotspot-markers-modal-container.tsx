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

import React, { useState, useImperativeHandle, forwardRef } from 'react'
import {
  HotspotMarkersModal,
  type HotspotMarkersModalProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal'

export interface HotspotMarkersModalContainerProps {
  ref: React.Ref<HotspotMarkersModalContainerRef>
}

export interface HotspotMarkersModalContainerRef {
  setModal: (id: number, modalProps: HotspotMarkersModalProps) => void
}

export const HotspotMarkersModalContainer = forwardRef<HotspotMarkersModalContainerRef, HotspotMarkersModalContainerProps>((props: HotspotMarkersModalContainerProps, ref) => {
  const [modals, setModals] = useState<Array<{ id: number, props: HotspotMarkersModalProps }>>([])

  const setModal = (id: number, modalProps: HotspotMarkersModalProps): void => {
    setModals((prevModals) => {
      const existingModalIndex = prevModals.findIndex(modal => modal.id === id)
      if (existingModalIndex !== -1) {
        const newModals = [...prevModals]
        newModals[existingModalIndex] = { id, props: modalProps }
        return newModals
      } else {
        return [...prevModals, { id, props: modalProps }]
      }
    })
  }

  useImperativeHandle(ref, () => ({
    setModal
  }))

  return (
    <>
      {modals.map(({ id, props }) => (
        <HotspotMarkersModal
          key={ id }
          { ...props }
        />
      ))}
    </>
  )
})

HotspotMarkersModalContainer.displayName = 'HotspotMarkersModalContainer'
