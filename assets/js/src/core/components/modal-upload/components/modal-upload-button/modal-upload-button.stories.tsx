/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import { ModalUploadButton } from '@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button'

const config: Meta = {
  title: 'Components/Data Entry/ModalUploadButton',
  component: ModalUploadButton,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    maxItems: 5
  }
}
