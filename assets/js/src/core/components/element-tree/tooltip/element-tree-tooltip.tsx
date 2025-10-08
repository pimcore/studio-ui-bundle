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
import { Tooltip } from '../../tooltip/tooltip'
import { type TreeNodeProps } from '../node/tree-node'
import { Box } from '@Pimcore/components/box/box'
import { Image } from '@Pimcore/components/image/image'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'

export interface ElementTreeTooltipProps {
  node: TreeNodeProps
  children: React.ReactNode
}

export const ElementTreeTooltip = ({ node, children }: ElementTreeTooltipProps): React.JSX.Element => {
  const { t } = useTranslation()
  const element: Record<string, any> | undefined = node.metaData?.asset ?? node.metaData?.dataObject ?? node.metaData?.document
  const isAsset = node.metaData?.asset !== undefined
  const hasTooltip = element?.customAttributes?.tooltip !== undefined
  const tooltipTitle = (
    <>
      <div>{t('ID')}: {node.id}</div>
      <div>{t('Type')}: {t(node.type!)}</div>
    </>
  )

  return (
    <Tooltip
      mouseEnterDelay={ 0.5 }
      overlayStyle={ { width: 280 } }
      placement="right"
      title={
        <Box padding={ 'extra-small' }>
          {isAsset && element?.imageThumbnailPath !== undefined && (
          <Box
            className="w-full"
            padding={ { bottom: 'extra-small' } }
          >
            <Flex
              className="w-full"
              justify="center"
              style={ { maxHeight: 200, overflow: 'hidden' } }
            >
              <Image
                alt={ element.filename }
                src={ element.imageThumbnailPath }
                style={ { maxHeight: 200 } }
              />
            </Flex>
          </Box>
          )}

          {hasTooltip
            ? (
              <div dangerouslySetInnerHTML={ { __html: element.customAttributes.tooltip } } />
              )
            : (
                tooltipTitle
              )}
        </Box>
      }
    >
      {children}
    </Tooltip>
  )
}
