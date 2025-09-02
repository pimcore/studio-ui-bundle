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
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './link.styles'
import { LinkPreview } from './components/link-preview/link-preview'
import { useLinkDataType } from './hooks/use-link-data-type'

export interface LinkValue {
  text: string
  linktype: 'direct' | 'internal'
  direct?: string | null
  internal?: number | null
  internalType?: string | null
  fullPath?: string
  target: string | null
  parameters: string
  anchor: string
  title: string
  accesskey: string
  rel: string
  tabindex: string
  class: string

}

export interface LinkProps {
  disabled?: boolean
  inherited?: boolean
  value?: LinkValue | null
  onChange?: (value?: LinkValue | null) => void
  allowedTypes: string[]
  allowedTargets: string[]
  disabledFields: string[]
  className?: string
  textPrefix?: string
  textSuffix?: string
  PreviewComponent?: React.ComponentType<{
    className?: string
    inherited?: boolean
    textPrefix?: string
    textSuffix?: string
    value: LinkValue | null
  }>
}

export const Link = (props: LinkProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { renderPreview, renderActions } = useLinkDataType({
    ...props,
    PreviewComponent: props.PreviewComponent ?? LinkPreview
  })

  return (
    <Flex
      align="center"
      className={ styles.link }
      gap="extra-small"
    >
      {renderPreview()}
      {renderActions()}
    </Flex>
  )
}
