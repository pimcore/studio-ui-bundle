/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Iframe } from '../../components/iframe/iframe'

export const MiniPaint = (): React.JSX.Element => {
  const { id } = useElementContext()

  const iframeSrc = `/pimcore-studio/api/image-editor?id=${id}`

  return (
    <Iframe
      src={iframeSrc}
      title="Image Editor"
    />
  )
}
