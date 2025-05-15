/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

const config: Meta = {
  title: 'Components/Feedback/ModalTitle',
  component: ModalTitle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const ModalTitleWithIcon = {
  args: {
    iconName: 'x-circle',
    children: 'Modal Title With Icon'
  }
}

export const ModalTitleWithoutIcon = {
  args: {
    children: 'Modal Title With Icon'
  }
}
